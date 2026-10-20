import { LEARNINGS_DATA, KEY_TAKEAWAYS, NEXT_STEPS } from '../data/presentationData';
import { CheckCircle2, Lightbulb, Compass, Server, BookOpen, ArrowRight } from 'lucide-react';

export function LearningsAndRoadmap() {
  return (
    <div className="space-y-8">
      {/* Obstacles & Mitigations Table */}
      <div className="bg-[#0E1522]/90 border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="mb-6 pb-4 border-b border-white/[0.08]">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            Operational Field Learnings
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Hambatan Nyata yang Dihadapi &amp; Solusi Mitigasi
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Evaluasi objektif atas kendala teknis dan adopsi user selama tahap implementasi awal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEARNINGS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#0B0F17]/90 border border-white/[0.08] rounded-xl flex flex-col justify-between hover:border-[#289CD7]/40 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  <span>{item.obstacle}</span>
                </div>

                <div className="text-xs text-slate-300 mb-4 bg-[#131D2E]/70 p-3.5 rounded-lg border border-white/[0.06] leading-relaxed">
                  <span className="text-slate-400 font-semibold block mb-1">Kendala Lapangan:</span>
                  {item.explanation}
                </div>
              </div>

              <div className="text-xs text-emerald-300 bg-emerald-950/40 p-3.5 rounded-lg border border-emerald-500/20 leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tindakan Mitigasi Teruji:</span>
                </div>
                {item.mitigation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Takeaways for Business Analysts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {KEY_TAKEAWAYS.map((takeaway, idx) => (
          <div
            key={idx}
            className="p-6 bg-[#0E1522]/90 border border-white/[0.08] backdrop-blur-md rounded-2xl relative overflow-hidden shadow-xl hover:border-[#289CD7]/40 transition-all"
          >
            <div className="flex items-center gap-2.5 mb-3 text-[#38BDF8]">
              <Lightbulb className="w-4 h-4" />
              <h4 className="text-base font-bold text-white tracking-tight">
                {takeaway.title}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {takeaway.desc}
            </p>

            <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Evolusi Kompetensi</span>
              <span className="text-[#38BDF8] font-semibold">Pemahaman Bisnis + AI</span>
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps Roadmap */}
      <div className="bg-[#0E1522]/90 border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="mb-6 pb-4 border-b border-white/[0.08]">
          <div className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-1">
            Strategic Direction 2026 - 2027
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Rencana Berikutnya (Next Steps)
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Fase keberlanjutan dan penyempurnaan ekosistem rapid prototyping mandiri secara terpusat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NEXT_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#0B0F17]/90 border border-white/[0.08] rounded-xl space-y-3 hover:border-[#289CD7]/40 transition-all shadow-sm"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                {idx === 0 ? (
                  <Server className="w-4 h-4 text-[#38BDF8]" />
                ) : (
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                )}
                <span>{step.title}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                {step.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                    <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
