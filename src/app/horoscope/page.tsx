'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ZODIAC_SIGNS } from '@/lib/astrology/kundli';
import { Sun, Moon, Info, Sparkles } from 'lucide-react';

export default function HoroscopePage() {
  const { lang, t } = useLanguage();
  const [selectedSign, setSelectedSign] = useState(ZODIAC_SIGNS[0]);

  // Informational, non-fabricated, educational insights on the 12 rashis and planetary lords
  const rashiInsights: Record<string, { en: string; or: string; element: string; elementOr: string }> = {
    Aries: {
      en: 'Aries is ruled by Mars (Mangala). Characterized by dynamic leadership, courage, initiative, and passionate energy. Favorable for bold endeavors when Mars is well-aspected.',
      or: 'ମେଷ ରାଶିର ଅଧିପତି ଗ୍ରହ ମଙ୍ଗଳ। ଏହି ରାଶିର ବ୍ୟକ୍ତିମାନେ ସାହସୀ, କର୍ମଠ ଏବଂ ନେତୃତ୍ୱ ନେବାରେ ଅଗ୍ରଣୀ ହୋଇଥାନ୍ତି।',
      element: 'Fire',
      elementOr: 'ଅଗ୍ନି ତତ୍ତ୍ୱ',
    },
    Taurus: {
      en: 'Taurus is ruled by Venus (Shukra). Associated with steadfast patience, aesthetic sensitivity, devotion to family, and grounded practical achievements.',
      or: 'ବୃଷ ରାଶିର ଅଧିପତି ଶୁକ୍ର। ଏହି ରାଶି ଧୈର୍ଯ୍ୟ, ସୌନ୍ଦର୍ଯ୍ୟ ବୋଧ ଏବଂ ସ୍ଥିରତାର ପ୍ରତୀକ।',
      element: 'Earth',
      elementOr: 'ପୃଥିବୀ ତତ୍ତ୍ୱ',
    },
    Gemini: {
      en: 'Gemini is ruled by Mercury (Budha). Gifted in intellectual agility, commerce, communication, and learning diverse disciplines.',
      or: 'ମିଥୁନ ରାଶିର ଅଧିପତି ବୁଧ। ବୁଦ୍ଧିମତା, ସମ୍ବାଦପ୍ରେରଣ ଏବଂ ବ୍ୟବସାୟିକ ଦକ୍ଷତା ଏହି ରାଶିର ପ୍ରମୁଖ ଗୁଣ।',
      element: 'Air',
      elementOr: 'ବାୟୁ ତତ୍ତ୍ୱ',
    },
    Cancer: {
      en: 'Cancer is ruled by the Moon (Chandra). Deeply empathetic, intuitive, nurturing, and family-centered with strong protective instincts.',
      or: 'କର୍କଟ ରାଶିର ଅଧିପତି ଚନ୍ଦ୍ର। ଭାବପ୍ରବଣତା, ସ୍ନେହ, ଏବଂ ପାରିବାରିକ ମମତା ଏହାର ବୈଶିଷ୍ଟ୍ୟ।',
      element: 'Water',
      elementOr: 'ଜଳ ତତ୍ତ୍ୱ',
    },
    Leo: {
      en: 'Leo is ruled by the Sun (Surya). Possesses natural regal dignity, spiritual vitality, generosity, and protective authority.',
      or: 'ସିଂହ ରାଶିର ଅଧିପତି ସୂର୍ଯ୍ୟ। ଆତ୍ମସମ୍ମାନ, ତେଜସ୍ୱିତା ଏବଂ ଦାନଶୀଳତା ଏହି ରାଶିର ଲକ୍ଷଣ।',
      element: 'Fire',
      elementOr: 'ଅଗ୍ନି ତତ୍ତ୍ୱ',
    },
    Virgo: {
      en: 'Virgo is ruled by Mercury (Budha). Highly analytical, disciplined, service-oriented, and meticulous in craft and health preservation.',
      or: 'କନ୍ୟା ରାଶିର ଅଧିପତି ବୁଧ। ବିଶ୍ଳେଷଣାତ୍ମକ ବୁଦ୍ଧି, ସେବା ମନୋଭାବ ଏବଂ କର୍ତ୍ତବ୍ୟନିଷ୍ଠା।',
      element: 'Earth',
      elementOr: 'ପୃଥିବୀ ତତ୍ତ୍ୱ',
    },
    Libra: {
      en: 'Libra is ruled by Venus (Shukra). Focused on equilibrium, justice, refined relationships, diplomacy, and societal harmony.',
      or: 'ତୁଳା ରାଶିର ଅଧିପତି ଶୁକ୍ର। ନ୍ୟାୟପ୍ରିୟତା, ସମନ୍ୱୟ ଏବଂ ଶାନ୍ତିପୂର୍ଣ୍ଣ ଆଚରଣ।',
      element: 'Air',
      elementOr: 'ବାୟୁ ତତ୍ତ୍ୱ',
    },
    Scorpio: {
      en: 'Scorpio is ruled by Mars (Mangala). Endowed with profound emotional depth, investigative mastery, resilience, and spiritual transformation.',
      or: 'ବିଛା ରାଶିର ଅଧିପତି ମଙ୍ଗଳ। ଗଭୀର ଆଧ୍ୟାତ୍ମିକ ଚିନ୍ତନ ଏବଂ ପ୍ରତିକୂଳ ପରିସ୍ଥିତିକୁ ଜୟ କରିବାର କ୍ଷମତା।',
      element: 'Water',
      elementOr: 'ଜଳ ତତ୍ତ୍ୱ',
    },
    Sagittarius: {
      en: 'Sagittarius is ruled by Jupiter (Guru). Oriented toward philosophical wisdom, higher scriptural study, dharma, and righteous optimism.',
      or: 'ଧନୁ ରାଶିର ଅଧିପତି ବୃହସ୍ପତି। ଧାର୍ମିକ ବିଶ୍ୱାସ, ଉଚ୍ଚ ଶିକ୍ଷା ଏବଂ ସତ୍ୟନିଷ୍ଠ ଜୀବନ।',
      element: 'Fire',
      elementOr: 'ଅଗ୍ନି ତତ୍ତ୍ୱ',
    },
    Capricorn: {
      en: 'Capricorn is ruled by Saturn (Shani). Epitomizes perseverance, patience, organizational mastery, and long-term societal contributions.',
      or: 'ମକର ରାଶିର ଅଧିପତି ଶନି। କଠୋର ପରିଶ୍ରମ, ନିଷ୍ଠା ଏବଂ ଲକ୍ଷ୍ୟ ହାସଲ କରିବାର ଧୈର୍ଯ୍ୟ।',
      element: 'Earth',
      elementOr: 'ପୃଥିବୀ ତତ୍ତ୍ୱ',
    },
    Aquarius: {
      en: 'Aquarius is ruled by Saturn (Shani). Humanitarian, visionary, reform-oriented, and deeply reflective regarding collective well-being.',
      or: 'କୁମ୍ଭ ରାଶିର ଅଧିପତି ଶନି। ସମାଜ କଲ୍ୟାଣ, ଦୂରଦୃଷ୍ଟି ଏବଂ ନୂତନ ଚିନ୍ତାଧାରା।',
      element: 'Air',
      elementOr: 'ବାୟୁ ତତ୍ତ୍ୱ',
    },
    Pisces: {
      en: 'Pisces is ruled by Jupiter (Guru). Revered for boundless compassion, mystical insight, spiritual liberation (Moksha), and poetic sensibility.',
      or: 'ମୀନ ରାଶିର ଅଧିପତି ବୃହସ୍ପତି। କରୁଣା, ମୋକ୍ଷ ଅଭିଳାଷ ଏବଂ ଗଭୀର ଭକ୍ତିଭାବ।',
      element: 'Water',
      elementOr: 'ଜଳ ତତ୍ତ୍ୱ',
    },
  };

  const currentInsight = rashiInsights[selectedSign.en] || rashiInsights['Aries'];

  return (
    <div className="bg-cream-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ରାଶି ତତ୍ତ୍ୱ ଓ ଜ୍ୟୋତିଷ ବିଚାର' : '12 Rashis & Planetary Influences'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-navy mb-4">
            {t.common.dailyHoroscope}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore traditional Vedic insights into the twelve zodiac signs, their ruling planetary lords, and scriptural temperament.
          </p>
        </div>

        {/* 12 Rashi Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
          {ZODIAC_SIGNS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSign(s)}
              className={`p-4 rounded-xl border text-center transition-all ${
                selectedSign.id === s.id
                  ? 'border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-500/20'
                  : 'border-gray-200 bg-white hover:border-amber-300'
              }`}
            >
              <span className="block font-bold text-navy text-base">
                {lang === 'or' ? s.or : s.en}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">
                Lord: {s.lord}
              </span>
            </button>
          ))}
        </div>

        {/* Detailed Selected Rashi Card */}
        <div className="bg-white rounded-2xl border border-gold/30 p-8 sm:p-12 shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Rashi #{selectedSign.id} | {lang === 'or' ? currentInsight.elementOr : currentInsight.element}
              </span>
              <h2 className="text-3xl font-bold text-navy mt-1">
                {lang === 'or' ? selectedSign.or : selectedSign.en}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-500 block">Ruling Deity / Lord:</span>
              <span className="text-lg font-bold text-amber-700">{selectedSign.lord}</span>
            </div>
          </div>

          <div className="py-6">
            <h3 className="font-bold text-navy text-lg mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Vedic Characteristics & Temperament</span>
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {lang === 'or' ? currentInsight.or : currentInsight.en}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100 bg-gray-50/70 -mx-8 -mb-12 p-8 rounded-b-2xl text-xs text-gray-500 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Scientific & Scriptural Accuracy Notice:</strong> Live personal horoscopes require individual birth-chart (Kundli) calculations with precise degree-level Dasha transitions. Generic sign interpretations are strictly educational. For customized personal forecasting, please consult Pandit Ji directly.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
