import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const secretKey = process.env.ADMIN_SECRET_KEY || 'pandit_dev_secret_key_change_in_prod';

    if (authHeader !== `Bearer ${secretKey}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized administrative access.' }, { status: 401 });
    }

    const bookings = db.prepare(`
      SELECT b.*, s.title_en as service_title
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      ORDER BY b.created_at DESC
      LIMIT 100
    `).all();

    const services = db.prepare('SELECT * FROM services').all();
    const settings = db.prepare('SELECT * FROM settings').all();

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        services,
        settings,
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
