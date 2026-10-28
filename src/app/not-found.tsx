import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-cream-bg min-h-screen flex items-center justify-center py-20 px-4">
      <div className="bg-white p-10 sm:p-14 rounded-2xl border border-gold/30 shadow-xl text-center max-w-lg">
        <span className="text-6xl font-bold text-amber-700 block mb-2">404</span>
        <h1 className="text-2xl font-bold text-navy mb-4">Celestial Page Not Found</h1>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          The page or astrological chart you requested has aligned beyond our current celestial horizons. Please return to our sacred homepage.
        </p>
        <Link
          href="/"
          className="btn-gold px-6 py-3 rounded-lg text-sm font-bold shadow-md inline-block"
        >
          Return to Sanctuary Home
        </Link>
      </div>
    </div>
  );
}
