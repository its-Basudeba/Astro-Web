'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-cream-bg min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ପଣ୍ଡିତଜୀଙ୍କ ସହିତ ସମ୍ପର୍କ' : 'Direct Communication'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-navy mb-4">
            {t.common.contact}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Reach out directly for consultation scheduling, muhurta inquiries, or temple worship services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-vedic-navy text-white p-8 sm:p-10 rounded-2xl border border-gold/40 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-gold-light mb-6">
              Consultation Chambers
            </h2>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
              <div>
                <strong className="block text-sm text-gold">Location</strong>
                <span className="text-sm text-gray-300">Odisha, India (In-person consultations by prior appointment in Bhubaneswar / Cuttack)</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
              <div>
                <strong className="block text-sm text-gold">Mobile / WhatsApp</strong>
                <span className="text-sm text-gray-300">{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+91 94370 00000"}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-gold shrink-0 mt-1" />
              <div>
                <strong className="block text-sm text-gold">Electronic Mail</strong>
                <span className="text-sm text-gray-300">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "consultation@panditdhananjayananda.com"}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-gold shrink-0 mt-1" />
              <div>
                <strong className="block text-sm text-gold">Visiting Hours</strong>
                <span className="text-sm text-gray-300">Morning: 09:30 AM - 12:30 PM<br />Evening: 04:30 PM - 08:30 PM</span>
              </div>
            </div>
          </div>

          {/* Direct Query Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gold/30 shadow-md">
            {submitted ? (
              <div className="p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-2">Message Received</h3>
                <p className="text-sm text-gray-600">
                  Thank you for your message. Pandit Ji’s office will contact you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-navy mb-4">Send an Inquiry</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Name</label>
                  <input type="text" required className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">WhatsApp / Phone</label>
                  <input type="tel" required className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Inquiry / Subject</label>
                  <textarea rows={4} required className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Please state your inquiry..."></textarea>
                </div>
                <button type="submit" className="btn-gold px-6 py-2.5 rounded-lg text-sm font-bold shadow">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
