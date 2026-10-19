import { useState } from 'react';
import { FISHBONE_DATA } from '../data/presentationData';
import { ArrowRight, Info } from 'lucide-react';

export function FishboneDiagram() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#0E1420] border border-white/[0.08] rounded-2xl p-6 lg:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            Ishikawa Engineering Framework
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Diagram Sebab-Akibat (Fishbone Analysis)
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Dekomposisi sistematis 4 dimensi akar penyebab yang menyebabkan penumpukan backlog IT dan keresahan penggunaan Shadow IT di lingkungan kerja operasional.
          </p>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
          <Info className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Pilih dimensi tulang untuk menelaah rincian penyebab</span>
        </div>
      </div>

      {/* Engineering Diagram Canvas */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[860px] grid grid-cols-12 gap-6 items-center relative py-4">
          {/* Ribs Area (8 cols) */}
          <div className="col-span-8 flex flex-col justify-between h-[420px] relative">
            {/* Top Ribs (Category 1: Manusia, Category 2: Metode) */}
            <div className="grid grid-cols-2 gap-6 z-10">
              {FISHBONE_DATA.slice(0, 2).map((item, idx) => {
                const isActive = activeCategoryIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCategoryIndex(isActive ? null : idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#289CD7]/15 border-[#289CD7] shadow-md ring-1 ring-[#289CD7]/40'
                        : 'bg-[#121A2A]/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#38BDF8]">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {item.causes.length} Faktor
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {item.causes.map((cause, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-blue-400 font-mono text-[10px] mt-0.5">↳</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Central Horizontal Spine (Engineering Axis) */}
            <div className="relative my-4 flex items-center justify-between">
              <div className="w-full h-1 bg-gradient-to-r from-slate-700 via-blue-500/80 to-slate-400 rounded-full" />
              <ArrowRight className="w-6 h-6 text-slate-300 shrink-0 ml-1" />
            </div>

            {/* Bottom Ribs (Category 3: Prioritas & Lingkungan, Category 4: Teknologi & Keamanan) */}
            <div className="grid grid-cols-2 gap-6 z-10">
              {FISHBONE_DATA.slice(2, 4).map((item, idx) => {
                const actualIndex = idx + 2;
                const isActive = activeCategoryIndex === actualIndex;
                return (
                  <div
                    key={actualIndex}
                    onClick={() => setActiveCategoryIndex(isActive ? null : actualIndex)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-950/30 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-[#121A2A]/90 border-white/[0.08] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {item.causes.length} Faktor
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {item.causes.map((cause, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-amber-400 font-mono text-[10px] mt-0.5">↳</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spine Head / The Problem Effect (4 cols) */}
          <div className="col-span-4 pl-4">
            <div className="p-6 bg-[#16131B] border border-rose-900/60 rounded-2xl relative shadow-lg">
              <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold mb-2">
                Masalah Utama (Problem Statement)
              </div>
              <h4 className="text-base font-bold text-white leading-snug">
                Backlog IT Menumpuk 1–3 Bulan &amp; Keresahan VP IT atas Tools Luar
              </h4>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Antrean SDLC konvensional yang panjang menyebabkan tools mikro departemen operasional tidak pernah menjadi prioritas, memicu tim menggunakan tools gratis pihak ketiga yang berisiko kebocoran data dan menurunkan citra perusahaan.
              </p>

              <div className="mt-5 pt-3 border-t border-rose-950 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Solusi Teruji:</span>
                <span className="text-emerald-400 font-semibold">AI Rapid Prototyping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Diagnostic Detail Bar */}
      {activeCategoryIndex !== null && (
        <div className="mt-4 p-4 bg-[#111724] border border-blue-500/30 rounded-xl text-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-white">
              Fokus Dimensi {FISHBONE_DATA[activeCategoryIndex].category}:
            </span>
            <p className="text-slate-300 mt-1 leading-relaxed">
              {FISHBONE_DATA[activeCategoryIndex].causes.join(" — ")}
            </p>
          </div>
          <button
            onClick={() => setActiveCategoryIndex(null)}
            className="text-xs text-slate-400 hover:text-white underline font-mono shrink-0"
          >
            Reset Pilihan
          </button>
        </div>
      )}
    </div>
  );
}
