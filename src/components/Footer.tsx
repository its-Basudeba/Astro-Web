'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Phone, Mail, MapPin, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-vedic-navy text-white border-t-2 border-gold/40 mt-20">
      {/* Decorative Traditional Border Accent */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Bio Summary */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center bg-amber-600 text-navy font-bold text-lg">
                ॐ
              </div>
              <h3 className="text-xl font-bold text-gold-light">{t.common.brandName}</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {t.common.tagline}. Dedicated to providing traditional, mathematically precise Vedic birth chart readings, Muhurta selection, and compassionate spiritual guidance rooted in Odisha’s sacred heritage.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold/90 font-medium">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Authentic Lahiri Nirayana Ephemeris</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-gold mb-4 border-b border-gold/20 pb-2">
              Astrological Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/services" className="hover:text-gold transition-colors">
                  Janma Kundli Analysis
                </Link>
              </li>
              <li>
                <Link href="/matching" className="hover:text-gold transition-colors">
                  Kundli Matching (36-Guna Milan)
                </Link>
              </li>
              <li>
                <Link href="/kundli" className="hover:text-gold transition-colors">
                  Free Vedic Kundli Tool
                </Link>
              </li>
              <li>
                <Link href="/horoscope" className="hover:text-gold transition-colors">
                  Rashi & Planetary Horoscope
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-gold transition-colors">
                  Book Personal Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Policies */}
          <div>
            <h4 className="text-base font-semibold text-gold mb-4 border-b border-gold/20 pb-2">
              Policies & Information
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  {t.common.about}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold transition-colors">
                  {t.common.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold transition-colors">
                  {t.common.terms}
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-gold transition-colors">
                  {t.common.cancellation}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  {t.common.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Consultations */}
          <div>
            <h4 className="text-base font-semibold text-gold mb-4 border-b border-gold/20 pb-2">
              Consultation Support
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>Odisha, India (Consultations available globally via Phone / Video / In-Person)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>WhatsApp: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+91 94370 00000"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "consultation@panditdhananjayananda.com"}</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/booking"
                  className="inline-block btn-gold px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-navy"
                >
                  Schedule Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Ethical Astrological Disclaimer Box */}
        <div className="mt-12 pt-6 border-t border-gold/15 bg-black/20 p-5 rounded-lg text-xs text-gray-400 leading-relaxed">
          <div className="flex items-center gap-2 text-gold font-semibold mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.common.disclaimer}</span>
          </div>
          <p>{t.common.disclaimerText}</p>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-2">
          <p>© {new Date().getFullYear()} {t.common.brandName}. {t.common.allRightsReserved}.</p>
          <p className="text-gold-light/70">Vedic Astronomical Computing Engine (Lahiri Ayanamsha)</p>
        </div>
      </div>
    </footer>
  );
}
