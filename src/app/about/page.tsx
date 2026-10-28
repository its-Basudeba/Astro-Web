'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, Sparkles, BookOpen, Compass, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-cream-bg min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ଜ୍ୟୋତିଷ ପରିଚୟ' : 'Vedic Practitioner Profile'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-navy mb-4">
            {t.common.about}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            {t.common.tagline}
          </p>
        </div>

        {/* Profile Details Card */}
        <div className="bg-white rounded-2xl border border-gold/30 p-8 sm:p-12 shadow-md mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8 pb-8 border-b border-gray-100">
            <div className="md:col-span-4 text-center">
              <div className="w-48 h-48 mx-auto rounded-full border-4 border-gold p-2 bg-gradient-to-tr from-amber-700 to-yellow-600 flex items-center justify-center shadow-lg">
                <div className="w-full h-full rounded-full bg-vedic-navy flex flex-col items-center justify-center text-center p-4">
                  <span className="text-5xl text-gold font-bold mb-1">ॐ</span>
                  <span className="text-sm font-bold text-white leading-tight">{t.common.brandName}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <h2 className="text-2xl font-bold text-navy">
                {lang === 'or' ? 'ପଣ୍ଡିତ ଧନଞ୍ଜୟ ନନ୍ଦଙ୍କ ବିଷୟରେ' : 'Biographical Background & Heritage'}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {lang === 'or'
                  ? 'ପଣ୍ଡିତ ଧନଞ୍ଜୟ ନନ୍ଦ ଓଡ଼ିଶାର ଏକ ପ୍ରାଚୀନ ଧାର୍ମିକ ଓ ଜ୍ୟୋତିଷ ପରିବେଶରେ ବଢି ଉଠିଛନ୍ତି। ପାରମ୍ପରିକ ଗୁରୁକୁଳ ପଦ୍ଧତି ଏବଂ ବୈଦିକ ଗଣିତ ଶାସ୍ତ୍ର ଅଧ୍ୟୟନ ପରେ ସେ ନିଜ ଜୀବନକୁ ସମାଜର ମଙ୍ଗଳ ପାଇଁ ଉତ୍ସର୍ଗ କରିଛନ୍ତି।'
                  : 'Pandit Dhananjaya Nanda was raised in the rich spiritual tradition of Odisha, developing early devotion to classical Sanskrit scriptures, Siddhanta astronomy, and Phalit astrology. His lineage values scholarship, moral integrity, and humility.'}
              </p>
              <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                <strong>Editorial Transparency Notice:</strong> All historical qualifications, degrees, and awards displayed here will be updated with verified documentation provided directly by Pandit Ji before publication.
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
            <h3 className="text-xl font-bold text-navy flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{lang === 'or' ? 'ଜ୍ୟୋତିଷୀୟ ଦର୍ଶନ ଓ ପଦ୍ଧତି' : 'Consultation Philosophy & Principles'}</span>
            </h3>

            <p>
              {lang === 'or'
                ? 'ଆମର ବିଶ୍ୱାସ ଯେ ଜ୍ୟୋତିଷ ଶାସ୍ତ୍ର କୌଣସି ଅନ୍ଧବିଶ୍ୱାସ ନୁହେଁ; ଏହା ହେଉଛି ଆମ ପୂର୍ବଜନ୍ମାର୍ଜିତ କର୍ମ ଓ ଗ୍ରହମାନଙ୍କ ପ୍ରଭାବର ଏକ ବୈଜ୍ଞାନିକ ଓ ଆଧ୍ୟାତ୍ମିକ ଦର୍ପଣ।'
                : 'Vedic astrology is viewed not as a tool for fatalism or superstitious fear, but as a compassionate cosmic map. It illuminates the Prarabdha Karma (destined momentum) and offers spiritual guidance to harmonize one’s thoughts, health, and actions.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <h4 className="font-bold text-navy text-sm mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Nirayana Lahiri Ephemeris</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Planetary longitudes computed using Chitrapaksha Lahiri Ayanamsha for authentic sidereal zodiac alignment.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <h4 className="font-bold text-navy text-sm mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Sattvic Remedial Measures</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Focus on authentic mantra japa, fasting disciplines (Vratas), seva (charity), and scriptural peace rituals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/booking"
            className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold shadow-md inline-block"
          >
            {t.common.bookConsultation}
          </Link>
        </div>
      </div>
    </div>
  );
}
