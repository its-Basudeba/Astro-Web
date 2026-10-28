import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Pandit Dhananjaya Nanda | Vedic Astrology, Kundli & Consultation',
  description: 'Authentic Vedic astrology services, Janma Kundli calculations, 36-Guna matching, and spiritual consultations by Pandit Dhananjaya Nanda in Odisha.',
  keywords: 'Vedic Astrology, Pandit Dhananjaya Nanda, Kundli Generator, Odisha Astrologer, Kundli Matching, Guna Milan, Odia Astrology',
  openGraph: {
    title: 'Pandit Dhananjaya Nanda | Vedic Astrology & Spiritual Guidance',
    description: 'Accurate Lahiri Nirayana birth-chart calculations, horoscope analysis, and personalized spiritual consultations in Odisha.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Noto+Sans+Oriya:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <WhatsAppButton />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
