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
    default: "bg-[#289CD7] hover:bg-[#2083B6] text-white shadow-xs font-semibold border border-[#38BDF8]/30",
    brand: "bg-gradient-to-r from-[#289CD7] to-[#0284C7] hover:from-[#2083B6] hover:to-[#0369A1] text-white shadow-sm font-semibold border border-[#38BDF8]/40",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 font-medium",
    outline: "border border-slate-700/80 hover:bg-slate-800/80 text-slate-300 hover:text-white bg-transparent font-medium",
    ghost: "hover:bg-slate-800/60 text-slate-400 hover:text-slate-100 font-medium",
    destructive: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-medium",
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
        "inline-flex items-center justify-center select-none transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
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
