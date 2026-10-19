import { useState } from 'react';
import { IMPACT_TABLE, TESTIMONIAL_DATA } from '../data/presentationData';
import { Clock, Zap, TrendingUp, Star, ShieldCheck, Check } from 'lucide-react';

export function ImpactAndRoi() {
  const [toolCount, setToolCount] = useState<number>(25);
  const [avgDevDaysBefore, setAvgDevDaysBefore] = useState<number>(30); // 1 bulan

  // Calculations
  const devHoursSaved = toolCount * 80; // 80 jam kerja dev per micro tool
  const daysShortened = (avgDevDaysBefore - 3) * toolCount;
  const estimatedCostSavedMillion = Math.round((devHoursSaved * 125000) / 1000000); // Rp 125.000 / jam

  return (
    <div className="space-y-8">
      {/* 5 Aspects Scorecard Table */}
      <div className="bg-[#0E1420] border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="mb-6 pb-4 border-b border-slate-800">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            Corporate Evaluation Matrix
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Dampak Positif Nyata (Kuantitatif &amp; Kualitatif)
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Perbandingan komprehensif antara kondisi sebelum dan sesudah inisiatif AI Rapid Prototyping diterapkan.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-[#121A2A] text-slate-400 font-mono uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5 w-40">Aspek Evaluasi</th>
                <th className="px-4 py-3.5">Kondisi Sebelumnya (Status Quo)</th>
                <th className="px-4 py-3.5">Capaian Setelah AI Rapid Prototyping</th>
                <th className="px-4 py-3.5 text-right w-36">Hasil Nyata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {IMPACT_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-4 py-4 font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#289CD7]" />
                    <span>{row.aspek}</span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 leading-relaxed">
                    {row.sebelum}
                  </td>
                  <td className="px-4 py-4 text-slate-200 font-medium leading-relaxed">
                    {row.hasil}
                  </td>
                  <td className="px-4 py-4 text-right font-mono">
                    <span className="px-2.5 py-1 rounded bg-[#289CD7]/10 text-[#38BDF8] border border-[#289CD7]/30 text-[11px] font-semibold">
                      {row.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive ROI & Capacity Savings Calculator */}
      <div className="bg-[#0E1420] border border-white/[0.08] rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              Resource Optimization Model
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Simulasi Penghematan Beban Departemen IT &amp; Operasional
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Estimasi kapasitas developer IT yang berhasil dialihkan murni ke Core System berkat eksekusi mandiri oleh Business Analyst.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-white/[0.08]">
            Asumsi: 0 Jam Dev IT Terpakai
          </div>
        </div>

        {/* Sliders Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-950/70 rounded-xl border border-slate-800 mb-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <label htmlFor="toolRange" className="font-medium">Kebutuhan Tools Mikro per Tahun</label>
              <span className="font-mono font-bold text-[#38BDF8]">{toolCount} Aplikasi</span>
            </div>
            <input
              id="toolRange"
              type="range"
              min="5"
              max="50"
              value={toolCount}
              onChange={(e) => setToolCount(Number(e.target.value))}
              aria-label="Kebutuhan Tools Mikro per Tahun"
              className="w-full accent-[#289CD7] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>5 Tools</span>
              <span>25 Tools (Saat Ini: 35+)</span>
              <span>50 Tools</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <label htmlFor="leadTimeRange" className="font-medium">Waktu Tunggu Antrean IT Sebelumnya</label>
              <span className="font-mono font-bold text-amber-400">{avgDevDaysBefore} Hari Kerja</span>
            </div>
            <input
              id="leadTimeRange"
              type="range"
              min="15"
              max="90"
              step="5"
              value={avgDevDaysBefore}
              onChange={(e) => setAvgDevDaysBefore(Number(e.target.value))}
              aria-label="Waktu Tunggu Antrean IT Sebelumnya"
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>15 Hari (Cepat)</span>
              <span>30 Hari (1 Bulan)</span>
              <span>90 Hari (3 Bulan)</span>
            </div>
          </div>
        </div>

        {/* Calculated Results Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8]" /> Jam Kerja Dev IT Diselamatkan
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2 tabular-nums">
              {devHoursSaved.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-400">Jam</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              100% kapasitas developer aman untuk memelihara Core System Ethos
            </p>
          </div>

          <div className="p-5 bg-slate-950 rounded-xl border border-white/[0.08]">
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" /> Total Hari Tunggu Terpangkas
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-2 tabular-nums">
              {daysShortened.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-400">Hari Kerja</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Kebutuhan operasional selesai dalam hitungan hari, bukan bulan
            </p>
          </div>

          <div className="p-5 bg-slate-950 rounded-xl border border-white/[0.08]">
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Valuasi Efisiensi Eksekusi
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-mono mt-2 tabular-nums">
              Rp {estimatedCostSavedMillion.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-400">Juta</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Berdasarkan benchmark nilai waktu dan resource alokasi tim teknis
            </p>
          </div>
        </div>
      </div>

      {/* Real Testimonial & WhatsApp Evidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Testimonial Quote Card */}
        <div className="p-6 bg-[#0E1420] border border-white/[0.08] rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-amber-400 mb-4">
              {[...Array(6)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-mono font-bold text-amber-300 ml-2">Rating Bintang 6!</span>
            </div>

            <blockquote className="text-sm text-slate-200 italic leading-relaxed mb-6 font-sans">
              "{TESTIMONIAL_DATA.quote}"
            </blockquote>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">{TESTIMONIAL_DATA.user}</div>
              <div className="text-slate-400 mt-0.5">{TESTIMONIAL_DATA.context}</div>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              {TESTIMONIAL_DATA.date}
            </div>
          </div>
        </div>

        {/* Authentic WhatsApp Dark Mockup */}
        <div className="p-5 bg-[#0A1014] border border-white/[0.08] rounded-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-white">Bukti Turnaround Cepat (&lt; 48 Menit)</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">Slide 7 &amp; 14 Evidence</span>
          </div>

          <div className="py-3 space-y-2.5 text-xs font-sans">
            {/* Incoming request */}
            <div className="p-2.5 bg-[#1F2C34] rounded-xl rounded-tl-none max-w-[85%] text-slate-200 shadow-sm">
              <div className="font-mono text-[10px] text-emerald-400 mb-0.5">TUTORIAL TOOLS PARSE.zip (32 MB)</div>
              <div>Mas agung berikut terlampir contoh bukot dan tutorialnya ya. Terima kasih</div>
              <div className="text-right text-[10px] text-slate-400 font-mono mt-1">15:16</div>
            </div>

            {/* BA acknowledgment */}
            <div className="p-2.5 bg-[#005C4B] rounded-xl rounded-tr-none ml-auto max-w-[85%] text-white shadow-sm">
              <div>oke siap mba, saya coba pelajari dulu mba</div>
              <div className="text-right text-[10px] text-emerald-200 font-mono mt-1">15:16 ✓✓</div>
            </div>

            {/* BA delivered solution */}
            <div className="p-2.5 bg-[#005C4B] rounded-xl rounded-tr-none ml-auto max-w-[85%] text-white shadow-sm">
              <div className="font-mono text-[10px] text-emerald-300 mb-0.5">Bupot Extractor.rar (47 MB)</div>
              <div>Selamat sore mba, boleh dibantu testing untuk extractornya mba? Nanti file bupot dari coretax bisa dimasukan ke folder PDF-Input dan hasilnya ada di PDF-Output mba</div>
              <div className="text-right text-[10px] text-emerald-200 font-mono mt-1">16:04 ✓✓ (&lt; 48 Menit)</div>
            </div>

            {/* User rating response */}
            <div className="p-2.5 bg-[#1F2C34] rounded-xl rounded-tl-none max-w-[85%] text-slate-200 shadow-sm">
              <div>⭐⭐⭐⭐⭐⭐ brikut mas bintangnya, tak lebihin satu hehe</div>
              <div className="text-right text-[10px] text-slate-400 font-mono mt-1">14:44</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
