import React from 'react';

export default function CancellationPage() {
  return (
    <div className="bg-cream-bg min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-gold/30 shadow-md">
        <h1 className="text-3xl font-bold text-navy mb-6">Refund & Cancellation Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: October 2026 | Pandit Dhananjaya Nanda Practice</p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-navy mb-2">1. Rescheduling Appointments</h2>
            <p>
              Clients may reschedule an appointment free of charge by providing at least 12 hours advance notice via WhatsApp or phone.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mb-2">2. Cancellations and Refunds</h2>
            <p>
              Cancellations requested at least 24 hours prior to the scheduled consultation are eligible for a full refund. Same-day cancellations may incur an administrative fee to offset reserved time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mb-2">3. Completed Consultations</h2>
            <p>
              Once an astrological reading or puja ritual has been rendered, fees are non-refundable as the professional time and scriptural work have already been dedicated.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
