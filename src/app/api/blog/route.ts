import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const posts = db
      .prepare('SELECT id, slug, title_en, title_or, summary_en, summary_or, category, published_at FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC')
      .all();
    return NextResponse.json({ success: true, posts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
