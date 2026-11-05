import React from 'react';

interface AmanzoLogoProps {
  className?: string;
  isWhite?: boolean;
  tagline?: string;
}

export const AmanzoLogo: React.FC<AmanzoLogoProps> = ({
  className = '',
  isWhite = false,
  tagline = 'Your World, Your Shopping.',
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Shopping Bag Icon with Yellow Handle & Curve */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bag Body in Dark/Charcoal */}
          <path
            d="M20 34L28 90C28.5 93.5 31.5 96 35 96H65C68.5 96 71.5 93.5 72 90L80 34H20Z"
            fill={isWhite ? '#1F2937' : '#111827'}
          />
          {/* Yellow Fold Accent */}
          <path
            d="M32 34L35 60L42 34H32Z"
            fill="#FFC400"
          />
          <path
            d="M68 34L65 60L58 34H68Z"
            fill="#FFC400"
          />
          {/* Yellow Smile / Check Swoosh */}
          <path
            d="M36 68C42 75 58 75 64 68"
            stroke="#FFC400"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Yellow Handle */}
          <path
            d="M36 34V22C36 14.268 42.268 8 50 8C57.732 8 64 14.268 64 22V34"
            stroke="#FFC400"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center leading-none">
          <span
            className={`font-black tracking-tight text-2xl sm:text-3xl ${
              isWhite ? 'text-white' : 'text-[#111111]'
            }`}
          >
            AMAN<span className="text-[#E6AC00]">ZO</span>
          </span>
        </div>
        {tagline && (
          <span
            className={`text-[10px] sm:text-[11px] font-medium tracking-wide -mt-0.5 ${
              isWhite ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};
