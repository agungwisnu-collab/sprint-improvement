import { motion } from 'motion/react';
import { Presentation, MessageSquare, Layers } from 'lucide-react';
import { LinkEthosLogo } from './logo';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface HeaderProps {
  onStartSlideMode: () => void;
  onOpenFeedback: () => void;
  onOpenDesignSystem?: () => void;
}

export function Header({ onStartSlideMode, onOpenFeedback, onOpenDesignSystem }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 lg:px-10 h-16">
        {/* Zone 1: Official Link Ethos Brand Logo & Identity */}
        <motion.div
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 shrink-0"
        >
          <a href="#" className="flex items-center gap-2 group">
            <LinkEthosLogo size="md" subtitle="Business Analyst Inisiatif" />
          </a>
          <Badge variant="default" className="hidden lg:inline-flex text-[10px] font-mono">
            Stand Up #5
          </Badge>
        </motion.div>

        {/* Zone 2: Clean single-line text navigation links */}
        <motion.nav
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-400"
        >
          <a
            href="#masalah"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Analisis Masalah
          </a>
          <a
            href="#solusi"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Metodologi AI
          </a>
          <a
            href="#portofolio"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Sistem &amp; Simulator
          </a>
          <a
            href="#dampak"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Matriks Dampak
          </a>
          <a
            href="#rencana"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
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
          {onOpenDesignSystem && (
            <button
              onClick={onOpenDesignSystem}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#38BDF8] bg-[#289CD7]/10 hover:bg-[#289CD7]/20 border border-[#289CD7]/30 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              title="Lihat spesifikasi resmi Link Ethos Design System"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Design System</span>
            </button>
          )}

          <button
            onClick={onOpenFeedback}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Form Evaluasi Juri</span>
          </button>

          <Button
            onClick={onStartSlideMode}
            variant="brand"
            size="sm"
            className="whitespace-nowrap cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Slide Presentasi (17 Slide)</span>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
