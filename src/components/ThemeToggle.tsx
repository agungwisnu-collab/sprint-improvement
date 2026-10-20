import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ theme, onToggle, className = '', showLabel = true }: ThemeToggleProps) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
        isLight
          ? 'bg-amber-500/10 text-amber-800 border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/50 shadow-xs'
          : 'bg-[#131D2E] text-slate-300 border-white/[0.08] hover:text-white hover:border-[#289CD7]/40 shadow-xs'
      } ${className}`}
      title={isLight ? 'Beralih ke Dark Mode' : 'Beralih ke Light Mode (Tema Asli Link Ethos & HM)'}
      aria-label="Toggle tema terang atau gelap"
    >
      {isLight ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-600 fill-amber-500/40" />
          {showLabel && <span className="font-semibold text-amber-900">Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-[#38BDF8]" />
          {showLabel && <span>Dark Mode</span>}
        </>
      )}
    </button>
  );
}
