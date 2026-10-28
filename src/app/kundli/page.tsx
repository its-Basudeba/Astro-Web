'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { generateKundli, KundliResult } from '@/lib/astrology/kundli';
import { Sparkles, Calendar, Clock, MapPin, User, Compass, Info, ShieldAlert } from 'lucide-react';

export default function KundliPage() {
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: 'Ramesh Mohanty',
    dob: '1992-05-15',
    tob: '06:45',
    pob: 'Bhubaneswar, Odisha',
    lat: '20.2961',
    lon: '85.8245',
    tz: '5.5',
  });

  const [kundliResult, setKundliResult] = useState<KundliResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const latNum = parseFloat(formData.lat);
      const lonNum = parseFloat(formData.lon);
      const tzNum = parseFloat(formData.tz);

      if (isNaN(latNum) || isNaN(lonNum) || isNaN(tzNum)) {
        throw new Error('Please enter valid numeric latitude and longitude coordinates.');
      }

      const res = generateKundli(
        formData.name,
        formData.dob,
        formData.tob,
        formData.pob,
        latNum,
        lonNum,
        tzNum
      );
      setKundliResult(res);
    } catch (err: any) {
      setError(err.message || 'Error computing planetary ephemeris.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ପ୍ରାମାଣିକ ବୈଦିକ ଗଣିତ' : 'Authentic Astronomical Engine'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            {t.kundliTool.title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {t.kundliTool.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gold/30 shadow-md">
            <h2 className="text-xl font-bold text-navy mb-6 pb-2 border-b border-gold/20 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              <span>{lang === 'or' ? 'ଜନ୍ମ ବିବରଣୀ ଦାଖଲ' : 'Enter Birth Details'}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  {t.kundliTool.nameLabel}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    {t.kundliTool.dobLabel}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    {t.kundliTool.tobLabel}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="time"
                      required
                      value={formData.tob}
                      onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  {t.kundliTool.pobLabel}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.pob}
                    onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Coordinates & Timezone */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="block font-medium text-gray-600 mb-0.5">Latitude (°N)</label>
                  <input
                    type="text"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600 mb-0.5">Longitude (°E)</label>
                  <input
                    type="text"
                    value={formData.lon}
                    onChange={(e) => setFormData({ ...formData, lon: e.target.value })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-600 mb-0.5">TZ Offset (hrs)</label>
                  <input
                    type="text"
                    value={formData.tz}
                    onChange={(e) => setFormData({ ...formData, tz: e.target.value })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3 rounded-lg text-sm font-bold shadow-md mt-4 transition-all"
              >
                {loading ? t.kundliTool.calculating : t.kundliTool.generateBtn}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] text-gray-500 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{t.kundliTool.disclaimer}</span>
            </div>
          </div>

          {/* Right Column: Calculated Results */}
          <div className="lg:col-span-7">
            {kundliResult ? (
              <div className="space-y-6">
                {/* Core Astrological Highlights */}
                <div className="bg-vedic-navy text-white p-6 rounded-2xl border border-gold/40 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs text-gold uppercase tracking-wider">
                        {lang === 'or' ? 'ଜନ୍ମ ବିବରଣୀ' : 'Calculated Ephemeris'}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{kundliResult.birthDetails.name}</h3>
                      <p className="text-xs text-gray-300">
                        {kundliResult.birthDetails.date} at {kundliResult.birthDetails.time} | {kundliResult.birthDetails.place}
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-gold/20 text-gold-light border border-gold/30 rounded">
                      {kundliResult.ayanamsha.name} Ayanamsha: {kundliResult.ayanamsha.valueDegrees}°
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gold/20 text-center">
                    <div className="bg-white/5 p-3 rounded-lg border border-gold/15">
                      <span className="text-xs text-gray-300 block mb-1">{t.kundliTool.lagna}</span>
                      <span className="text-lg font-bold text-gold">
                        {lang === 'or' ? kundliResult.lagna.odiaSign : kundliResult.lagna.sign}
                      </span>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        {kundliResult.lagna.degree}° ({lang === 'or' ? kundliResult.lagna.odiaNakshatra : kundliResult.lagna.nakshatra} - Pada {kundliResult.lagna.pada})
                      </span>
                    </div>

                    <div className="bg-white/5 p-3 rounded-lg border border-gold/15">
                      <span className="text-xs text-gray-300 block mb-1">{t.kundliTool.rashi}</span>
                      <span className="text-lg font-bold text-gold">
                        {lang === 'or' ? kundliResult.moonSign.odiaSign : kundliResult.moonSign.sign}
                      </span>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        {lang === 'or' ? kundliResult.moonSign.odiaNakshatra : kundliResult.moonSign.nakshatra} - Pada {kundliResult.moonSign.pada}
                      </span>
                    </div>

                    <div className="bg-white/5 p-3 rounded-lg border border-gold/15">
                      <span className="text-xs text-gray-300 block mb-1">{t.kundliTool.nakshatra}</span>
                      <span className="text-lg font-bold text-gold">
                        {lang === 'or' ? kundliResult.moonSign.odiaNakshatra : kundliResult.moonSign.nakshatra}
                      </span>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        Pada {kundliResult.moonSign.pada}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 12 Bhavas (Houses) Overview */}
                <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-md">
                  <h3 className="text-lg font-bold text-navy mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <span>{lang === 'or' ? '୧୨ ଭାବ ଏବଂ ଅଧିଷ୍ଠିତ ଗ୍ରହ (Whole Sign Bhavas)' : '12 Bhavas & Occupying Planets'}</span>
                    <span className="text-xs text-gray-500 font-normal">Nirayana System</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {kundliResult.houses.map((h) => (
                      <div key={h.houseNumber} className="p-3 rounded-lg border border-gray-200 bg-gray-50/50">
                        <div className="flex justify-between items-center text-xs font-bold text-navy mb-1">
                          <span>House {h.houseNumber}</span>
                          <span className="text-amber-700">{lang === 'or' ? h.odiaSign : h.sign}</span>
                        </div>
                        <div className="text-[11px] text-gray-600 min-h-[20px]">
                          {h.planetsInHouse.length > 0 ? (
                            <span className="text-navy font-semibold">{h.planetsInHouse.join(', ')}</span>
                          ) : (
                            <span className="text-gray-400 italic">Empty</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Planetary Positions Table */}
                <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-md overflow-x-auto">
                  <h3 className="text-lg font-bold text-navy mb-4 pb-2 border-b border-gray-100">
                    {t.kundliTool.planetaryPositions}
                  </h3>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-100/75 text-gray-600 border-b border-gray-200">
                        <th className="py-2.5 px-3">Planet</th>
                        <th className="py-2.5 px-3">Zodiac Sign</th>
                        <th className="py-2.5 px-3">House</th>
                        <th className="py-2.5 px-3">Nakshatra</th>
                        <th className="py-2.5 px-3">Degree</th>
                        <th className="py-2.5 px-3">Motion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {kundliResult.planets.map((p) => (
                        <tr key={p.name} className="hover:bg-amber-50/40">
                          <td className="py-2.5 px-3 font-bold text-navy">
                            {lang === 'or' ? p.odiaName : p.name} ({p.sanskritName})
                          </td>
                          <td className="py-2.5 px-3">
                            {lang === 'or' ? p.odiaSign : p.sign}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-amber-700">
                            House {p.house}
                          </td>
                          <td className="py-2.5 px-3">
                            {lang === 'or' ? p.odiaNakshatra : p.nakshatra} (Pada {p.pada})
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            {p.degreeInSign}°
                          </td>
                          <td className="py-2.5 px-3">
                            {p.isRetrograde ? (
                              <span className="text-red-600 font-bold">Retrograde (R)</span>
                            ) : (
                              <span className="text-green-700">Direct</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gold/40 text-center">
                <Compass className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-bold text-navy mb-2">
                  {lang === 'or' ? 'କୁଣ୍ଡଳୀ ଫଳାଫଳ ଅପେକ୍ଷାରେ' : 'Ready to Compute Your Janma Kundli'}
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  {lang === 'or'
                    ? 'ବାମ ପଟେ ଆପଣଙ୍କ ଜନ୍ମ ତାରିଖ, ସମୟ ଓ ସ୍ଥାନ ଦାଖଲ କରି କୁଣ୍ଡଳୀ ପ୍ରସ୍ତୁତ କରନ୍ତୁ।'
                    : 'Fill in your birth details on the left and click Generate to see your Nirayana planetary degrees and Lagna chart.'}
                </p>
                <div className="inline-block p-3 rounded-lg bg-amber-50 text-amber-800 text-xs text-left max-w-sm">
                  <strong>Standard Test Verification:</strong> Default coordinates are preset for Bhubaneswar, Odisha. Click &quot;Generate Vedic Janma Kundli&quot; to test calculations.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
