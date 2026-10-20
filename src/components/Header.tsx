import { motion } from 'motion/react';
import { Presentation, MessageSquare, Layers } from 'lucide-react';
import { SprintImprovementLogo } from './logo';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onStartSlideMode: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export function Header({
  onStartSlideMode,
  theme = 'dark',
  onToggleTheme
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/90 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-10 h-16">
        {/* Zone 1: Official Sprint Improvement Brand Logo & Identity */}
        <motion.div
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 shrink-0"
        >
          <a href="#" className="flex items-center gap-2 group cursor-pointer" aria-label="Beranda Sprint Improvement">
            <SprintImprovementLogo size="md" subtitle="Business Analyst Inisiatif" batchBadge="#5" />
          </a>
        </motion.div>

        {/* Zone 2: Clean single-line text navigation links */}
        <motion.nav
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-medium text-slate-300"
        >
          <a
            href="#masalah"
            className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Analisis Masalah
          </a>
          <a
            href="#solusi"
            className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Metodologi AI
          </a>
          <a
            href="#portofolio"
            className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Sistem &amp; Simulator
          </a>
          <a
            href="#dampak"
            className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Matriks Dampak
          </a>
          <a
            href="#rencana"
            className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Roadmap
          </a>
        </motion.nav>

        {/* Zone 3: Actions */}
        <motion.div
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 shrink-0"
        >
          {onToggleTheme && (
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          )}

          <Button
            onClick={onStartSlideMode}
            variant="brand"
            size="sm"
            className="whitespace-nowrap cursor-pointer shadow-sm hover:shadow-md transition-all active:scale-95"
            aria-label="Mulai Slide Presentasi (17 Slide)"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Slide Presentasi (17 Slide)</span>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
