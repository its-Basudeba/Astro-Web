# Pandit Dhananjaya Nanda — Vedic Astrology Portal

A professional, bilingual (Odia & English), full-stack Vedic astrology web application developed for **Pandit Dhananjaya Nanda**. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **SQLite (better-sqlite3)**.

---

## 🌟 Key Features

1. **Vedic Ephemeris & Kundli Generator (`/kundli`)**
   - Astronomical Julian Day calculation and Lahiri (*Chitrapaksha*) Ayanamsha computation.
   - Computes Lagna (Ascendant), Moon sign (*Rashi*), 27 *Nakshatras* with *Padas*, and planetary positions for all 9 Navagrahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu).
   - Whole Sign House (*Bhava*) distribution.
   - Direct verification against J2000 epoch reference.

2. **Ashtakoota 36-Guna Kundli Matching (`/matching`)**
   - Full implementation of all 8 traditional Kootas:
     1. Varna (1 pt)
     2. Vashya (2 pts)
     3. Tara (3 pts)
     4. Yoni (4 pts)
     5. Graha Maitri (5 pts)
     6. Gana (6 pts)
     7. Bhakoot (7 pts)
     8. Nadi (8 pts)
   - Total score computation out of 36 Gunas with scriptural verdict and traditional guidelines.

3. **Consultation Booking System (`/booking` & `/api/bookings`)**
   - Conflict-free time slot reservation preventing double-bookings.
   - Generates unique reference IDs (`BK-XXXXXXXX`).
   - Secure server-side validation and storage in local SQLite database.

4. **Razorpay Payment Gateway Architecture (`/api/payments/*`)**
   - Server-side cryptographic HMAC-SHA256 signature verification.
   - Safe test-mode and offline reservation fallbacks when live merchant keys are pending.

5. **Full English & Odia Bilingual Support**
   - Persistent language switcher (English ⇄ ଓଡ଼ିଆ).
   - High-quality Odia typography using Google Noto Sans Oriya.

6. **Administrative Portal (`/admin`)**
   - Bearer secret-key authentication (`ADMIN_SECRET_KEY`).
   - View client appointment submissions, status, and service records.

---

## 🚀 Running on Windows

### Prerequisites
- Node.js v20+ or v24+
- npm v10+ or v11+
- Windows PowerShell or Command Prompt

### Step 1: Environment Setup
Ensure `.env.local` exists (created from `.env.example`):
```bash
Copy-Item .env.example .env.local
```

### Step 2: Run Automated Tests
Execute the automated test suite verifying Vedic ephemeris, 36-Guna Milan, and payment cryptography:
```bash
npm test
```
All 7 unit and integration tests will execute and pass.

### Step 3: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Run Production Build (Optional)
```bash
npm run build
npm start
```

---

## 📂 Project Directory Structure

```text
D:\pandit_dhananjayananda
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global layout with font & language context
│   │   ├── page.tsx              # Vedic royal navy & gold homepage
│   │   ├── globals.css           # Custom Vedic palette & design styles
│   │   ├── about/page.tsx        # Astrologer bio & consultation philosophy
│   │   ├── services/page.tsx     # Astrology service catalogue
│   │   ├── kundli/page.tsx       # Live Vedic Janma Kundli calculation engine
│   │   ├── matching/page.tsx     # Ashtakoota 36-Guna Kundli matching tool
│   │   ├── horoscope/page.tsx    # 12 Rashis & planetary lord insights
│   │   ├── booking/page.tsx      # Appointment scheduling workflow
│   │   ├── blog/page.tsx         # Articles on Vedic astronomy & rituals
│   │   ├── contact/page.tsx      # Contact details & inquiry form
│   │   ├── admin/page.tsx        # Password-protected admin dashboard
│   │   ├── privacy/page.tsx      # Privacy policy
│   │   ├── terms/page.tsx        # Terms & conditions
│   │   ├── cancellation/page.tsx # Refund & cancellation policy
│   │   ├── not-found.tsx         # Custom 404 page
│   │   └── api/
│   │       ├── services/route.ts
│   │       ├── bookings/route.ts
│   │       ├── blog/route.ts
│   │       ├── admin/dashboard/route.ts
│   │       └── payments/
│   │           ├── create-order/route.ts
│   │           └── verify/route.ts
│   ├── components/
│   │   ├── Header.tsx            # Navigation, language switcher & mobile drawer
│   │   ├── Footer.tsx            # Policy links & astrological disclaimer
│   │   └── WhatsAppButton.tsx    # Floating WhatsApp direct consultation button
│   ├── context/
│   │   └── LanguageContext.tsx   # React context for English/Odia switching
│   └── lib/
│       ├── db.ts                 # SQLite connection, schema & auto-seed
│       ├── i18n.ts               # Complete English and Odia bilingual dictionary
│       ├── astrology/
│       │   ├── kundli.ts         # Astronomical ephemeris & Lahiri Ayanamsha
│       │   └── matching.ts       # Ashtakoota 36-Guna Milan algorithm
│       └── payments/
│           └── razorpay.ts       # HMAC-SHA256 signature verifier & order creator
├── data/
│   └── astrology.db              # SQLite database (auto-created on first run)
├── tests/
│   └── astrology.test.mjs        # Automated unit and integration test suite
├── .env.example                  # Environment variable configuration template
└── package.json                  # Dependencies and run scripts
```

---

## 🔒 Owner Information Required Before Live Production Deployment

To bring the website to full public production, the following genuine details should be placed into `.env.local`:
1. **WhatsApp Mobile Number:** Update `NEXT_PUBLIC_WHATSAPP_NUMBER` with Pandit Ji's real WhatsApp number.
2. **Official Email:** Update `NEXT_PUBLIC_SUPPORT_EMAIL`.
3. **Razorpay Live API Keys:** Replace placeholder values with `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` from your merchant dashboard, then set `NEXT_PUBLIC_PAYMENT_ENABLED="true"`.
4. **Final Consultation Fees:** Review proposed draft dakshina (₹1,100 / ₹850) in `src/lib/db.ts` or via the database.
