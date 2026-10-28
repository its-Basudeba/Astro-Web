import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { createRazorpayOrder } from '@/lib/payments/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json({ success: false, error: 'Booking ID is required.' }, { status: 400 });
    }

    const booking = db.prepare(`
      SELECT b.*, s.title_en
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      WHERE b.id = ?
    `).get(bookingId) as any;

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking record not found.' }, { status: 404 });
    }

    const isPaymentEnabled = process.env.NEXT_PUBLIC_PAYMENT_ENABLED === 'true';
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If live credentials are not activated by owner yet
    if (!isPaymentEnabled || !keyId || !keySecret || keyId === 'rzp_test_placeholder_key') {
      return NextResponse.json({
        success: true,
        mode: 'OFFLINE_CONFIRMED',
        message: 'Online payment gateway is in test/configuration mode. Booking is reserved. Consultation payment can be made directly upon consultation confirmation.',
        bookingId: booking.id,
        amount: booking.amount_inr,
      });
    }

    // Call Razorpay API to generate legitimate server-side order
    const order = await createRazorpayOrder(
      {
        amount: booking.amount_inr * 100, // convert INR to paise
        currency: 'INR',
        receipt: booking.id,
        notes: {
          customerName: booking.customer_name,
          customerPhone: booking.customer_phone,
          service: booking.title_en,
        },
      },
      keyId,
      keySecret
    );

    // Save order id into database
    db.prepare('UPDATE bookings SET razorpay_order_id = ? WHERE id = ?').run(order.id, booking.id);

    return NextResponse.json({
      success: true,
      mode: 'RAZORPAY',
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
