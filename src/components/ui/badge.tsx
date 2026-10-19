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
    default: "bg-[#289CD7]/15 text-[#38BDF8] border border-[#289CD7]/30",
    secondary: "bg-slate-800 text-slate-300 border border-slate-700/60",
    outline: "border border-slate-700 text-slate-300 bg-transparent",
    destructive: "bg-red-500/15 text-red-400 border border-red-500/30",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    info: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
    brand: "bg-[#289CD7] text-white border border-[#289CD7] shadow-sm font-semibold",
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
