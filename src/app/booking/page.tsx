'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface ServiceItem {
  id: string;
  slug: string;
  title_en: string;
  title_or: string;
  description_en: string;
  description_or: string;
  duration_mins: number;
  draft_price_inr: number;
}

export default function BookingPage() {
  const { lang, t } = useLanguage();

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Time slots available for consultation
  const timeSlots = [
    '09:30 AM - 10:15 AM',
    '10:30 AM - 11:15 AM',
    '11:30 AM - 12:15 PM',
    '04:30 PM - 05:15 PM',
    '05:30 PM - 06:15 PM',
    '06:30 PM - 07:15 PM',
    '07:30 PM - 08:15 PM',
  ];

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.services) {
          setServices(data.services);
          if (data.services.length > 0) {
            setSelectedServiceId(data.services[0].id);
          }
        }
      })
      .catch((err) => console.error('Failed to load services:', err));

    // Preset tomorrow's date by default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
    setTimeSlot('10:30 AM - 11:15 AM');
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedServiceId,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          bookingDate,
          bookingTimeSlot: timeSlot,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Unable to complete reservation.');
      }

      setBookingConfirmed(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during booking.');
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find((s) => s.id === selectedServiceId);

  return (
    <div className="bg-cream-bg min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ପରାମର୍ଶ ସମୟ ସଂରକ୍ଷଣ' : 'Direct Astrological Appointment'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            {t.bookingSection.title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {t.bookingSection.subtitle}
          </p>
        </div>

        {bookingConfirmed ? (
          <div className="bg-white p-8 sm:p-12 rounded-2xl border-2 border-green-500 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
              {lang === 'or' ? 'ଅନୁରୋଧ ଗୃହୀତ ହେଲା' : 'Appointment Reserved'}
            </span>
            <h2 className="text-2xl font-bold text-navy mt-1 mb-2">
              Booking Ref: <span className="font-mono text-amber-700">{bookingConfirmed.bookingId}</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto mb-6">
              {lang === 'or'
                ? 'ପଣ୍ଡିତ ଧନଞ୍ଜୟ ନନ୍ଦଙ୍କ ସହିତ ଆପଣଙ୍କ ପରାମର୍ଶ ସମୟ ସଫଳତାର ସହ ସଂରକ୍ଷିତ ହୋଇଛି।'
                : 'Your consultation with Pandit Dhananjaya Nanda has been reserved in our system.'}
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left text-sm max-w-md mx-auto mb-8 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-semibold text-navy">{bookingConfirmed.details?.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-semibold text-navy">{bookingConfirmed.details?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Slot:</span>
                <span className="font-semibold text-navy">{bookingConfirmed.details?.timeSlot}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-500">Proposed Fee:</span>
                <span className="font-bold text-amber-700">₹{bookingConfirmed.details?.amount}</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg text-xs text-amber-900 border border-amber-200/70 mb-6">
              <strong>Next Step:</strong> You will receive a WhatsApp/Call confirmation to finalize the consultation mode (Phone / Video / Temple visit) prior to the appointment.
            </div>

            <button
              onClick={() => {
                setBookingConfirmed(null);
                setName('');
                setPhone('');
                setEmail('');
              }}
              className="btn-navy px-6 py-2.5 rounded-lg text-sm font-semibold"
            >
              Book Another Consultation
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gold/30 shadow-md">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  1. {t.bookingSection.selectService}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedServiceId(s.id)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all ${
                        selectedServiceId === s.id
                          ? 'border-amber-600 bg-amber-50/60 shadow-sm'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <span className="block font-bold text-navy text-sm">
                        {lang === 'or' ? s.title_or : s.title_en}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {s.duration_mins} {t.servicesSection.durationMinutes} | Draft Fee: ₹{s.draft_price_inr}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    2. {t.bookingSection.selectDate}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    3. {t.bookingSection.selectTime}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <label className="block text-xs font-bold text-navy uppercase tracking-wider">
                  4. {t.bookingSection.personalDetails}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">{t.bookingSection.fullName} *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">{t.bookingSection.phone} *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 Mobile / WhatsApp"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t.bookingSection.email} (Optional)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="client@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t.bookingSection.message}</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly state your birth date/time or specific astrological concerns (career, marriage, health)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Price Note & Submit */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-green-600 inline mr-1" />
                  <span>{t.bookingSection.priceNotice}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto btn-gold px-8 py-3.5 rounded-xl text-base font-bold shadow-md"
                >
                  {loading ? 'Reserving Appointment...' : t.bookingSection.confirmBooking}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
