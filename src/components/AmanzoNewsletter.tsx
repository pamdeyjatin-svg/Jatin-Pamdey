import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

interface AmanzoNewsletterProps {
  language: 'en' | 'hi';
}

export const AmanzoNewsletter: React.FC<AmanzoNewsletterProps> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="bg-[#111111] text-white py-10 px-4 sm:px-6 md:px-10 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Heading with Yellow Envelope Icon (Screenshot style) */}
        <div className="flex items-center gap-4 text-left w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-[#FFC400]/15 flex items-center justify-center shrink-0 border border-[#FFC400]/30">
            <Mail className="w-6 h-6 text-[#FFC400]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {language === 'en'
                ? 'Subscribe to Our Newsletter'
                : 'न्यूज़लेटर सब्सक्राइब करें'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-0.5">
              {language === 'en'
                ? 'Get the latest updates and offers straight to your inbox.'
                : 'ताज़ा डील्स, नए जूते और विशेष ऑफ़र्स सीधे अपने इनबॉक्स में पाएँ।'}
            </p>
          </div>
        </div>

        {/* Right Input Form matching screenshot */}
        <div className="w-full md:w-auto md:min-w-[420px]">
          {subscribed ? (
            <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-5 py-3 rounded-full text-xs font-semibold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'en'
                  ? 'Thank you! You have been subscribed for exclusive offers.'
                  : 'धन्यवाद! आप विशेष ऑफ़र्स के लिए सब्सक्राइब हो चुके हैं।'}
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-white rounded-full p-1 shadow-lg max-w-lg w-full"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  language === 'en'
                    ? 'Enter your email address'
                    : 'अपना ईमेल पता दर्ज करें...'
                }
                className="flex-1 bg-transparent px-4 sm:px-5 py-2.5 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-hidden"
              />
              <button
                type="submit"
                className="bg-[#FFC400] hover:bg-[#F0B800] text-[#111111] font-black text-xs sm:text-sm px-6 sm:px-7 py-2.5 rounded-full transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                {language === 'en' ? 'Subscribe' : 'सब्सक्राइब'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
