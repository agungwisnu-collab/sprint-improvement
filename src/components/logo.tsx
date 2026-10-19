import React from 'react';

interface LinkEthosIconProps {
  size?: number | string;
  className?: string;
}

export function LinkEthosIcon({ size = 28, className = "" }: LinkEthosIconProps) {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform hover:scale-105 ${className}`}
      aria-label="Link Ethos Icon"
    >
      <defs>
        <linearGradient id="ethosCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#289CD7" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="ethosGlow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Orbit Ring 1 (Background subtle) */}
      <circle cx="20" cy="20" r="16" stroke="#289CD7" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="3 3" />

      {/* Dynamic Swoosh / Link Ring */}
      <path
        d="M10 24C8.5 20 10 14 15 10C21 5.5 28 8 31 13"
        stroke="url(#ethosCyanGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M30 16C31.5 20 30 26 25 30C19 34.5 12 32 9 27"
        stroke="url(#ethosCyanGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Central Rocket / Core Hex Prism with Glow */}
      <rect x="15" y="15" width="10" height="10" rx="3" fill="url(#ethosCyanGrad)" transform="rotate(45 20 20)" />
      
      {/* Dynamic Core Dot */}
      <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" />

      {/* Satellite Node */}
      <circle cx="31" cy="13" r="2.5" fill="#38BDF8" />
      <circle cx="9" cy="27" r="2.2" fill="#289CD7" />
    </svg>
  );
}

interface LinkEthosLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  subtitle?: string;
}

export function LinkEthosLogo({
  size = 'md',
  showText = true,
  className = "",
  subtitle = "PT Ethos Kreatif Indonesia"
}: LinkEthosLogoProps) {
  const iconSizes = {
    sm: 22,
    md: 28,
    lg: 36,
    xl: 44,
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <LinkEthosIcon size={iconSizes[size]} />
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-extrabold tracking-tight text-white font-sans ${textSizes[size]}`}>
              LINK<span className="text-[#289CD7]">ETHOS</span>
            </span>
          </div>
          {subtitle && (
            <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium mt-0.5 font-mono">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
