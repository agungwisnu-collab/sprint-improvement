import React, { useState } from 'react';
import { 
  Palette, Sparkles, Layers, BarChart3, 
  X, Check, Copy, CheckCircle2, AlertTriangle, AlertCircle, 
  Info, Download, Paperclip, Star, Award, Layers2
} from 'lucide-react';
import { SprintImprovementIcon, LinkEthosLogo, LinkEthosIcon } from './logo';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DesignSystemModal({ isOpen, onClose }: DesignSystemModalProps) {
  const [activeTab, setActiveTab] = useState<'tokens' | 'atoms' | 'molecules' | 'charts'>('tokens');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [sliderVal, setSliderVal] = useState(75);
  const [starRating, setStarRating] = useState(5);
  const [chartMetric, setChartMetric] = useState<'all' | 'links' | 'pages'>('all');

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sampleTrendData = [
    { label: "1 Okt", all: 120, links: 85, pages: 35 },
    { label: "3 Okt", all: 180, links: 110, pages: 70 },
    { label: "5 Okt", all: 310, links: 200, pages: 110 },
    { label: "7 Okt", all: 390, links: 250, pages: 140 },
    { label: "9 Okt", all: 410, links: 260, pages: 150 },
    { label: "11 Okt", all: 480, links: 310, pages: 170 },
    { label: "13 Okt", all: 650, links: 420, pages: 230 },
    { label: "Hari ini", all: 720, links: 460, pages: 260 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0B0F17] border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <SprintImprovementIcon size={28} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm tracking-tight font-sans">
                  Ethos Rapid Prototyping Design System
                </span>
                <Badge variant="default" className="text-[10px] font-mono">
                  v1.0 Stand Up #5
                </Badge>
              </div>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                Standarisasi Desain Antarmuka Inisiatif Micro-Tools (Link Ethos, Meethos, Converter)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'tokens', label: 'Level 0: Design Tokens & Warna', icon: Palette },
            { id: 'atoms', label: 'Level 1: Atoms (Buttons, Badges, Inputs)', icon: Sparkles },
            { id: 'molecules', label: 'Level 2: Molecules & Cards', icon: Layers },
            { id: 'charts', label: 'Level 4: Chart Tokens & SVG Curves', icon: BarChart3 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isActive 
                    ? "bg-[#289CD7] text-white shadow-sm" 
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body with Custom Scroll */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {activeTab === 'tokens' && (
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white">Palet Warna Semantik Desain Sistem (OKLCH &amp; Hex)</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#289CD7]/15 text-[#38BDF8] border border-[#289CD7]/30">
                    Diterapkan pada Link Ethos &amp; Katalog Tools
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Warna primer Brand Cyan <code className="text-[#38BDF8]">#289CD7</code> dengan rasio kontras WCAG 2.1 AA di atas kanvas gelap, terstandarisasi untuk seluruh micro-tools internal.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { name: "Brand Cyan", val: "#289CD7", class: "bg-[#289CD7] text-white", desc: "Aksen Resmi Ethos" },
                  { name: "Background", val: "#0B0F17", class: "bg-[#0B0F17] text-white border border-slate-800", desc: "Kanvas Gelap" },
                  { name: "Card Surface", val: "#111827", class: "bg-[#111827] text-slate-200 border border-slate-700/60", desc: "Kontainer Modul" },
                  { name: "Success Emerald", val: "#10B981", class: "bg-emerald-600 text-white", desc: "Status Lulus & Verif" },
                  { name: "Warning Amber", val: "#F59E0B", class: "bg-amber-500 text-slate-950 font-bold", desc: "Peringatan & KKM" },
                  { name: "Destructive", val: "#EF4444", class: "bg-rose-600 text-white", desc: "Error & Batal" },
                ].map((color, i) => (
                  <div
                    key={i}
                    onClick={() => copyToClipboard(color.val)}
                    className="group rounded-xl border border-slate-800 bg-slate-900/50 p-3 space-y-2 cursor-pointer hover:border-[#289CD7]/50 transition-all"
                  >
                    <div className={`h-12 w-full rounded-lg flex items-center justify-center font-mono text-[10px] font-bold ${color.class}`}>
                      {color.val}
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-white">
                        <span>{color.name}</span>
                        {copiedCode === color.val ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">{color.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Typography */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white">Skala Tipografi Terpadu</h3>
                <Card className="divide-y divide-slate-800/80">
                  <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-400 w-44 shrink-0">Display 1 (text-4xl)</span>
                    <span className="text-3xl font-extrabold tracking-tight text-white font-sans">
                      AI-Driven Rapid Prototyping Platform
                    </span>
                  </div>
                  <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-400 w-44 shrink-0">Heading 2 (text-xl)</span>
                    <span className="text-xl font-bold tracking-tight text-white font-sans">
                      Solusi Cepat Kebutuhan Operasional Tanpa Backlog IT
                    </span>
                  </div>
                  <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-400 w-44 shrink-0">Body Regular (text-sm)</span>
                    <span className="text-sm text-slate-300 leading-relaxed font-sans">
                      Memangkas lead time dari 1–3 bulan menjadi &lt; 1–5 hari dengan 0 jam alokasi developer.
                    </span>
                  </div>
                  <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-400 w-44 shrink-0">Code / Mono (font-mono)</span>
                    <span className="text-xs font-mono font-bold text-[#38BDF8] bg-[#289CD7]/10 px-2 py-0.5 rounded w-fit">
                      lead_time: &lt;5d | story_points_saved: 100% | domain: link.ethos.co.id
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'atoms' && (
            <div className="space-y-6">
              {/* Buttons */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">1.1 Button Variants & States</h3>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button variant="default">Primary Default</Button>
                  <Button variant="brand">Brand Cyan Gradient</Button>
                  <Button variant="secondary">Secondary Dark</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost Action</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="default" size="sm" className="gap-1.5">
                    <Download className="w-3.5 h-3.5" /> Download
                  </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white">1.2 Badges & Status Chips</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brand">BRAND ETHOS</Badge>
                  <Badge variant="default">STATUS AKTIF</Badge>
                  <Badge variant="success">LULUS / SUKSES</Badge>
                  <Badge variant="warning">PERHATIAN KKM</Badge>
                  <Badge variant="info">INFO STANDAR</Badge>
                  <Badge variant="destructive">GAGAL / RISIKO</Badge>
                  <Badge variant="outline">ROLE: BUSINESS ANALYST</Badge>
                </div>
              </div>

              {/* Inputs & Controls */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white">1.3 Interactive Atom Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Skala Adopsi AI (Slider Atom)</span>
                      <span className="font-mono text-[#38BDF8] font-bold">{sliderVal}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={e => setSliderVal(Number(e.target.value))}
                      className="w-full accent-[#289CD7] h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-medium text-slate-300 block">Star Rating Atom (Penilaian Juri)</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setStarRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${star <= starRating ? "fill-amber-400 text-amber-400" : "text-slate-700"}`} />
                        </button>
                      ))}
                      <span className="text-xs font-mono font-bold text-white ml-2">{starRating} / 5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'molecules' && (
            <div className="space-y-6">
              {/* Callouts */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">2.1 Callout Information Box Variants</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs bg-[#289CD7]/10 border-[#289CD7]/30 text-[#38BDF8]">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Info Semantik</p>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Panduan integrasi subdomain resmi.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Success Semantik</p>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Deployment micro-tools selesai &amp; aman.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs bg-amber-500/10 border-amber-500/30 text-amber-400">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Warning Semantik</p>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Perhatian kapasitas server &amp; SOP.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs bg-rose-500/10 border-rose-500/30 text-rose-400">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Destructive Semantik</p>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Risiko kebocoran data di Shadow IT.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric Stat Card Molecule */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white">2.2 Metric Stat Card Molecule (KPI Standard)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <span className="text-xs text-slate-400 font-medium">Penghematan Alokasi Dev IT</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-bold font-mono text-emerald-400">100%</span>
                      <span className="text-xs text-slate-400">(0 Story Points)</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Target Core System terjaga maksimal</p>
                  </Card>

                  <Card className="p-4">
                    <span className="text-xs text-slate-400 font-medium">Akselerasi Lead Time</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-bold font-mono text-[#38BDF8]">&lt; 1 - 5 Hari</span>
                      <span className="text-xs text-emerald-400 font-mono">-90% lead time</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Dari antrean 1–3 bulan di IT backlog</p>
                  </Card>

                  <Card className="p-4">
                    <span className="text-xs text-slate-400 font-medium">Trafik Domain Resmi</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-bold font-mono text-white">4.650</span>
                      <span className="text-xs text-[#38BDF8] font-mono">link.ethos.co.id</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">100% Bebas Iklan &amp; Malware Pihak Ketiga</p>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'charts' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Level 4: Interactive Daily Traffic Area Chart (SVG Bezier)</h3>
                  <p className="text-xs text-slate-400">Kurva tren murni SVG dengan token warna Brand Cyan <code className="text-[#38BDF8]">--color-chart-1: #289CD7</code></p>
                </div>

                <div className="flex rounded-lg bg-slate-900 p-1 text-xs border border-slate-800">
                  {(['all', 'links', 'pages'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setChartMetric(m)}
                      className={`px-3 py-1 rounded-md text-xs transition-all cursor-pointer ${
                        chartMetric === m ? "bg-[#289CD7] text-white font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {m === 'all' ? 'Semua Trafik' : m === 'links' ? 'Klik Link' : 'Kunjungan'}
                    </button>
                  ))}
                </div>
              </div>

              <Card className="p-5">
                {(() => {
                  const maxVal = Math.max(...sampleTrendData.map(d => d[chartMetric]));
                  const svgW = 740;
                  const svgH = 180;
                  const padL = 40;
                  const padR = 20;
                  const padT = 20;
                  const padB = 30;
                  const plotW = svgW - padL - padR;
                  const plotH = svgH - padT - padB;

                  const points = sampleTrendData.map((d, i) => {
                    const x = padL + (i / (sampleTrendData.length - 1)) * plotW;
                    const y = padT + plotH - (d[chartMetric] / maxVal) * plotH;
                    return { x, y, data: d };
                  });

                  // Generate Bezier path
                  let pathD = `M ${points[0].x} ${points[0].y}`;
                  for (let i = 0; i < points.length - 1; i++) {
                    const p0 = points[i];
                    const p1 = points[i + 1];
                    const cpX = (p0.x + p1.x) / 2;
                    pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
                  }
                  const areaD = `${pathD} L ${points[points.length - 1].x} ${padT + plotH} L ${points[0].x} ${padT + plotH} Z`;

                  return (
                    <div className="w-full overflow-x-auto">
                      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-48 select-none">
                        <defs>
                          <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#289CD7" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#289CD7" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        {[0, 0.5, 1].map((ratio, idx) => (
                          <line
                            key={idx}
                            x1={padL}
                            y1={padT + plotH * ratio}
                            x2={svgW - padR}
                            y2={padT + plotH * ratio}
                            stroke="#1E293B"
                            strokeDasharray="4 4"
                          />
                        ))}

                        {/* Fill area */}
                        <path d={areaD} fill="url(#chartAreaGrad)" />

                        {/* Line curve */}
                        <path d={pathD} fill="none" stroke="#289CD7" strokeWidth="2.5" strokeLinecap="round" />

                        {/* Coordinate points */}
                        {points.map((p, i) => (
                          <g key={i}>
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="4"
                              fill="#0B0F17"
                              stroke="#38BDF8"
                              strokeWidth="2.5"
                              className="transition-all hover:scale-125"
                            />
                            <text
                              x={p.x}
                              y={svgH - 8}
                              textAnchor="middle"
                              fill="#94A3B8"
                              fontSize="10"
                              fontFamily="JetBrains Mono"
                            >
                              {p.data.label}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>
                  );
                })()}
              </Card>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="font-mono text-[11px]">Sesuai spesifikasi resmi: design/design.md &amp; design/atomic-design</span>
          <Button variant="default" size="sm" onClick={onClose}>
            Tutup Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
