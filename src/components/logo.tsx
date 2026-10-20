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

// ============================================================================
// Sprint Improvement / Stand Up for Improvement Official Brand Components
// ============================================================================

interface SprintImprovementIconProps {
  size?: number | string;
  className?: string;
}

export function SprintImprovementIcon({ size = 30, className = "" }: SprintImprovementIconProps) {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform hover:scale-105 ${className}`}
      aria-label="Sprint Improvement Icon"
    >
      <defs>
        <linearGradient id="sprintCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#289CD7" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="sprintGlow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="sprintAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>

      {/* Hexagonal Tech Shield Container */}
      <rect
        x="2"
        y="2"
        width="40"
        height="40"
        rx="12"
        fill="#0E1726"
        stroke="url(#sprintCyanGrad)"
        strokeWidth="1.8"
        strokeOpacity="0.6"
      />

      {/* Dynamic Velocity Track (Chevron Curves) */}
      <path
        d="M10 28L18 20L23 25L34 14"
        stroke="url(#sprintCyanGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Upward Growth Arrowhead */}
      <path
        d="M26 14H34V22"
        stroke="url(#sprintCyanGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Innovation Spark / Core Node */}
      <circle cx="34" cy="14" r="3" fill="#FFFFFF" />
      <circle cx="18" cy="20" r="2.2" fill="#38BDF8" />
      <circle cx="23" cy="25" r="2.2" fill="#0284C7" />
      <circle cx="10" cy="28" r="2" fill="#38BDF8" opacity="0.8" />
    </svg>
  );
}

interface SprintImprovementLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  subtitle?: string;
  batchBadge?: string;
}

export function SprintImprovementLogo({
  size = 'md',
  showText = true,
  className = "",
  subtitle = "Business Analyst Inisiatif",
  batchBadge = "#5"
}: SprintImprovementLogoProps) {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 42,
    xl: 52,
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base sm:text-lg",
    xl: "text-xl sm:text-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <SprintImprovementIcon size={iconSizes[size]} />
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight text-white font-sans ${textSizes[size]}`}>
              SPRINT<span className="text-[#38BDF8] ml-1">IMPROVEMENT</span>
            </span>
            {batchBadge && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-md bg-[#289CD7]/20 border border-[#289CD7]/40 text-[#38BDF8]">
                {batchBadge}
              </span>
            )}
          </div>
          {subtitle && (
            <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium mt-1 font-mono">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

