import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/payments/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    if (!bookingId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, error: 'Incomplete payment verification payload.' },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: 'Razorpay secret key not configured on server.' },
        { status: 500 }
      );
    }

    // Cryptographic verification
    const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature, keySecret);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Cryptographic signature verification failed. Untrusted payment.' },
        { status: 400 }
      );
    }

    // Idempotent database update
    db.prepare(`
      UPDATE bookings
      SET payment_status = 'PAID', status = 'CONFIRMED', razorpay_payment_id = ?
      WHERE id = ? AND razorpay_order_id = ?
    `).run(razorpayPaymentId, bookingId, razorpayOrderId);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and consultation booking confirmed.',
      bookingId,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
