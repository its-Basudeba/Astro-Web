'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Menu, X, Sun, Moon, Calendar, Phone } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'or' : 'en');
  };

  const navLinks = [
    { href: '/', label: t.common.home },
    { href: '/about', label: t.common.about },
    { href: '/services', label: t.common.services },
    { href: '/kundli', label: t.common.kundli },
    { href: '/matching', label: t.common.matching },
    { href: '/horoscope', label: t.common.horoscope },
    { href: '/booking', label: t.common.booking },
    { href: '/blog', label: t.common.blog },
    { href: '/contact', label: t.common.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-vedic-navy text-white border-b border-gold/30 shadow-lg">
      {/* Top sacred banner */}
      <div className="bg-[#07111E] py-1.5 px-4 text-xs border-b border-gold/15 text-gold-light/90">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-gold font-bold">॥ ॐ ସୂର୍ଯ୍ୟାୟ ନମଃ ॥</span>
            <span className="hidden sm:inline text-white/60">|</span>
            <span className="hidden sm:inline text-white/80">{t.common.location}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-gold/40 text-gold-light hover:bg-gold/10 transition-colors"
              title="Switch language between English and Odia"
            >
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span className="font-semibold">{lang === 'en' ? 'ଓଡ଼ିଆ (Odia)' : 'English'}</span>
            </button>
            <Link
              href="/admin"
              className="text-white/50 hover:text-gold transition-colors text-[11px]"
            >
              {t.common.admin}
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center bg-gradient-to-tr from-amber-700 via-yellow-600 to-amber-500 shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl font-bold text-navy">ॐ</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                {t.common.brandName}
              </span>
              <span className="block text-[11px] sm:text-xs text-gold-light/80 font-medium tracking-wide">
                {t.common.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 text-sm font-medium text-white/90 hover:text-gold hover:bg-white/5 rounded-md transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Consultation CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className="hidden sm:inline-flex items-center gap-2 btn-gold px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.common.bookConsultation}</span>
            </Link>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gold hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-vedic-navy-dark border-t border-gold/20 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:text-gold hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gold/15 flex flex-col gap-2">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold text-center py-2.5 rounded-lg text-sm font-semibold"
            >
              {t.common.bookConsultation}
            </Link>
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gold/40 text-gold-light"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'en' ? 'ଓଡ଼ିଆରେ ପଢନ୍ତୁ' : 'Switch to English'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
