import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

interface AmanzoTrustBadgesProps {
  language: 'en' | 'hi';
}

export const AmanzoTrustBadges: React.FC<AmanzoTrustBadgesProps> = ({ language }) => {
  const badges = [
    {
      icon: <Truck className="w-8 h-8 text-[#111111]" />,
      title: language === 'en' ? 'Free Shipping' : 'फ्री डिलीवरी',
      subtitle:
        language === 'en' ? 'On Orders Above ₹999' : '₹999 से अधिक के ऑर्डर पर',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#111111]" />,
      title: language === 'en' ? 'Secure Payment' : 'सुरक्षित पेमेंट',
      subtitle: language === 'en' ? '100% Safe & Secure' : '100% सुरक्षित और तेज़',
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-[#111111]" />,
      title: language === 'en' ? 'Easy Returns' : 'आसान रिटर्न',
      subtitle: language === 'en' ? '7 Days Return Policy' : '7 दिनों की आसान वापसी नीति',
    },
    {
      icon: <Headphones className="w-8 h-8 text-[#111111]" />,
      title: language === 'en' ? '24/7 Support' : '24/7 ग्राहक सहायता',
      subtitle: language === 'en' ? "We're Here to Help" : 'हम हमेशा आपकी मदद के लिए तैयार हैं',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs">
        {badges.map((b, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              {b.icon}
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-neutral-900 tracking-tight">
                {b.title}
              </h4>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                {b.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
