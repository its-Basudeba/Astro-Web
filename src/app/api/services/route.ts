import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const services = db
      .prepare('SELECT * FROM services WHERE is_published = 1 ORDER BY created_at ASC')
      .all();
    return NextResponse.json({ success: true, services });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
