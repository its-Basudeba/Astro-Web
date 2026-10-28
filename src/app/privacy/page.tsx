import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-cream-bg min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl border border-gold/30 shadow-md">
        <h1 className="text-3xl font-bold text-navy mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: October 2026 | Practice of Pandit Dhananjaya Nanda</p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-navy mb-2">1. Commitment to Client Confidentiality</h2>
            <p>
              Pandit Dhananjaya Nanda respects the privacy of all clients seeking Vedic astrological consultations. Birth information, contact details, and personal life questions shared during consultation remain strictly confidential and are never sold or distributed to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mb-2">2. Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Birth Details:</strong> Date, exact time, and birthplace for celestial ephemeris calculation.</li>
              <li><strong>Contact Information:</strong> Name, mobile/WhatsApp number, and email address for appointment communication.</li>
              <li><strong>Consultation Notes:</strong> Optional background details submitted to tailor your astrological guidance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mb-2">3. Payment Security</h2>
            <p>
              When online payments are configured, transactions are processed directly through certified RBI-compliant gateways (such as Razorpay). We never collect, store, or view full credit/debit card numbers or UPI PINs on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy mb-2">4. Astrological Disclaimer</h2>
            <p>
              Astrological interpretations are advisory spiritual perspectives rooted in ancient Vedic tradition. They do not constitute certified medical, psychiatric, financial, or legal advice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
