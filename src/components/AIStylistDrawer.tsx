import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, User, Bot, ArrowRight } from 'lucide-react';
import { StyleProfile, Product } from '../types';
import { STYLE_ARCHETYPES_INFO } from '../data/products';

interface AIStylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  styleProfile: StyleProfile;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

interface Message {
  role: 'user' | 'model';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'What should I wear for a contemporary art gallery preview in Mumbai?',
  'How do I style the washed linen overshirt with sneakers?',
  'Recommend a minimalist daily rotation for high humidity weather.',
  'Can I pair raw selvedge denim with the burnished cognac loafers?',
];

export const AIStylistDrawer: React.FC<AIStylistDrawerProps> = ({
  isOpen,
  onClose,
  styleProfile,
  onSelectProduct,
  products,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: `Namaste! I am your personal stylist at KAPDA & CO. I see you lean towards a ${STYLE_ARCHETYPES_INFO[styleProfile.archetype].label} aesthetic with an affinity for ${styleProfile.palette.replace('_', ' ')}. How can I assist with your wardrobe rotation, occasion dressing, or shoe & accessory pairings today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: messageText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/stylist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          profile: styleProfile,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: data.reply || 'Proportions are everything. Anchor your look with relaxed textures and grounded leather shoes.',
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'I recommend pairing our Washed Sage Linen Camp Overshirt with The Chalk Low Minimalist Sneaker and the Caramel Leather Crossbody for an effortlessly refined silhouette.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-stone-900">
                  AI Personal Stylist
                </h3>
                <span className="text-[11px] font-mono text-stone-500">
                  Tuned to {STYLE_ARCHETYPES_INFO[styleProfile.archetype].label}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close stylist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-3 bg-stone-100 border-b border-stone-200 overflow-x-auto scrollbar-none flex items-center gap-2">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-[11px] px-2.5 py-1 bg-white hover:bg-stone-200 border border-stone-200 rounded-md text-stone-700 whitespace-nowrap shrink-0 transition-colors cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs leading-relaxed ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'model' && (
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] ${
                    m.role === 'user'
                      ? 'bg-stone-900 text-stone-50 rounded-tr-xs'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>

                {m.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 text-xs justify-start">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-2xl text-stone-500 italic">
                  Stylist is curating recommendations...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-stone-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask advice on fit, occasions, pairings..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-stone-100 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-stone-50 rounded-xl transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
