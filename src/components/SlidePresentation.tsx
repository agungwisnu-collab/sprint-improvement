import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SLIDES_CONFIG, TEAM_INFO, PROBLEM_METRICS, IMPACT_TABLE, 
  TESTIMONIAL_DATA, LEARNINGS_DATA, KEY_TAKEAWAYS, NEXT_STEPS, 
  OTHER_TOOLS_CATALOG 
} from '../data/presentationData';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  FileText, Clock, Grid, Play, Pause, RotateCcw, X, 
  ArrowRight, Star, CheckCircle2, ShieldCheck, Zap
} from 'lucide-react';
import { SprintImprovementLogo, SprintImprovementIcon, LinkEthosLogo, LinkEthosIcon } from './logo';
import { ThemeToggle } from './ThemeToggle';

interface SlidePresentationProps {
  onExit: () => void;
  initialSlide?: number;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 28 : direction < 0 ? -28 : 0,
    opacity: 0,
    scale: 0.995,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -28 : 28,
    opacity: 0,
    scale: 0.995,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function SlidePresentation({
  onExit,
  initialSlide = 1,
  theme = 'dark',
  onToggleTheme
}: SlidePresentationProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(initialSlide - 1);
  const [direction, setDirection] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Timer states (Stand Up Pitch Stopwatch)
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlide = SLIDES_CONFIG[currentSlideIndex];

  // Inactivity auto-hide for controls & cursor (Keynote / Cinema mode)
  // Rule: Controls ALWAYS stay hidden unless the mouse cursor actually moves!
  const [isControlsVisible, setIsControlsVisible] = useState<boolean>(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringControlsRef = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: -1, y: -1 });

  const resetHideTimer = () => {
    setIsControlsVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    if (!showNotes && !showThumbnails && !isHoveringControlsRef.current) {
      hideTimerRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 2500);
    }
  };

  useEffect(() => {
    // Initial auto-hide timer on mount
    resetHideTimer();

    const handleMouseMove = (e: MouseEvent) => {
      // Ignore initial dummy event or if position hasn't actually moved
      if (lastMousePos.current.x === -1) {
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        return;
      }
      const dx = Math.abs(e.clientX - lastMousePos.current.x);
      const dy = Math.abs(e.clientY - lastMousePos.current.y);

      // Only wake up controls if cursor genuinely moved more than 2 pixels
      if (dx > 2 || dy > 2) {
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        resetHideTimer();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showNotes, showThumbnails]);

  const goToNext = () => {
    // Navigation via keyboard/click does NOT unhide toolbar; controls stay hidden unless cursor moves
    if (currentSlideIndex < SLIDES_CONFIG.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const goToSlide = (targetIndex: number) => {
    setDirection(targetIndex > currentSlideIndex ? 1 : -1);
    setCurrentSlideIndex(targetIndex);
  };

  // Stopwatch effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Keyboard navigation listener (does NOT force toolbar visible)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes(prev => !prev);
        resetHideTimer();
      } else if (e.key === 'g' || e.key === 'G') {
        setShowThumbnails(prev => !prev);
        resetHideTimer();
      } else if (e.key === 'Escape') {
        if (showThumbnails) setShowThumbnails(false);
        else if (showNotes) setShowNotes(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showThumbnails, showNotes, currentSlideIndex]);

  const toggleFullscreen = () => {
    resetHideTimer();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-[#070A0F] text-slate-100 flex flex-col select-none overflow-hidden h-screen w-screen transition-all ${
        !isControlsVisible ? 'cursor-none' : 'cursor-default'
      }`}
    >
      {/* Sleek Top Presentation Toolbar with Auto-Hide transition */}
      <div
        onMouseEnter={() => {
          isHoveringControlsRef.current = true;
          resetHideTimer();
        }}
        onMouseLeave={() => {
          isHoveringControlsRef.current = false;
          resetHideTimer();
        }}
        className={`px-6 bg-[#0E1420]/95 backdrop-blur-md flex items-center justify-between shrink-0 z-30 transition-all duration-300 transform ${
          isControlsVisible
            ? 'h-14 opacity-100 translate-y-0 border-b border-slate-800'
            : 'h-0 py-0 opacity-0 -translate-y-full pointer-events-none border-b-0 overflow-hidden'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121A2A] hover:bg-[#162238] border border-slate-700/60 text-xs font-medium rounded-lg transition-colors text-slate-300 hover:text-white cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Web</span>
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <SprintImprovementIcon size={24} />
            <div className="text-xs text-slate-300 font-medium hidden md:flex items-center gap-2">
              <span className="font-bold text-white tracking-tight">{TEAM_INFO.title}</span>
              <span className="text-slate-600">·</span>
              <span className="text-[#38BDF8] font-mono text-[11px]">{TEAM_INFO.event}</span>
            </div>
          </div>
        </div>

        {/* Presentation Controls: Slide Number, Timer, Notes, Grid, Fullscreen */}
        <div className="flex items-center gap-2.5">
          {/* Pitch Timer */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#090D14] border border-slate-800 rounded-lg text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-white font-semibold tabular-nums">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isTimerRunning ? "Pause stopwatch" : "Resume stopwatch"}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={() => setTimerSeconds(0)}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset stopwatch"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Slide Indicator */}
          <div className="px-3 py-1 bg-[#121A2A] border border-slate-800 rounded-lg text-xs font-mono">
            <span className="text-white font-bold">{currentSlideIndex + 1}</span>
            <span className="text-slate-500"> / {SLIDES_CONFIG.length}</span>
          </div>

          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              showNotes ? 'bg-[#289CD7] text-white shadow-xs font-semibold' : 'bg-[#121A2A] hover:bg-[#162238] border border-slate-700/60 text-slate-300'
            }`}
            title="Toggle Catatan Pembicara (N)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Catatan</span>
          </button>

          {/* Slide Grid Toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              showThumbnails ? 'bg-[#289CD7] text-white shadow-xs' : 'bg-[#121A2A] hover:bg-[#162238] border border-slate-700/60 text-slate-300'
            }`}
            title="Daftar Slide (G)"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-[#121A2A] hover:bg-[#162238] border border-slate-700/60 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Theme Toggle in Slide Mode */}
          {onToggleTheme && (
            <ThemeToggle theme={theme} onToggle={onToggleTheme} showLabel={false} />
          )}
        </div>
      </div>

      {/* Subtle Slide Progress Bar */}
      <div className="h-0.5 w-full bg-slate-900 overflow-hidden shrink-0">
        <motion.div
          className="h-full bg-[#289CD7]"
          initial={false}
          animate={{ width: `${((currentSlideIndex + 1) / SLIDES_CONFIG.length) * 100}%` }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </div>

      {/* Main Slide Presentation Stage: STRICTLY NO SCROLL (overflow-hidden, centered) */}
      <div className="flex-1 relative overflow-hidden px-4 sm:px-8 py-3 flex items-center justify-center min-h-0">
        {/* Keynote Slide Canvas with clean 16:9 ratio feel & animated presence */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-w-5xl mx-auto flex flex-col justify-center h-full max-h-[calc(100vh-8.5rem)]"
          >
            {/* SLIDE 1: Cover */}
            {currentSlideIndex === 0 && (
              <div className="text-center py-6 px-4 max-w-4xl mx-auto space-y-6">
                <div className="flex justify-center mb-2">
                  <SprintImprovementLogo size="lg" subtitle="Stand Up for Improvement Batch 5" batchBadge="#5" />
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#289CD7]/15 border border-[#289CD7]/35 text-xs font-mono text-[#38BDF8]">
                  <span>{TEAM_INFO.event}</span>
                  <span className="text-slate-600">·</span>
                  <span>{TEAM_INFO.organization}</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                    AI-Driven Rapid Prototyping
                  </h1>
                  <p className="text-base sm:text-xl text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed">
                    Solusi Cepat Kebutuhan Operasional Departemen Tanpa Membebani Backlog IT
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80">
                  <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mb-3.5">
                    Nama Anggota Tim Business Analyst:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto">
                    {TEAM_INFO.members.map((member, mIdx) => (
                      <div key={mIdx} className="p-3.5 bg-[#0E1420]/90 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all">
                        <div className="text-sm font-bold text-white">{member.name}</div>
                        <div className="text-xs text-[#38BDF8] font-mono mt-0.5">{member.role}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keyboard Navigation Quick Hint */}
                <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 dark:text-slate-400 pt-2">
                  <span>Gunakan tombol <kbd className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-[#162238] text-[#38BDF8] border border-[#289CD7]/40 shadow-xs inline-flex items-center mx-1">Right Arrow →</kbd> atau <kbd className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-[#162238] text-[#38BDF8] border border-[#289CD7]/40 shadow-xs inline-flex items-center mx-1">Space</kbd> untuk berpindah slide</span>
                </div>
              </div>
            )}

            {/* SLIDE 2: Identifikasi Masalah */}
            {currentSlideIndex === 1 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-blue-400">Slide 02 · Problem Identification</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Identifikasi Masalah</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-2.5">
                    <span className="text-xs font-mono text-blue-400 uppercase font-semibold">1. Fokus Tim IT</span>
                    <h3 className="text-sm font-bold text-white">Terikat KPI IT &amp; Core System</h3>
                    <ul className="text-xs text-slate-300 space-y-1.5 font-sans">
                      <li className="flex items-start gap-1.5">• <span>100% kapasitas Developer teralokasi ke KPI IT &amp; Core System Ethos</span></li>
                      <li className="flex items-start gap-1.5">• <span>Keterbatasan programmer untuk mengurusi tools mikro operasional</span></li>
                      <li className="flex items-start gap-1.5">• <span>Permintaan mikro selalu kalah prioritas dari sistem utama korporasi</span></li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-2.5">
                    <span className="text-xs font-mono text-amber-400 uppercase font-semibold">2. Antrean Backlog</span>
                    <h3 className="text-sm font-bold text-white">Penumpukan 117+ Kebutuhan IT</h3>
                    <ul className="text-xs text-slate-300 space-y-1.5 font-sans">
                      <li className="flex items-start gap-1.5">• <span><strong>9 On Hold</strong> · <strong>76 Not Started</strong> · <strong>32 In Progress</strong></span></li>
                      <li className="flex items-start gap-1.5">• <span>Permintaan mikro terdorong ke urutan prioritas terbawah</span></li>
                      <li className="flex items-start gap-1.5">• <span>Lead time pembuatan tools tertunda 1 hingga 3 bulan</span></li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-2.5">
                    <span className="text-xs font-mono text-rose-400 uppercase font-semibold">3. Risiko Shadow IT</span>
                    <h3 className="text-sm font-bold text-white">Keresahan Penggunaan Tools Luar</h3>
                    <ul className="text-xs text-slate-300 space-y-1.5 font-sans">
                      <li className="flex items-start gap-1.5">• <span>Sisipan iklan Bitly menurunkan citra profesional perusahaan</span></li>
                      <li className="flex items-start gap-1.5">• <span>Risiko kebocoran data finansial sensitif (Bupot &amp; Faktur Pajak)</span></li>
                      <li className="flex items-start gap-1.5">• <span>Potensi pelacakan domain asing &amp; malware (acesse.one)</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3: Analisis Akar Masalah (Ishikawa Fishbone Framework) */}
            {currentSlideIndex === 2 && (
              <div className="space-y-3 w-full">
                <div className="border-b border-white/[0.08] pb-2 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#38BDF8]">Slide 03 · Root Cause Analysis</div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Analisis Akar Masalah (Diagram Tulang Ikan / Ishikawa)
                    </h2>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#289CD7]/15 border border-[#289CD7]/35 text-[11px] font-mono text-[#38BDF8]">
                    <span>4 Dimensi Penyebab</span>
                  </div>
                </div>

                {/* Fishbone 12-col Engineering Canvas */}
                <div className="grid grid-cols-12 gap-3.5 items-center">
                  {/* Causal Ribs & Central Spine (8 columns) */}
                  <div className="col-span-12 lg:col-span-8 flex flex-col justify-between space-y-2">
                    {/* Top Ribs: Manusia & Metode */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl hover:border-[#289CD7]/40 transition-all">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono font-bold text-[#38BDF8]">
                            1. Manusia (People)
                          </span>
                        </div>
                        <ul className="text-[11px] sm:text-xs text-slate-300 space-y-1">
                          <li className="flex items-start gap-1.5">
                            <span className="text-[#38BDF8] font-mono">↳</span>
                            <span>Kapasitas developer IT 100% terikat Core System &amp; KPI</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-[#38BDF8] font-mono">↳</span>
                            <span>Keterbatasan programmer untuk mengurusi tools mikro</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-[#38BDF8] font-mono">↳</span>
                            <span>BA sebelumnya pasif hanya menulis dokumen FRD</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl hover:border-[#289CD7]/40 transition-all">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono font-bold text-[#38BDF8]">
                            2. Metode (Process)
                          </span>
                        </div>
                        <ul className="text-[11px] sm:text-xs text-slate-300 space-y-1">
                          <li className="flex items-start gap-1.5">
                            <span className="text-[#38BDF8] font-mono">↳</span>
                            <span>SDLC konvensional panjang (BRD → Antre IT → Prod)</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-[#38BDF8] font-mono">↳</span>
                            <span>Birokrasi antrean tiket memakan waktu 1–3 bulan</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-[#38BDF8] font-mono">↳</span>
                            <span>Ketiadaan jalur ekspres mikro-tools operasional</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Central Fishbone Spine */}
                    <div className="flex items-center gap-2 py-0.5">
                      <div className="h-1.5 w-full bg-gradient-to-r from-slate-700 via-[#289CD7] to-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(40,156,215,0.35)]" />
                      <ArrowRight className="w-5 h-5 text-[#38BDF8] shrink-0 animate-pulse" />
                    </div>

                    {/* Bottom Ribs: Lingkungan & Teknologi */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl hover:border-amber-500/40 transition-all">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            3. Lingkungan (Environment)
                          </span>
                        </div>
                        <ul className="text-[11px] sm:text-xs text-slate-300 space-y-1">
                          <li className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-mono">↳</span>
                            <span>Fokus IT mutlak ke Core System &amp; target KPI IT</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-mono">↳</span>
                            <span>Kebutuhan mikro departemen selalu kalah prioritas</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-mono">↳</span>
                            <span>Departemen berinisiatif cari alternatif (Shadow IT)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl hover:border-rose-500/40 transition-all">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono font-bold text-rose-400">
                            4. Teknologi &amp; Keamanan
                          </span>
                        </div>
                        <ul className="text-[11px] sm:text-xs text-slate-300 space-y-1">
                          <li className="flex items-start gap-1.5">
                            <span className="text-rose-400 font-mono">↳</span>
                            <span>Ketergantungan shortlink gratisan beriklan (Bitly)</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-rose-400 font-mono">↳</span>
                            <span>Potensi kebocoran data Bupot, Faktur Pajak &amp; Payroll</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-rose-400 font-mono">↳</span>
                            <span>Domain asing tidak aman tanpa alokasi resmi</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Muara Masalah (Head of Ishikawa Fishbone - 4 columns) */}
                  <div className="col-span-12 lg:col-span-4 h-full flex flex-col justify-center">
                    <div className="muara-masalah-card p-4 sm:p-5 rounded-2xl border-2 border-rose-500/60 shadow-xl flex flex-col justify-between space-y-3">
                      <div>
                        <div className="muara-badge inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                          <span>Muara Masalah (Problem Effect)</span>
                        </div>
                        <h4 className="muara-title text-sm sm:text-base font-extrabold text-white leading-snug">
                          Backlog IT Menumpuk 1–3 Bulan &amp; Keresahan VP IT atas Tools Luar
                        </h4>
                        <p className="muara-desc text-xs text-rose-100/90 mt-2 leading-relaxed">
                          Antrean SDLC konvensional yang panjang membuat tools mikro departemen tidak tertangani, memicu meluasnya pemakaian Shadow IT berisiko kebocoran data dan menurunkan citra profesional perusahaan.
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-rose-500/30 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300 muara-sol-label font-semibold">Solusi Teruji:</span>
                        <span className="muara-solution-pill font-mono font-extrabold text-xs px-3 py-1 rounded-md shadow-sm">
                          AI Rapid Prototyping
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 4: 5 Whys (Part 1) */}
            {currentSlideIndex === 3 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-blue-400">Slide 04 · 5 Whys Analysis (Part 1)</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Analisis 5 Whys: Keterlambatan &amp; Shadow IT</h2>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <span className="text-xs font-mono text-blue-400 font-bold block mb-1.5">Why #1 · Mengapa pembuatan tools operasional tertunda 1–3 bulan di IT?</span>
                    <ul className="text-xs text-slate-200 space-y-1 font-sans">
                      <li>• Kapasitas developer IT teralokasi penuh (100%) untuk mengejar target KPI tim IT sendiri</li>
                      <li>• Fokus pemeliharaan Core System Ethos dan sistem pendukung KPI utama perusahaan</li>
                      <li>• Implikasi: Kebutuhan mikro operasional departemen tergeser ke prioritas paling bawah</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <span className="text-xs font-mono text-amber-400 font-bold block mb-1.5">Why #2 · Mengapa kondisi ini memicu keresahan VP IT dan manajemen?</span>
                    <ul className="text-xs text-slate-200 space-y-1 font-sans">
                      <li>• Departemen berinisiatif sendiri menggunakan tools gratis pihak ketiga di internet (Shadow IT)</li>
                      <li>• Risiko kebocoran data finansial sensitif (Bukti Potong &amp; Faktur Pajak Coretax)</li>
                      <li>• Sisipan iklan Bitly menurunkan citra profesional &amp; pelacakan domain asing acesse.one</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 5: 5 Whys (Part 2) */}
            {currentSlideIndex === 4 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-blue-400">Slide 05 · 5 Whys Analysis (Part 2)</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Analisis 5 Whys: Solusi Konvensional vs AI</h2>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <span className="text-xs font-mono text-blue-400 font-bold block mb-1.5">Why #3 · Mengapa kebutuhan operasional tidak segera dibuatkan solusi internal?</span>
                    <ul className="text-xs text-slate-200 space-y-1 font-sans">
                      <li>• Metode konvensional mewajibkan seluruh pembuatan tools melewati antrean SDLC developer IT</li>
                      <li>• Koding manual dari nol (scratch) beserta birokrasi tiket menyita waktu berbulan-bulan</li>
                      <li>• Business Analyst sebelumnya hanya bertindak pasif sebagai pembuat dokumen FRD</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#0E1420] border border-emerald-500/30 rounded-xl">
                    <span className="text-xs font-mono text-emerald-400 font-bold block mb-1.5">Why #4 · Mengapa BA tidak langsung membangun solusi mandiri sebelumnya?</span>
                    <ul className="text-xs text-slate-200 space-y-1 font-sans">
                      <li>• Keterbatasan skill pemrograman teknis konvensional untuk koding dari nol</li>
                      <li>• <strong>Titik Balik (The Turning Point)</strong>: Pemanfaatan AI Agentic Coding memberikan pengungkit teknis bagi BA</li>
                      <li>• Hasil: BA yang memahami alur proses bisnis langsung mengeksekusi software kerja tanpa membebani IT</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 6: Perbaikan yang Diujicobakan */}
            {currentSlideIndex === 5 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-emerald-400">Slide 06 · The Improvement Solution</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Perbaikan yang Diujicobakan</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#0E1420] border border-blue-500/40 rounded-xl space-y-3">
                    <span className="text-xs font-mono text-blue-400 uppercase font-bold">Inisiatif Solusi Nyata</span>
                    <ul className="text-xs text-slate-200 space-y-2 font-sans">
                      <li className="flex items-start gap-2">• <span>Inisiatif mandiri Tim Business Analyst mengeksekusi kebutuhan operasional</span></li>
                      <li className="flex items-start gap-2">• <span>Memanfaatkan <strong>AI Agentic Coding</strong> untuk percepatan pembangunan software</span></li>
                      <li className="flex items-start gap-2">• <span>Menempatkan hasil tools pada lingkungan server internal yang aman &amp; terisolasi</span></li>
                    </ul>
                  </div>

                  <div className="p-5 bg-[#0E1420] border border-emerald-500/40 rounded-xl space-y-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Hasil Teruji</span>
                    <ul className="text-xs text-slate-200 space-y-2 font-sans">
                      <li className="flex items-start gap-2">• <span>Kebutuhan selesai dalam <strong>hitungan hari bahkan &lt; 1 hari kerja</strong></span></li>
                      <li className="flex items-start gap-2">• <span><strong>0 Story points</strong> atau jam kerja Developer IT yang terpakai</span></li>
                      <li className="flex items-start gap-2">• <span>Fokus tim developer IT untuk Core System terjaga 100% tanpa gangguan</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 7: Bukti Perbaikan */}
            {currentSlideIndex === 6 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-blue-400">Slide 07 · Execution Evidence</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Bukti Perbaikan: Turnaround Cepat (&lt; 48 Menit)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="text-xs font-mono text-slate-400 font-bold">Pukul 15:16</span>
                    <h4 className="text-sm font-bold text-white">Permintaan Masuk</h4>
                    <p className="text-xs text-slate-300">Tim Tax mengirimkan file contoh Bupot Coretax dan panduan via chat.</p>
                  </div>

                  <div className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="text-xs font-mono text-blue-400 font-bold">Pukul 15:16 - 16:00</span>
                    <h4 className="text-sm font-bold text-white">Eksekusi AI Coding</h4>
                    <p className="text-xs text-slate-300">BA merancang arsitektur parser PDF ke Excel dan mengeksekusi dengan AI.</p>
                  </div>

                  <div className="p-4 bg-[#0E1420] border border-emerald-500/40 rounded-xl space-y-1.5">
                    <span className="text-xs font-mono text-emerald-400 font-bold">Pukul 16:04 (48 Menit)</span>
                    <h4 className="text-sm font-bold text-emerald-300">Siap Uji Coba</h4>
                    <p className="text-xs text-slate-300">Tool extractor diserahkan ke user dan berhasil mengekstrak data 100% presisi.</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-white/[0.08] rounded-xl text-xs text-slate-300 text-center font-mono">
                  Sebelumnya: Butuh 1–3 bulan antrean SDLC IT · Hasil: Selesai kurang dari 1 jam kerja!
                </div>
              </div>
            )}

            {/* SLIDE 8: Portofolio - Meethos */}
            {currentSlideIndex === 7 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-blue-400">Slide 08 · Portfolio System 1</div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Meethos · booking.ethos.co.id</h2>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Lead Time: 3 Hari Kerja</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Total Reservasi</div>
                    <div className="text-xl font-bold text-white font-mono mt-0.5">203 Sesi</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Jam Rapat Terkelola</div>
                    <div className="text-xl font-bold text-blue-400 font-mono mt-0.5">672 Jam</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Total Partisipasi</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">1.493 Orang</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Okupansi Tertinggi</div>
                    <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">Ballroom 100%</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="font-mono text-slate-400 font-bold block">Masalah Awal:</span>
                    <p className="text-slate-300">• Jadwal ruang rapat sering bentrok, tidak ada visibilitas okupansi, koordinasi manual chat.</p>
                  </div>
                  <div className="p-3.5 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="font-mono text-blue-400 font-bold block">Kapabilitas Solusi:</span>
                    <p className="text-slate-300">• Kalender booking real-time, mode display signage ruangan, dan analitik divisi.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 9: Portofolio - link.ethos.co.id */}
            {currentSlideIndex === 8 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-blue-400">Slide 09 · Portfolio System 2</div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">link.ethos.co.id</h2>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Lead Time: 2 Hari Kerja</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Total Trafik</div>
                    <div className="text-xl font-bold text-white font-mono mt-0.5">4.650 Klik</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Pengunjung Unik</div>
                    <div className="text-xl font-bold text-blue-400 font-mono mt-0.5">2.256 IP</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Pengguna Mobile</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">56% Mobile</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Iklan Pihak Ketiga</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">0% Iklan</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="font-mono text-slate-400 font-bold block">Masalah Awal:</span>
                    <p className="text-slate-300">• Bitly gratisan menyisipkan iklan yang menurunkan citra resmi, dan acesse.one rawan tracking.</p>
                  </div>
                  <div className="p-3.5 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="font-mono text-blue-400 font-bold block">Kapabilitas Solusi:</span>
                    <p className="text-slate-300">• URL shortener domain resmi perusahaan, bio page builder, analitik klik mendalam.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 10: Portofolio - Bupot & Faktur Extractor */}
            {currentSlideIndex === 9 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-blue-400">Slide 10 · Portfolio System 3</div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Bupot &amp; Faktur Extractor</h2>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Turnaround: &lt; 1 Jam</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Waktu Proses 100 PDF</div>
                    <div className="text-xl font-bold text-white font-mono mt-0.5">&lt; 15 Detik</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Akurasi Ekstraksi</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">100% Presisi</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Keamanan Data</div>
                    <div className="text-xl font-bold text-blue-400 font-mono mt-0.5">100% Offline</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Peringkat Tim Finance</div>
                    <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">3 Besar SLA</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="font-mono text-slate-400 font-bold block">Masalah Awal:</span>
                    <p className="text-slate-300">• Tim Tax mengetik manual nomor faktur dari ratusan PDF Coretax, rawan human error &amp; telat lapor.</p>
                  </div>
                  <div className="p-3.5 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="font-mono text-blue-400 font-bold block">Kapabilitas Solusi:</span>
                    <p className="text-slate-300">• Ekstraksi batch otomatis, pemisahan sheet Pajak Masuk/Keluar, ekspor Hasil Rekap Pajak.xlsx.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 11: Portofolio - Payslip Converter */}
            {currentSlideIndex === 10 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-blue-400">Slide 11 · Portfolio System 4</div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Payslip Converter (Hashmicro HC)</h2>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Lead Time: 1 Hari Kerja</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Kecepatan Konversi</div>
                    <div className="text-xl font-bold text-white font-mono mt-0.5">&lt; 3 Detik</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Kesalahan Mapping</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">0 Human Error</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Kompatibilitas ERP</div>
                    <div className="text-xl font-bold text-blue-400 font-mono mt-0.5">Hashmicro HC</div>
                  </div>
                  <div className="p-3 bg-[#0E1420] border border-white/[0.08] rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400">Cara Kerja</div>
                    <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">Sekali Klik</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="font-mono text-slate-400 font-bold block">Masalah Awal:</span>
                    <p className="text-slate-300">• Tim HC harus mencocokkan kolom draft gaji bulanan manual ke puluhan kode sistem ERP.</p>
                  </div>
                  <div className="p-3.5 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-1.5">
                    <span className="font-mono text-blue-400 font-bold block">Kapabilitas Solusi:</span>
                    <p className="text-slate-300">• Mapping instan: BASIC, ALW1-7, PPH21_TER_ALW, BPJS, menghasilkan CSV siap impor.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 12: Repositori Lain */}
            {currentSlideIndex === 11 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-blue-400">Slide 12 · Scale of Impact</div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Katalog Inisiatif Mikro Mandiri</h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">30+ Repositori Aktif</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs font-mono">
                  {OTHER_TOOLS_CATALOG.slice(0, 16).map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-[#0E1420] border border-white/[0.08] rounded-lg truncate text-slate-300">
                      <span className="text-blue-400 mr-1.5">📁</span>
                      <span className="truncate">{item.name}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 border border-white/[0.08] rounded-xl text-xs text-slate-300 text-center font-mono">
                  Seluruh repositori dibangun secara mandiri oleh Business Analyst tanpa membebani developer IT.
                </div>
              </div>
            )}

            {/* SLIDE 13: Dampak Nyata */}
            {currentSlideIndex === 12 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-blue-400">Slide 13 · Measured Impact</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Dampak Positif Nyata (5 Aspek)</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {IMPACT_TABLE.map((row, idx) => (
                    <div key={idx} className="p-3.5 bg-[#0E1420] border border-white/[0.08] rounded-xl flex flex-col justify-between space-y-2">
                      <div>
                        <span className="text-xs font-mono text-blue-400 font-bold block">{row.aspek}</span>
                        <p className="text-xs text-slate-300 mt-1 leading-snug">{row.hasil}</p>
                      </div>
                      <div className="pt-2 border-t border-white/[0.08] font-mono text-[11px] text-emerald-400 font-bold">
                        {row.tag}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SLIDE 14: Testimoni Pengguna */}
            {currentSlideIndex === 13 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-amber-400">Slide 14 · User Testimonial</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Bukti Kepuasan Pengguna Operasional</h2>
                </div>

                <div className="p-6 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-3 max-w-2xl mx-auto">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(6)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-mono font-bold text-amber-300 ml-2">Rating Bintang 6!</span>
                  </div>

                  <blockquote className="text-sm text-slate-200 italic leading-relaxed">
                    "{TESTIMONIAL_DATA.quote}"
                  </blockquote>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{TESTIMONIAL_DATA.user}</span>
                    <span>{TESTIMONIAL_DATA.date}</span>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 15: Pembelajaran Lapangan */}
            {currentSlideIndex === 14 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-blue-400">Slide 15 · Field Learnings</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Hambatan Nyata Lapangan &amp; Solusi Mitigasi</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {LEARNINGS_DATA.map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-2.5">
                      <h4 className="text-sm font-bold text-white">• {item.obstacle}</h4>
                      <p className="text-xs text-slate-400"><strong>Kendala:</strong> {item.explanation}</p>
                      <p className="text-xs text-emerald-300"><strong>Mitigasi:</strong> {item.mitigation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SLIDE 16: Nilai Strategis BA */}
            {currentSlideIndex === 15 && (
              <div className="space-y-4">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-blue-400">Slide 16 · Paradigm Shift</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Evolusi Peran Strategis Business Analyst</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {KEY_TAKEAWAYS.map((takeaway, idx) => (
                    <div key={idx} className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-2">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        <span>{takeaway.title}</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {takeaway.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SLIDE 17: Rencana Berikutnya */}
            {currentSlideIndex === 16 && (
              <div className="space-y-4 text-center max-w-3xl mx-auto">
                <div className="border-b border-white/[0.08] pb-3">
                  <div className="text-xs font-mono text-emerald-400">Slide 17 · Future Roadmap</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Rencana Berikutnya (Next Steps)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {NEXT_STEPS.map((step, idx) => (
                    <div key={idx} className="p-4 bg-[#0E1420] border border-white/[0.08] rounded-xl space-y-2">
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      <ul className="text-xs text-slate-300 space-y-1.5">
                        {step.points.map((p, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-blue-400">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={onExit}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-lg"
                  >
                    Selesai Presentasi · Buka Dashboard Eksekutif Lengkap
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Speaker Notes HUD (Does NOT push or scroll the slide canvas!) */}
      {showNotes && (
        <div className="fixed bottom-16 right-6 w-96 max-w-[calc(100vw-3rem)] z-40 bg-[#0E1420]/95 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono font-semibold text-blue-400 uppercase">
              Catatan Pembicara · Slide {currentSlide.slideNumber}
            </span>
            <button onClick={() => setShowNotes(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed max-h-44 overflow-y-auto pr-1">
            {currentSlide.speakerNotes}
          </p>
          <div className="text-[10px] text-slate-500 font-mono">
            Tekan 'N' untuk menyembunyikan / menampilkan catatan
          </div>
        </div>
      )}

      {/* Slide Thumbnails Modal */}
      {showThumbnails && (
        <div className="absolute inset-0 z-50 bg-[#070A0F]/95 backdrop-blur-md p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
            <h3 className="text-lg font-bold text-white">Daftar Lengkap Slide Presentasi</h3>
            <button
              onClick={() => setShowThumbnails(false)}
              className="p-2 bg-[#121A2A] hover:bg-[#162238] border border-white/10 rounded-lg text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
            {SLIDES_CONFIG.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => {
                  goToSlide(idx);
                  setShowThumbnails(false);
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  currentSlideIndex === idx
                    ? 'bg-[#289CD7]/20 border-[#289CD7] ring-2 ring-[#289CD7]'
                    : 'bg-[#0E1420] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-[#38BDF8] font-bold mb-1">
                  Slide {slide.slideNumber}
                </div>
                <div className="text-xs font-semibold text-white truncate">{slide.title}</div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">{slide.category}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation Toolbar with Auto-Hide transition */}
      <div
        onMouseEnter={() => {
          isHoveringControlsRef.current = true;
          resetHideTimer();
        }}
        onMouseLeave={() => {
          isHoveringControlsRef.current = false;
          resetHideTimer();
        }}
        className={`px-6 bg-[#0E1420]/95 backdrop-blur-md flex items-center justify-between shrink-0 z-30 transition-all duration-300 transform ${
          isControlsVisible
            ? 'h-14 opacity-100 translate-y-0 border-t border-slate-800'
            : 'h-0 py-0 opacity-0 translate-y-full pointer-events-none border-t-0 overflow-hidden'
        }`}
      >
        <button
          onClick={goToPrev}
          disabled={currentSlideIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#121A2A] hover:bg-[#162238] disabled:opacity-30 disabled:hover:bg-[#121A2A] text-xs font-medium text-white rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <div className="text-xs text-slate-400 font-medium truncate max-w-md hidden sm:block">
          {currentSlide.title} {currentSlide.subtitle && `— ${currentSlide.subtitle}`}
        </div>

        <button
          onClick={goToNext}
          disabled={currentSlideIndex === SLIDES_CONFIG.length - 1}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#289CD7] hover:bg-[#2083B6] disabled:opacity-30 disabled:hover:bg-[#289CD7] text-xs font-semibold text-white rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          <span>Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
