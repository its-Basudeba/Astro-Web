import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-cream-bg min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-gold/30 shadow-md">
        <h1 className="text-3xl font-bold text-navy mb-6">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: October 2026 | Pandit Dhananjaya Nanda Practice</p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-navy mb-2">1. Nature of Services</h2>
            <p>
              Consultations provided by Pandit Dhananjaya Nanda are based on the classical principles of Nirayana Vedic Astrology and traditional Hindu scriptures. Astrology is a spiritual and interpretive discipline; therefore, no guaranteed outcomes regarding marriage, employment, financial windfalls, or health can be promised.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mb-2">2. Client Responsibility</h2>
            <p>
              Accurate astrological readings depend upon accurate birth records (date, time, and birthplace). Clients are responsible for ensuring the accuracy of details submitted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mb-2">3. Appointments and Conduct</h2>
            <p>
              Clients agree to maintain dignified, respectful conduct during personal, telephonic, or video consultations. Any abusive behavior will result in immediate termination of the session without refund.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
