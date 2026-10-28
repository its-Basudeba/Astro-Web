'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { generateKundli } from '@/lib/astrology/kundli';
import { calculateKundliMatching, MatchingResult } from '@/lib/astrology/matching';
import { Heart, User, Calendar, Clock, MapPin, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function MatchingPage() {
  const { lang, t } = useLanguage();

  const [boyData, setBoyData] = useState({
    name: 'Suresh Kumar',
    dob: '1993-08-22',
    tob: '10:15',
    pob: 'Cuttack, Odisha',
    lat: '20.4625',
    lon: '85.8828',
    tz: '5.5',
  });

  const [girlData, setGirlData] = useState({
    name: 'Priyanka Dash',
    dob: '1995-11-10',
    tob: '14:30',
    pob: 'Bhubaneswar, Odisha',
    lat: '20.2961',
    lon: '85.8245',
    tz: '5.5',
  });

  const [matchResult, setMatchResult] = useState<MatchingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const boyKundli = generateKundli(
        boyData.name,
        boyData.dob,
        boyData.tob,
        boyData.pob,
        parseFloat(boyData.lat),
        parseFloat(boyData.lon),
        parseFloat(boyData.tz)
      );

      const girlKundli = generateKundli(
        girlData.name,
        girlData.dob,
        girlData.tob,
        girlData.pob,
        parseFloat(girlData.lat),
        parseFloat(girlData.lon),
        parseFloat(girlData.tz)
      );

      const result = calculateKundliMatching(boyKundli, girlKundli);
      setMatchResult(result);
    } catch (err: any) {
      setError(err.message || 'Error processing Kundli matching.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ଅଷ୍ଟକୂଟ ବିଚାର' : 'Ashtakoota 36-Guna Milan'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            {t.matchingTool.title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {t.matchingTool.subtitle}
          </p>
        </div>

        {/* Input Form for Two People */}
        <form onSubmit={handleMatch} className="bg-white p-6 sm:p-8 rounded-2xl border border-gold/30 shadow-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Boy's Details */}
            <div className="border border-gray-200 p-5 rounded-xl bg-gray-50/50">
              <h3 className="font-bold text-navy mb-4 flex items-center gap-2 text-base pb-2 border-b border-gray-200">
                <User className="w-5 h-5 text-blue-600" />
                <span>{t.matchingTool.boyDetails}</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Groom Name</label>
                  <input
                    type="text"
                    required
                    value={boyData.name}
                    onChange={(e) => setBoyData({ ...boyData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={boyData.dob}
                      onChange={(e) => setBoyData({ ...boyData, dob: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Time of Birth</label>
                    <input
                      type="time"
                      required
                      value={boyData.tob}
                      onChange={(e) => setBoyData({ ...boyData, tob: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Birth Place</label>
                  <input
                    type="text"
                    required
                    value={boyData.pob}
                    onChange={(e) => setBoyData({ ...boyData, pob: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Girl's Details */}
            <div className="border border-gray-200 p-5 rounded-xl bg-gray-50/50">
              <h3 className="font-bold text-navy mb-4 flex items-center gap-2 text-base pb-2 border-b border-gray-200">
                <User className="w-5 h-5 text-pink-600" />
                <span>{t.matchingTool.girlDetails}</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Bride Name</label>
                  <input
                    type="text"
                    required
                    value={girlData.name}
                    onChange={(e) => setGirlData({ ...girlData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={girlData.dob}
                      onChange={(e) => setGirlData({ ...girlData, dob: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Time of Birth</label>
                    <input
                      type="time"
                      required
                      value={girlData.tob}
                      onChange={(e) => setGirlData({ ...girlData, tob: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Birth Place</label>
                  <input
                    type="text"
                    required
                    value={girlData.pob}
                    onChange={(e) => setGirlData({ ...girlData, pob: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded">{error}</div>}

          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold px-10 py-3.5 rounded-xl text-base font-bold shadow-md"
            >
              {loading ? 'Calculating Guna Milan...' : t.matchingTool.matchBtn}
            </button>
          </div>
        </form>

        {/* Matching Results */}
        {matchResult && (
          <div className="space-y-8">
            {/* Scorecard Hero */}
            <div className="bg-vedic-navy text-white p-8 rounded-2xl border border-gold/40 shadow-xl text-center">
              <span className="text-xs text-gold uppercase tracking-wider block mb-2">
                {t.matchingTool.score}
              </span>
              <div className="flex items-center justify-center gap-4 my-4">
                <span className="text-5xl sm:text-6xl font-bold text-gold">
                  {matchResult.totalScore}
                </span>
                <span className="text-2xl text-gray-400 font-light">/ {matchResult.maxScore}</span>
              </div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold-light border border-gold/40 text-sm font-semibold mb-4">
                {lang === 'or' ? matchResult.verdict.odiaGrade : matchResult.verdict.grade} Compatibility ({matchResult.percentage}%)
              </span>
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
                {lang === 'or' ? matchResult.verdict.odiaRecommendation : matchResult.verdict.recommendation}
              </p>
            </div>

            {/* Ashtakoota 8 Kootas Breakdown */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gold/30 shadow-md overflow-x-auto">
              <h3 className="text-xl font-bold text-navy mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-600" />
                <span>Ashtakoota 8 Koota Score Analysis</span>
              </h3>

              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-100/75 text-gray-700 border-b border-gray-200">
                    <th className="py-3 px-4">Koota</th>
                    <th className="py-3 px-4">Maximum</th>
                    <th className="py-3 px-4">Obtained</th>
                    <th className="py-3 px-4">Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {matchResult.kootas.map((k) => (
                    <tr key={k.name} className="hover:bg-amber-50/30">
                      <td className="py-3 px-4 font-bold text-navy">
                        {lang === 'or' ? k.odiaName : k.name}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-500">
                        {k.maxScore}
                      </td>
                      <td className="py-3 px-4 font-bold text-amber-700 text-base">
                        {k.obtainedScore}
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-600">
                        {lang === 'or' ? k.odiaDescription : k.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{matchResult.disclaimer}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
