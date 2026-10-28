'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Compass,
  Heart,
  Calendar,
  Sparkles,
  Shield,
  BookOpen,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  PhoneCall,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const { lang, t } = useLanguage();

  const services = [
    {
      id: 'srv-1',
      title: lang === 'or' ? 'ଜନ୍ମ କୁଣ୍ଡଳୀ ଓ ଭାଗ୍ୟ ବିଚାର' : 'Janma Kundli Analysis',
      desc: lang === 'or'
        ? '୧୨ ଭାବ, ଦଶା-ଅନ୍ତର୍ଦଶା, ଗୋଚର ଗ୍ରହ ସ୍ଥିତି ଏବଂ ସଠିକ୍ ପ୍ରତିକାର ପରାମର୍ଶ।'
        : 'Detailed study of your 12 bhavas, Dasha cycles, transit influences, and personalized Vedic remedies.',
      icon: Compass,
      href: '/booking?service=srv-1'
    },
    {
      id: 'srv-2',
      title: lang === 'or' ? 'କୁଣ୍ଡଳୀ ଯୋଟକ ମେଳକ (୩୬ ଗୁଣ)' : 'Marriage Kundli Matching',
      desc: lang === 'or'
        ? 'ଅଷ୍ଟକୂଟ ବିଚାର, ମାଙ୍ଗଳିକ ଦୋଷ ପରୀକ୍ଷା ଓ ଦାମ୍ପତ୍ୟ ସୁଖ ନିରୂପଣ।'
        : 'Ashtakoota 36-Guna assessment, Manglik Dosha evaluation, and marital compatibility guidance.',
      icon: Heart,
      href: '/matching'
    },
    {
      id: 'srv-3',
      title: lang === 'or' ? 'କର୍ମ ଓ ବ୍ୟବସାୟିକ ଉନ୍ନତି' : 'Career & Financial Consultation',
      desc: lang === 'or'
        ? 'ଦଶମ ଓ ଏକାଦଶ ଭାବ ପରୀକ୍ଷା, ବ୍ୟବସାୟ ଲାଭ ଓ ପଦୋନ୍ନତି ସମୟ ବିଚାର।'
        : 'Analysis of 10th & 11th houses to reveal ideal vocations, promotion timing, and financial stability.',
      icon: Sparkles,
      href: '/booking?service=srv-3'
    },
    {
      id: 'srv-4',
      title: lang === 'or' ? 'ନବଗ୍ରହ ଶାନ୍ତି ଓ ବୈଦିକ ପ୍ରତିକାର' : 'Navagraha Shanti & Remedies',
      desc: lang === 'or'
        ? 'ଗ୍ରହ ଦୋଷ କ୍ଷୟ ନିମନ୍ତେ ଶାସ୍ତ୍ରୋକ୍ତ ମନ୍ତ୍ର ଜପ, ରତ୍ନ ପରାମର୍ଶ ଓ ପୂଜା ବିଧି।'
        : 'Prescription of traditional mantra recitations, auspicious gemstones, and scriptural remedies.',
      icon: Shield,
      href: '/booking?service=srv-4'
    }
  ];

  return (
    <div className="bg-cream-bg">
      {/* 1. HERO SECTION */}
      <section className="relative bg-vedic-navy text-white py-20 lg:py-28 overflow-hidden border-b border-gold/30">
        <div className="absolute inset-0 bg-mandala-pattern opacity-10 pointer-events-none"></div>
        {/* Celestial golden glow accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Sacred Vedic Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold-light text-xs sm:text-sm font-medium mb-6">
              <Sun className="w-4 h-4 text-gold" />
              <span>{t.hero.badge}</span>
              <Moon className="w-3.5 h-3.5 text-gold" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-gold px-8 py-3.5 rounded-lg text-base font-bold shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>{t.hero.ctaPrimary}</span>
              </Link>
              <Link
                href="/kundli"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-navy px-8 py-3.5 rounded-lg text-base font-bold"
              >
                <Compass className="w-5 h-5 text-gold" />
                <span>{t.hero.ctaSecondary}</span>
              </Link>
            </div>

            {/* Authenticity Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-10 border-t border-gold/20 text-center">
              <div>
                <span className="text-2xl font-bold text-gold block">ପ୍ରାମାଣିକ ପରମ୍ପରା</span>
                <span className="text-xs text-gray-400 mt-1 block">{t.hero.experienceDraft}</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gold block">ବୈଦିକ ସିଦ୍ଧାନ୍ତ</span>
                <span className="text-xs text-gray-400 mt-1 block">{t.hero.satisfactionRate}</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gold block">ନିଷ୍ଠାପର ମାର୍ଗଦର୍ଶନ</span>
                <span className="text-xs text-gray-400 mt-1 block">{t.hero.consultationCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FREE KUNDLI GENERATOR CALLOUT */}
      <section className="py-14 bg-vedic-cream border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gold/30 p-8 sm:p-12 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
                {lang === 'or' ? 'ତତ୍କ୍ଷଣାତ୍ ଗ୍ରହ ଗଣନା' : 'Instant Astronomical Computation'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
                {lang === 'or' ? 'ଆପଣଙ୍କର ବୈଦିକ ଜନ୍ମ କୁଣ୍ଡଳୀ ମାଗଣାରେ ଜାଣନ୍ତୁ' : 'Generate Your Free Vedic Birth Chart (Janma Kundli)'}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {lang === 'or'
                  ? 'ସଠିକ ଜନ୍ମ ତାରିଖ, ସମୟ ଏବଂ ସ୍ଥାନ ଅନୁସାରେ ଲାହିଡ଼ୀ ଅୟନାଂଶ ଭିତ୍ତିକ ଲଗ୍ନ, ରାଶି ଏବଂ ନଅଟି ଗ୍ରହଙ୍କ ସ୍ଥିତି ଗଣନା କରନ୍ତୁ।'
                  : 'Compute your accurate Lagna, Moon sign (Rashi), Nakshatra, and 9 planetary positions calculated via standard Nirayana Vedic algorithms with Lahiri Ayanamsha.'}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-600" /> Whole Sign Houses</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-600" /> 27 Nakshatras & Padas</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-600" /> North Indian Diamond Chart</span>
              </div>
            </div>
            <div>
              <Link
                href="/kundli"
                className="btn-gold px-8 py-4 rounded-xl text-base font-bold inline-flex items-center gap-3 shadow-md whitespace-nowrap"
              >
                <span>{lang === 'or' ? 'କୁଣ୍ଡଳୀ ଗଣନା କରନ୍ତୁ' : 'Open Kundli Generator'}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE ASTROLOGICAL SERVICES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ଶାସ୍ତ୍ରୀୟ ପରାମର୍ଶ' : 'Authentic Guidance'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            {t.servicesSection.title}
          </h2>
          <p className="text-gray-600">
            {t.servicesSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-xl border border-gold/25 p-7 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-amber-50 border border-gold/40 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>
                <div>
                  <Link
                    href={srv.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950 transition-colors"
                  >
                    <span>{lang === 'or' ? 'ପରାମର୍ଶ ନିଅନ୍ତୁ' : 'Book Consultation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-amber-700 transition-colors underline underline-offset-4"
          >
            <span>{t.servicesSection.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. ABOUT PANDIT JI INTRO */}
      <section className="py-20 bg-vedic-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 text-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full border-4 border-gold p-2 bg-gradient-to-tr from-amber-700 to-yellow-600 flex items-center justify-center shadow-2xl">
                <div className="w-full h-full rounded-full bg-vedic-navy-dark flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-6xl text-gold font-bold mb-2">ॐ</span>
                  <span className="text-lg font-bold text-gold-light">
                    {t.common.brandName}
                  </span>
                  <span className="text-xs text-gray-300 mt-1">
                    Odisha, India
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
                {lang === 'or' ? 'ପଣ୍ଡିତଜୀଙ୍କ ପରିଚୟ' : 'About the Astrologer'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                {lang === 'or'
                  ? 'ପାରମ୍ପରିକ ବୈଦିକ ଜ୍ୟୋତିଷର ସାଧକ'
                  : 'Dedicated to Authentic Vedic Tradition'}
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
                <p>
                  {lang === 'or'
                    ? 'ପଣ୍ଡିତ ଧନଞ୍ଜୟ ନନ୍ଦ ଓଡ଼ିଶାର ଏକ ପ୍ରତିଷ୍ଠିତ ଆଧ୍ୟାତ୍ମିକ ପରମ୍ପରାରେ ବୈଦିକ ଜ୍ୟୋତିଷ, କୁଣ୍ଡଳୀ ଗଣିତ ଏବଂ ନକ୍ଷତ୍ର ସିଦ୍ଧାନ୍ତ ଅଧ୍ୟୟନ କରି ଆସିଛନ୍ତି।'
                    : 'Pandit Dhananjaya Nanda upholds the sacred heritage of Vedic astrology, offering traditional horoscope interpretation, muhurta determination, and compassionate counsel rooted in Indian scriptural wisdom.'}
                </p>
                <p>
                  {lang === 'or'
                    ? 'ତାଙ୍କର ମୁଖ୍ୟ ଉଦ୍ଦେଶ୍ୟ ହେଉଛି ଜ୍ୟୋତିଷୀୟ ଗଣିତର ସଠିକତା ମାଧ୍ୟମରେ ଲୋକମାନଙ୍କୁ ସେମାନଙ୍କର ଜୀବନ, କର୍ମ ଓ ସ୍ୱାସ୍ଥ୍ୟ ଦିଗରେ ସଠିକ ମାର୍ଗଦର୍ଶନ ପ୍ରଦାନ କରିବା।'
                    : 'His consultation methodology strictly rejects superstition or exaggerated guarantees. Each birth chart is examined with astronomical precision using standard Nirayana planetary mechanics.'}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="btn-gold px-6 py-3 rounded-lg text-sm font-bold shadow-md"
                >
                  {lang === 'or' ? 'ବିସ୍ତୃତ ପରିଚୟ ପଢନ୍ତୁ' : 'Read Full Biography'}
                </Link>
                <Link
                  href="/contact"
                  className="btn-navy px-6 py-3 rounded-lg text-sm font-bold"
                >
                  {lang === 'or' ? 'ଯୋଗାଯୋଗ କରନ୍ତୁ' : 'Get in Touch'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW CONSULTATION WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ସରଳ ପ୍ରଣାଳୀ' : 'Transparent Process'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            {lang === 'or' ? 'ପରାମର୍ଶ କିପରି ନେବେ?' : 'How Consultation Works'}
          </h2>
          <p className="text-gray-600">
            {lang === 'or'
              ? '୪ଟି ସରଳ ପଦକ୍ଷେପରେ ଆପଣଙ୍କ ପରାମର୍ଶ ନିଶ୍ଚିତ କରନ୍ତୁ'
              : 'Four structured steps to reserve your confidential personal consultation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl border border-gold/20 text-center">
            <div className="w-12 h-12 rounded-full bg-vedic-navy text-gold font-bold flex items-center justify-center mx-auto mb-4 text-lg">
              1
            </div>
            <h3 className="font-bold text-navy mb-2">
              {lang === 'or' ? 'ସେବା ଚୟନ' : 'Choose Service'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'or' ? 'କୁଣ୍ଡଳୀ ବିଚାର, ଯୋଟକ ମେଳକ ବା କର୍ମଜୀବନ ପରାମର୍ଶ ବାଛନ୍ତୁ।' : 'Select Janma Kundli, Marriage Matching, or Career guidance.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold/20 text-center">
            <div className="w-12 h-12 rounded-full bg-vedic-navy text-gold font-bold flex items-center justify-center mx-auto mb-4 text-lg">
              2
            </div>
            <h3 className="font-bold text-navy mb-2">
              {lang === 'or' ? 'ଜନ୍ମ ବିବରଣୀ ଦାଖଲ' : 'Submit Details'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'or' ? 'ଆପଣଙ୍କର ସଠିକ ଜନ୍ମ ତାରିଖ, ସମୟ ଏବଂ ସ୍ଥାନ ପ୍ରଦାନ କରନ୍ତୁ।' : 'Provide accurate birth date, exact time, and birthplace.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold/20 text-center">
            <div className="w-12 h-12 rounded-full bg-vedic-navy text-gold font-bold flex items-center justify-center mx-auto mb-4 text-lg">
              3
            </div>
            <h3 className="font-bold text-navy mb-2">
              {lang === 'or' ? 'ସମୟ ନିର୍ଦ୍ଧାରଣ' : 'Confirm Slot'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'or' ? 'ଆପଣଙ୍କ ଅନୁକୂଳ ତାରିଖ ଓ ସମୟ ବାଛି ବୁକିଂ ନିଶ୍ଚିତ କରନ୍ତୁ।' : 'Pick an appointment slot for Phone, Video, or In-person.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gold/20 text-center">
            <div className="w-12 h-12 rounded-full bg-vedic-navy text-gold font-bold flex items-center justify-center mx-auto mb-4 text-lg">
              4
            </div>
            <h3 className="font-bold text-navy mb-2">
              {lang === 'or' ? 'ପରାମର୍ଶ ଲାଭ' : 'Receive Guidance'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'or' ? 'ପଣ୍ଡିତଜୀଙ୍କ ସହିତ ସିଧାସଳଖ ଆଲୋଚନା ଓ ପ୍ରତିକାର ଗ୍ରହଣ।' : 'One-on-one consultation with personal remedies.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
