'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function WhatsAppButton() {
  const { lang, t } = useLanguage();
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919437000000';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

  const prefilledMessage = lang === 'or'
    ? 'ନମସ୍କାର ପଣ୍ଡିତଜୀ, ମୁଁ ଜ୍ୟୋତିଷ ପରାମର୍ଶ ପାଇଁ ସମୟ ବୁକ୍ କରିବାକୁ ଚାହେଁ।'
    : 'Namaste Pandit Ji, I would like to inquire about booking an astrology consultation.';

  const encodedMsg = encodeURIComponent(prefilledMessage);
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20ba59] hover:scale-105 transition-all group font-medium text-sm border-2 border-white/60"
        title="Chat with Pandit Dhananjaya Nanda on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="hidden md:inline font-semibold">{t.common.whatsappUs}</span>
      </a>
    </div>
  );
}
