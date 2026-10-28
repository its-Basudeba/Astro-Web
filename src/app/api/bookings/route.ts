import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, customerName, customerEmail, customerPhone, bookingDate, bookingTimeSlot, notes } = body;

    // Strict validation
    if (!serviceId || !customerName || !customerPhone || !bookingDate || !bookingTimeSlot) {
      return NextResponse.json(
        { success: false, error: 'Missing required booking details (Name, Phone, Date, Slot, and Service).' },
        { status: 400 }
      );
    }

    // Check service exists and get draft price
    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(serviceId) as any;
    if (!service) {
      return NextResponse.json({ success: false, error: 'Selected astrology service does not exist.' }, { status: 404 });
    }

    // Check slot availability (prevent double-booking the same astrologer slot)
    const existingBooking = db.prepare(`
      SELECT id FROM bookings
      WHERE booking_date = ? AND booking_time_slot = ? AND status != 'CANCELLED'
    `).get(bookingDate, bookingTimeSlot);

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          error: `The requested time slot (${bookingTimeSlot}) on ${bookingDate} is already reserved. Please select an alternate slot.`
        },
        { status: 409 }
      );
    }

    // Generate unique booking reference
    const bookingId = 'BK-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const insertStmt = db.prepare(`
      INSERT INTO bookings (
        id, service_id, customer_name, customer_email, customer_phone,
        booking_date, booking_time_slot, notes, status, payment_status, amount_inr
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', 'UNPAID', ?)
    `);

    insertStmt.run(
      bookingId,
      serviceId,
      customerName.trim(),
      customerEmail ? customerEmail.trim() : null,
      customerPhone.trim(),
      bookingDate,
      bookingTimeSlot,
      notes ? notes.trim() : null,
      service.draft_price_inr
    );

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Consultation appointment reserved successfully.',
      details: {
        service: service.title_en,
        date: bookingDate,
        timeSlot: bookingTimeSlot,
        amount: service.draft_price_inr,
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
