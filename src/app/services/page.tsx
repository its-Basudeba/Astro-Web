'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, Clock, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ServicesPage() {
  const { lang, t } = useLanguage();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.services) {
          setServices(data.services);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-cream-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ବୈଦିକ ସେବା ସୂଚୀ' : 'Consultation Portfolio'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-navy mb-4">
            {t.servicesSection.title}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            {t.servicesSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-gold/30 p-8 shadow-md flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-navy">
                    {lang === 'or' ? s.title_or : s.title_en}
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                    {s.duration_mins} {t.servicesSection.durationMinutes}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {lang === 'or' ? s.description_or : s.description_en}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Proposed Dakshina</span>
                  <span className="text-xl font-bold text-amber-700">₹{s.draft_price_inr}</span>
                </div>

                <Link
                  href={`/booking?service=${s.id}`}
                  className="btn-gold px-6 py-2.5 rounded-lg text-sm font-bold shadow inline-flex items-center gap-2"
                >
                  <span>{t.common.bookConsultation}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-6 rounded-xl border border-gray-200 text-xs text-gray-500 max-w-2xl mx-auto text-center leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-green-600 inline mr-1" />
          <span>Notice: Consultation dakshina and service parameters are indicative drafts pending final verification with Pandit Dhananjaya Nanda.</span>
        </div>
      </div>
    </div>
  );
}
