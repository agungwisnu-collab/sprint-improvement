import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' | 'brand';
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'icon';
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: ButtonProps) {
  const variantStyles = {
    default: "bg-[#289CD7] hover:bg-[#2083B6] text-white shadow-xs hover:shadow-[0_0_16px_rgba(40,156,215,0.35)] font-semibold border border-[#38BDF8]/40",
    brand: "bg-gradient-to-r from-[#38BDF8] via-[#289CD7] to-[#0284C7] hover:from-[#289CD7] hover:to-[#0369A1] text-white shadow-sm hover:shadow-[0_0_22px_rgba(40,156,215,0.45)] font-semibold border border-[#38BDF8]/50",
    secondary: "bg-[#131D2E] hover:bg-[#1A263C] text-slate-200 border border-white/[0.08] hover:border-slate-600 font-medium",
    outline: "border border-white/[0.12] hover:border-[#289CD7]/60 hover:bg-[#289CD7]/10 text-slate-300 hover:text-white bg-transparent font-medium",
    ghost: "hover:bg-slate-800/60 hover:text-white text-slate-400 font-medium",
    destructive: "bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 font-medium",
    link: "text-[#38BDF8] underline-offset-4 hover:underline p-0 h-auto bg-transparent",
  };

  const sizeStyles = {
    xs: "h-6 px-2 text-xs rounded-md gap-1",
    sm: "h-7.5 px-3 text-xs rounded-lg gap-1.5",
    default: "h-9 px-3.5 text-sm rounded-lg gap-2",
    lg: "h-11 px-5 text-base rounded-xl gap-2.5",
    icon: "size-8 p-0 rounded-lg justify-center",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center select-none transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#289CD7]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
