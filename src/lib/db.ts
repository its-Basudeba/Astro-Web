import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'astrology.db');
const db = new Database(dbPath);

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_or TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_or TEXT NOT NULL,
    duration_mins INTEGER NOT NULL DEFAULT 45,
    draft_price_inr INTEGER NOT NULL DEFAULT 1100,
    is_published INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    service_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    booking_date TEXT NOT NULL,
    booking_time_slot TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, CONFIRMED, COMPLETED, CANCELLED
    payment_status TEXT NOT NULL DEFAULT 'UNPAID', -- UNPAID, PAID, REFUNDED
    amount_inr INTEGER NOT NULL DEFAULT 0,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(service_id) REFERENCES services(id)
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_or TEXT NOT NULL,
    summary_en TEXT NOT NULL,
    summary_or TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_or TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Vedic Astrology',
    is_published INTEGER NOT NULL DEFAULT 1,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Seed default services if empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM services');
const serviceCount = (countStmt.get() as { count: number }).count;

if (serviceCount === 0) {
  const insertService = db.prepare(`
    INSERT INTO services (id, slug, title_en, title_or, description_en, description_or, duration_mins, draft_price_inr, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);

  const defaultServices = [
    {
      id: 'srv-1',
      slug: 'janma-kundli-analysis',
      title_en: 'Comprehensive Birth Chart (Janma Kundli) Reading',
      title_or: 'ସମ୍ପୂର୍ଣ୍ଣ ଜନ୍ମ କୁଣ୍ଡଳୀ ଓ ଭାଗ୍ୟ ବିଚାର',
      description_en: 'Deep examination of all 12 bhavas, Dasha-Antardasha cycles, current planetary transits (Gochara), and personalized Vedic remedies.',
      description_or: '୧୨ ଭାବ ବିଚାର, ଦଶା-ଅନ୍ତର୍ଦଶା, ଗୋଚର ଗ୍ରହ ସ୍ଥିତି ଏବଂ ସଠିକ୍ ପ୍ରତିକାର ଓ ଉପଚାର ପରାମର୍ଶ।',
      duration: 60,
      price: 1100
    },
    {
      id: 'srv-2',
      slug: 'kundli-matching-marriage',
      title_en: 'Kundli Matching & Marriage Compatibility (Guna Milan)',
      title_or: 'କୁଣ୍ଡଳୀ ଯୋଟକ ମେଳକ ଓ ବିବାହ ପରାମର୍ଶ',
      description_en: 'Ashtakoota 36-Guna assessment, Manglik Dosha evaluation, emotional harmony, and longevity alignment for prospective couples.',
      description_or: '୩୬ ଗୁଣ ମିଳନ, ମାଙ୍ଗଳିକ ଦୋଷ ବିଚାର, ଦାମ୍ପତ୍ୟ ସୁଖ ଓ ବଂଶବୃଦ୍ଧି ଅନୁକୂଳତା ନିରୂପଣ।',
      duration: 45,
      price: 1100
    },
    {
      id: 'srv-3',
      slug: 'career-wealth-guidance',
      title_en: 'Career, Business & Financial Prosperity Consultation',
      title_or: 'କର୍ମ, ବ୍ୟବସାୟ ଓ ଧନ ଭାଗ୍ୟ ମାର୍ଗଦର୍ଶନ',
      description_en: 'Analysis of the 10th and 11th houses to reveal ideal professional sectors, promotion timing, business suitability, and financial stability.',
      description_or: 'ଦଶମ ଓ ଏକାଦଶ ଭାବ ପରୀକ୍ଷା, ବ୍ୟବସାୟିକ ଲାଭ ଏବଂ ପଦୋନ୍ନତି ସମୟ ବିଚାର।',
      duration: 45,
      price: 1100
    },
    {
      id: 'srv-4',
      slug: 'graha-shanti-remedies',
      title_en: 'Navagraha Shanti & Spiritual Remedial Guidance',
      title_or: 'ନବଗ୍ରହ ଶାନ୍ତି ଓ ବୈଦିକ ପ୍ରତିକାର ବିଧି',
      description_en: 'Remedies for afflicted planets including authentic mantra japa, gemstone recommendations, charitable offerings, and temple rituals.',
      description_or: 'ଅଶୁଭ ଗ୍ରହ ପ୍ରଭାବ କ୍ଷୟ ନିମନ୍ତେ ଜପ, ରତ୍ନ ଧାରଣ ପରାମର୍ଶ ଓ ଶାସ୍ତ୍ରୀୟ ପ୍ରତିକାର।',
      duration: 30,
      price: 850
    }
  ];

  for (const s of defaultServices) {
    insertService.run(s.id, s.slug, s.title_en, s.title_or, s.description_en, s.description_or, s.duration, s.price);
  }
}

// Seed default blog posts if empty
const blogCount = (db.prepare('SELECT COUNT(*) as count FROM blog_posts').get() as { count: number }).count;
if (blogCount === 0) {
  const insertBlog = db.prepare(`
    INSERT INTO blog_posts (id, slug, title_en, title_or, summary_en, summary_or, content_en, content_or, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertBlog.run(
    'post-1',
    'significance-of-lahiri-ayanamsha',
    'Understanding Lahiri Ayanamsha in Vedic Kundli Calculation',
    'ବୈଦିକ ଜ୍ୟୋତିଷରେ ଲାହିଡ଼ୀ ଅୟନାଂଶର ମହତ୍ତ୍ୱ',
    'Why the precession of equinoxes makes Sidereal astrology different from Western Tropical astrology.',
    'ଅୟନାଂଶର ଗଣନା କାହିଁକି ବୈଦିକ ଜ୍ୟୋତିଷରେ ସଠିକ ଫଳାଫଳ ପ୍ରଦାନ କରେ ସେ ସମ୍ପର୍କରେ ତଥ୍ୟ।',
    'In Vedic astrology, Nirayana (sidereal) planetary longitudes are calculated by subtracting the Ayanamsha (precession angle) from the Sayana (tropical) coordinates. Named after astronomer N.C. Lahiri and adopted by the Calendar Reform Committee of India, Lahiri Ayanamsha maintains the sacred fixed star Chitra at exactly 180 degrees.\n\nThis precision ensures that your Janma Lagna and planetary degrees align with the cosmic celestial sphere as recognized by ancient rishis.',
    'ପ୍ରାଚୀନ ଭାରତୀୟ ଜ୍ୟୋତିଷ ଶାସ୍ତ୍ରରେ ନିରୟନ ଗଣନା ପଦ୍ଧତି ଅବଲମ୍ବନ କରାଯାଏ। ଲାହିଡ଼ୀ ଅୟନାଂଶ ଭାରତ ସରକାରଙ୍କ ଦ୍ୱାରା ସ୍ୱୀକୃତ। ଏହି ଗଣନା ଦ୍ୱାରା ଗ୍ରହମାନଙ୍କ ପ୍ରକୃତ ଆକାଶୀୟ ସ୍ଥିତି ସଠିକ ଭାବରେ ନିରୂପଣ କରାଯାଇପାରେ।',
    'Vedic Astronomy'
  );

  insertBlog.run(
    'post-2',
    'navagraha-mantras-for-daily-peace',
    'Sacred Navagraha Stotras for Daily Harmony and Protection',
    'ପ୍ରତ୍ୟହ ଶାନ୍ତି ପାଇଁ ନବଗ୍ରହ ସ୍ତୋତ୍ର ଓ ପ୍ରାର୍ଥନା',
    'Traditional Sanskrit invocations of the nine celestial deities for inner tranquility and mental clarity.',
    'ନଅଟି ଗ୍ରହଙ୍କ କୃପା ଲାଭ ପାଇଁ ପ୍ରାଚୀନ ଶାସ୍ତ୍ରୋକ୍ତ ପ୍ରାର୍ଥନା ଓ ନିୟମ।',
    'The Navagrahas represent cosmic energies influencing our karmic experiences. Chanting the traditional Vyasa Navagraha Stotra each morning clears mental distress and cultivates inner sattva.\n\n"Aadityaaya cha Somaaya Mangalaaya Budhaaya cha, Guru Shukra Shanibhyashcha Raahave Ketave Namah."\n\nDaily repetition with devotion harmonizes planetary vibrations in life.',
    'ନବଗ୍ରହଙ୍କ ପ୍ରଭାବ ଆମ ମନ ଏବଂ କର୍ମ ଉପରେ ପଡ଼ିଥାଏ। ପ୍ରତ୍ୟହ ସକାଳେ ଶୁଦ୍ଧ ଚିତ୍ତରେ ନବଗ୍ରହ ସ୍ତୋତ୍ର ପାଠ କଲେ ମାନସିକ ଶାନ୍ତି ଏବଂ ଶୁଭଫଳ ପ୍ରାପ୍ତି ହୁଏ।',
    'Spiritual Remedies'
  );
}

// Seed site settings
const settingsCount = (db.prepare('SELECT COUNT(*) as count FROM settings').get() as { count: number }).count;
if (settingsCount === 0) {
  const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
  insertSetting.run('site_name', 'Pandit Dhananjaya Nanda Vedic Astrology');
  insertSetting.run('whatsapp_number', '+919437000000'); // Clearly marked configuration placeholder
  insertSetting.run('contact_email', 'consultation@panditdhananjayananda.com');
  insertSetting.run('consultation_mode', 'Phone / Video / Temple Visit');
  insertSetting.run('payment_gateway_mode', 'TEST_CONFIGURED'); // Ready for owner keys
}

export default db;
