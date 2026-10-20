import { 
  TEAM_INFO, PROBLEM_METRICS, IMPACT_TABLE, TESTIMONIAL_DATA, 
  LEARNINGS_DATA, KEY_TAKEAWAYS, NEXT_STEPS 
} from '../data/presentationData';
import { FishboneDiagram } from './FishboneDiagram';
import { FiveWhysExplorer } from './FiveWhysExplorer';
import { PortfolioShowcase } from './PortfolioShowcase';
import { ImpactAndRoi } from './ImpactAndRoi';
import { LearningsAndRoadmap } from './LearningsAndRoadmap';
import { 
  Presentation, ArrowRight, ShieldCheck, Clock, 
  Layers, CheckCircle2, ChevronRight, Terminal, FileCheck, Sparkles
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ExecutiveViewProps {
  onStartSlideMode: () => void;
  onOpenFeedback: () => void;
  onOpenDesignSystem?: () => void;
}

export function ExecutiveView({ onStartSlideMode, onOpenFeedback, onOpenDesignSystem }: ExecutiveViewProps) {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100">
      {/* Executive Briefing Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-20 border-b border-slate-800/80 bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Metadata Kicker with Design System Indicator */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400 mb-6">
            <span className="text-[#38BDF8] font-semibold">{TEAM_INFO.event}</span>
            <span className="text-slate-600">/</span>
            <span>{TEAM_INFO.organization}</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400">Executive Report</span>
            <span className="text-slate-600">/</span>
            <Badge variant="default" className="text-[10px] py-0 px-2 font-mono">
              Ethos BA Design System v1.0
            </Badge>
          </div>

          {/* Main Title & Value Proposition */}
          <div className="max-w-4xl space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              AI-Driven Rapid Prototyping
            </h1>
            <p className="text-lg sm:text-2xl text-slate-200 font-normal leading-relaxed text-balance">
              Solusi Cepat Kebutuhan Operasional Departemen Tanpa Membebani Backlog IT
            </p>
            <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
              Transformasi peran Business Analyst dari penyusun dokumen kebutuhan pasif menjadi eksekutor mandiri working software berbasis <em>AI Agentic Coding</em>, memangkas lead time dari bulanan menjadi hitungan hari tanpa menyerap kapasitas tim pengembang Core System.
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button
              onClick={onStartSlideMode}
              variant="brand"
              size="default"
              className="px-6 py-3 text-xs shadow-md"
            >
              <Presentation className="w-4 h-4" />
              <span>Buka Slide Presentasi (17 Slide)</span>
            </Button>

            <a
              href="#portofolio"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/70 text-slate-200 hover:text-white text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <span>Lihat Bukti Implementasi &amp; Simulator</span>
            </a>

            {onOpenDesignSystem && (
              <button
                onClick={onOpenDesignSystem}
                className="px-4 py-2.5 bg-[#289CD7]/10 hover:bg-[#289CD7]/20 border border-[#289CD7]/30 text-[#38BDF8] hover:text-white text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Showcase Design System</span>
              </button>
            )}

            <button
              onClick={onOpenFeedback}
              className="px-4 py-2.5 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
            >
              Formulir Evaluasi Juri →
            </button>
          </div>

          {/* Author Byline */}
          <div className="mt-12 pt-8 border-t border-white/[0.08]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3">
              Tim Penyusun Inisiatif:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TEAM_INFO.members.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#111827]/70 border border-white/[0.06] rounded-xl"
                >
                  <div className="text-[10px] font-mono text-slate-400">Inisiator {idx + 1}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{member.name}</div>
                  <div className="text-xs text-blue-400 font-mono mt-0.5">{member.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Executive KPI Strip */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] bg-[#0E1420] border border-white/[0.08] rounded-2xl overflow-hidden">
            <div className="p-6">
              <div className="text-xs font-mono text-slate-400">Alokasi Story Points Dev IT</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-2 tabular-nums">
                0 Jam
              </div>
              <div className="text-xs text-slate-400 mt-1">
                100% kapasitas developer aman untuk Core System
              </div>
            </div>

            <div className="p-6">
              <div className="text-xs font-mono text-slate-400">Penyusutan Lead Time</div>
              <div className="text-3xl font-extrabold text-white font-mono mt-2 tabular-nums">
                &lt; 1 - 5 Hari
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Turun drastis dari 1–3 bulan antrean IT
              </div>
            </div>

            <div className="p-6">
              <div className="text-xs font-mono text-slate-400">Repositori &amp; Micro-Tools</div>
              <div className="text-3xl font-extrabold text-blue-400 font-mono mt-2 tabular-nums">
                35+ Tools
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Aktif melayani kebutuhan multi-departemen
              </div>
            </div>

            <div className="p-6">
              <div className="text-xs font-mono text-slate-400">Standar Keamanan Data</div>
              <div className="text-3xl font-extrabold text-amber-300 font-mono mt-2">
                100% Offline
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Bebas risiko kebocoran data &amp; malware
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Masalah & Backlog IT Analysis */}
      <section id="masalah" className="py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
              01. Identifikasi Masalah &amp; Analisis Kausal
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Kapasitas Tim IT Terikat vs Penumpukan Backlog Operasional
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Fokus mutlak tim pengembang IT pada pemeliharaan Core System Ethos dan target KPI perusahaan menyebabkan kebutuhan otomasi mikro departemen operasional tidak terlayani, memicu keresahan adopsi <em>Shadow IT</em> ilegal.
            </p>
          </div>

          {/* Visualizing the 117 IT Tasks Backlog Queue */}
          <div className="p-6 bg-[#0E1420] border border-white/[0.08] rounded-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Kondisi Nyata Antrean Tiket IT (117 Total Kebutuhan)
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Distribusi Beban Kerja Antrean Pengembangan IT
                </h3>
              </div>
              <div className="text-xs font-mono text-amber-400">
                Prioritas Mikro: Tertunda 1–3 Bulan
              </div>
            </div>

            {/* Segmented Queue Progress Bar */}
            <div className="w-full h-4 bg-slate-950 rounded-lg overflow-hidden flex my-3 border border-white/10">
              <div
                className="bg-rose-500 h-full"
                style={{ width: `${(PROBLEM_METRICS.onHold / PROBLEM_METRICS.backlogTotal) * 100}%` }}
                title={`On Hold: ${PROBLEM_METRICS.onHold}`}
              />
              <div
                className="bg-amber-500 h-full"
                style={{ width: `${(PROBLEM_METRICS.notStarted / PROBLEM_METRICS.backlogTotal) * 100}%` }}
                title={`Not Started: ${PROBLEM_METRICS.notStarted}`}
              />
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${(PROBLEM_METRICS.inProgress / PROBLEM_METRICS.backlogTotal) * 100}%` }}
                title={`In Progress: ${PROBLEM_METRICS.inProgress}`}
              />
            </div>

            {/* Queue breakdown cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Kebutuhan On Hold:</span>
                  <span className="font-mono font-bold text-rose-400">{PROBLEM_METRICS.onHold} Kebutuhan</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Tertahan keterbatasan resource pengembang</div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Kebutuhan Not Started:</span>
                  <span className="font-mono font-bold text-amber-400">{PROBLEM_METRICS.notStarted} Kebutuhan</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Antrean backlog operasional yang belum tersentuh</div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Kebutuhan In Progress:</span>
                  <span className="font-mono font-bold text-blue-400">{PROBLEM_METRICS.inProgress} Kebutuhan</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Sedang dikerjakan untuk Core System &amp; KPI Utama</div>
              </div>
            </div>
          </div>

          {/* 3 Columns: Core Allocation, Shadow IT Risks, Why BA Must Act */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0E1420] border border-white/[0.08] rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">
                  Kapasitas Tim IT
                </span>
                <h3 className="text-lg font-bold text-white mt-1 mb-2">
                  100% Terikat pada Core System
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Seluruh tenaga programmer dialokasikan mutlak untuk menjaga stabilitas Core System Ethos, integrasi skala besar, dan target KPI strategis korporasi.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-xs text-slate-400">
                Dampak: Kebutuhan mikro tergeser ke prioritas terbawah
              </div>
            </div>

            <div className="p-6 bg-[#0E1420] border border-white/[0.08] rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider">
                  Keresahan Manajemen
                </span>
                <h3 className="text-lg font-bold text-white mt-1 mb-2">
                  Risiko Adopsi Shadow IT
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Untuk mengejar target harian, divisi berinisiatif menggunakan alat gratisan pihak ketiga di internet:
                </p>
                <div className="space-y-2">
                  {PROBLEM_METRICS.shadowItRisks.map((risk, rIdx) => (
                    <div key={rIdx} className="p-2 bg-slate-950/70 rounded-lg text-xs">
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span>{risk.title}</span>
                        <span className="font-mono text-[10px] text-rose-400">{risk.severity}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{risk.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-xs text-rose-400">
                Pemicu: Inisiatif mandiri tanpa pengamanan internal
              </div>
            </div>

            <div className="p-6 bg-[#0E1420] border border-white/[0.08] rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  Kebuntuan Konvensional
                </span>
                <h3 className="text-lg font-bold text-white mt-1 mb-2">
                  SDLC Kaku &amp; Keterbatasan Koding BA
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Sebelumnya BA hanya bertindak pasif menyusun dokumen FRD tanpa kemampuan mengeksekusi koding aplikasi dari nol, sementara jalur IT memerlukan approval dan alokasi berbulan-bulan.
                </p>
                <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl text-xs text-emerald-300">
                  Titik Balik: AI Agentic Coding memberikan daya eksekusi langsung kepada BA yang memahami alur proses bisnis.
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-xs text-emerald-400">
                Hasil: Selesai tanpa mengganggu antrean IT
              </div>
            </div>
          </div>

          {/* Interactive Fishbone Engineering Diagram */}
          <div className="pt-4">
            <FishboneDiagram />
          </div>

          {/* Interactive 5 Whys Explorer */}
          <div className="pt-4">
            <FiveWhysExplorer />
          </div>
        </div>
      </section>

      {/* Section 2: Metodologi AI & Alur Perbaikan */}
      <section id="solusi" className="py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              02. Metodologi AI &amp; Alur Eksekusi Mandiri
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Perbaikan Nyata: Inisiatif AI-Driven Prototyping oleh Business Analyst
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Mematahkan mitos bahwa pembuatan aplikasi mikro internal selalu membutuhkan tim developer khusus. Dengan bantuan AI Agentic Coding, Business Analyst mengeksekusi kebutuhan operasional langsung ke dalam software fungsional.
            </p>
          </div>

          {/* Flow Comparison Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* The Old Bottleneck */}
            <div className="p-6 bg-[#0E1420] border border-white/[0.08] rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                  Metode Konvensional (Sebelumnya)
                </span>
                <span className="text-xs font-mono text-slate-400">Lead Time: 1 - 3 Bulan</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Rantai Birokrasi Tiket &amp; Koding Manual dari Nol
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-950 rounded-xl border border-white/[0.06] flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">1</span>
                  <span>Kebutuhan mikro masuk ke backlog IT dan kalah prioritas dari Core System</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-white/[0.06] flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">2</span>
                  <span>BA pasif menulis dokumen spesifikasi (FRD/BRD) tanpa kemampuan eksekusi kode</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-white/[0.06] flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">3</span>
                  <span>Menunggu alokasi sprint developer IT yang padat target KPI internal</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-white/[0.06] flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">4</span>
                  <span>Pemrograman manual memakan puluhan jam kerja developer</span>
                </div>
              </div>
              <div className="p-3 bg-rose-950/30 border border-rose-900/40 rounded-xl text-xs text-rose-300">
                Hasil: Departemen frustrasi, pekerjaan tertunda, dan terdorong mengunggah data ke website konverter gratisan luar.
              </div>
            </div>

            {/* The New AI-Driven Framework */}
            <div className="p-6 bg-[#0E1420] border border-blue-500/40 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Metode Baru (AI-Driven Prototyping)
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">&lt; 1 Hari - 5 Hari</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Eksekusi Langsung Mandiri oleh Business Analyst
              </h3>
              <div className="space-y-3 text-xs text-slate-200">
                <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/40 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">1</span>
                  <span>BA mengidentifikasi langsung kendala proses bisnis di lapangan (Tax, HC, Operasional)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/40 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">2</span>
                  <span>BA merancang arsitektur &amp; logika solusi dengan bantuan AI Agentic Coding</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/40 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">3</span>
                  <span>Solusi fungsional dihasilkan dalam hitungan jam / hari kerja</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/40 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">4</span>
                  <span>Ditempatkan pada server terisolasi yang aman dengan 0 gangguan ke developer Core IT</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl text-xs text-emerald-300">
                Hasil: Lead time terpangkas 95%, 0 story points developer IT terpakai, dan data perusahaan aman di lingkungan terisolasi.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Portofolio Sistem & Interactive Live Demos */}
      <section id="portofolio" className="py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
              03. Portofolio Sistem yang Telah Dibangun &amp; Evidence
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Implementasi Nyata &amp; Simulator Interaktif
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Jelajahi dan uji coba langsung 4 sistem utama yang telah di-deploy untuk melayani operasional harian Ethos Group, serta katalog puluhan micro-tools internal lainnya.
            </p>
          </div>

          <PortfolioShowcase />
        </div>
      </section>

      {/* Section 4: Dampak Nyata, ROI Calculator & Testimoni */}
      <section id="dampak" className="py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              04. Pengukuran Dampak &amp; Evaluasi ROI
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Dampak Positif Nyata (Kuantitatif &amp; Kualitatif)
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Evaluasi komprehensif atas aspek waktu (Time), beban developer (Effort), efisiensi SLA (Efficiency), keamanan data (Safety), serta integritas merek perusahaan (Morality).
            </p>
          </div>

          <ImpactAndRoi />
        </div>
      </section>

      {/* Section 5: Pembelajaran & Roadmap */}
      <section id="rencana" className="py-20 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
              05. Pembelajaran Nyata &amp; Rencana Strategis
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Mitigasi Kendala Lapangan &amp; Keberlanjutan Sistem
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Penyusunan standarisasi template Docker container, koordinasi server internal terisolasi dengan IT Infrastructure, serta pembuatan Quick Start Guide dan sosialisasi ke seluruh divisi operasional.
            </p>
          </div>

          <LearningsAndRoadmap />
        </div>
      </section>

      {/* Presentation Deck Launcher Section */}
      <section className="py-20 bg-[#0E1420] border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-xs font-mono text-blue-300">
            Stand Up for Improvement Batch 5 · Pitch Deck Mode
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Siap untuk Sesi Presentasi di Hadapan Dewan Juri?
          </h2>

          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Akses format slide Keynote interaktif lengkap dengan stopwatch waktu presentasi, talking points pembicara, dan navigasi keyboard.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartSlideMode}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-blue-950 flex items-center gap-2"
            >
              <Presentation className="w-4 h-4" />
              <span>Mulai Mode Slide Presentasi</span>
            </button>

            <button
              onClick={onOpenFeedback}
              className="px-6 py-3.5 bg-[#121A2A] hover:bg-[#162238] border border-white/10 text-slate-200 hover:text-white rounded-xl text-xs font-medium transition-colors"
            >
              Beri Evaluasi / Nilai Juri
            </button>
          </div>
        </div>
      </section>

      {/* Quiet Corporate Footer */}
      <footer className="py-8 bg-[#0B0F17] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            © 2026 Ethos Group · Tim Business Analyst: Agung Wisnu Anggoro, Nina Verina, Lisa Amri Mubarokah.
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
            <span>Stand Up for Improvement Batch 5</span>
            <span className="text-slate-700">·</span>
            <span className="text-blue-400 font-medium">AI-Driven Rapid Prototyping</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
