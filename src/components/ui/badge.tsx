import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info' | 'brand';
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#289CD7]/15 text-[#38BDF8] border border-[#289CD7]/35 shadow-[0_0_10px_rgba(40,156,215,0.12)]",
    secondary: "bg-[#131D2E] text-slate-300 border border-white/[0.08]",
    outline: "border border-white/[0.12] text-slate-300 bg-transparent",
    destructive: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/35 shadow-[0_0_10px_rgba(16,185,129,0.12)]",
    warning: "bg-amber-500/15 text-amber-300 border border-amber-500/35 shadow-[0_0_10px_rgba(245,158,11,0.12)]",
    info: "bg-sky-500/15 text-sky-400 border border-sky-500/35",
    brand: "bg-gradient-to-r from-[#38BDF8] to-[#289CD7] text-white border border-[#38BDF8]/40 shadow-sm font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
