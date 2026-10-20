import { useState } from 'react';
import { FIVE_WHYS } from '../data/presentationData';
import { ChevronRight, ArrowDownRight } from 'lucide-react';

export function FiveWhysExplorer() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="bg-[#0E1522]/90 border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-xl">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-1">
            Root Cause Investigation
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Metode Analisis 5 Whys (Penelusuran Rantai Kausal)
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Menelusuri secara bertahap dari fenomena keterlambatan hingga menemukan kebuntuan paradigma peran BA konvensional dan terobosan pemanfaatan AI Agentic Coding.
          </p>
        </div>

        {/* Step buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#090E17] rounded-xl border border-white/[0.08]">
          {FIVE_WHYS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                activeStep === idx
                  ? idx === 4
                    ? 'bg-emerald-600 text-white font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'bg-[#289CD7] text-white font-bold shadow-[0_0_12px_rgba(40,156,215,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Why #{item.step}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Accordion Pathway */}
      <div className="space-y-3">
        {FIVE_WHYS.map((item, idx) => {
          const isActive = activeStep === idx;
          const isTurningPoint = idx === 4;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
                isActive
                  ? isTurningPoint
                    ? 'bg-[#0E1F1A] border-emerald-500/60 ring-1 ring-emerald-500/40 shadow-lg'
                    : 'bg-[#131D2E] border-[#289CD7]/60 ring-1 ring-[#289CD7]/40 shadow-lg shadow-[#289CD7]/10'
                  : 'bg-[#0E1522]/80 border-white/[0.06] hover:border-white/[0.15] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                      isTurningPoint
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : isActive
                        ? 'bg-[#289CD7] text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{item.step}
                  </div>
                  <h4 className="text-sm font-semibold text-white truncate">
                    {item.question}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isTurningPoint && (
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                      Titik Balik Solusi
                    </span>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isActive ? 'rotate-90 text-white' : ''
                    }`}
                  />
                </div>
              </div>

              {isActive && (
                <div className="px-5 pb-5 pt-2 border-t border-white/[0.06] space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Analisis Jawaban Tim BA:
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {item.answer}
                    </p>
                  </div>

                  <div className="p-3 bg-[#0B0F17] rounded-lg border border-white/[0.06] flex items-start gap-2.5 text-xs">
                    <ArrowDownRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200">Implikasi Manajemen: </span>
                      <span className="text-slate-400">{item.implication}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step Navigation Bar */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono">
          Langkah {activeStep + 1} dari {FIVE_WHYS.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 rounded-lg border border-white/[0.08] transition-colors"
          >
            Sebelumnya
          </button>
          <button
            onClick={() => setActiveStep(prev => Math.min(FIVE_WHYS.length - 1, prev + 1))}
            disabled={activeStep === FIVE_WHYS.length - 1}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-lg transition-colors font-medium"
          >
            Langkah Selanjutnya →
          </button>
        </div>
      </div>
    </div>
  );
}
