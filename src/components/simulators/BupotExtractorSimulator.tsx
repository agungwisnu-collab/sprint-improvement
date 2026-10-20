import { useState } from 'react';
import { Play, Download, CheckCircle, Terminal, FileSpreadsheet, RefreshCw } from 'lucide-react';

interface ExtractedRecord {
  nomor: string;
  jenis: 'Pajak Masuk' | 'Pajak Keluar';
  lawanTransaksi: string;
  npwp: string;
  dpp: number;
  ppn: number;
  status: string;
}

const SAMPLE_RECORDS: ExtractedRecord[] = [
  { nomor: "04002600348383794", jenis: "Pajak Masuk", lawanTransaksi: "TRESNO JAMU INDONESIA", npwp: "04.002.600.3-405.000", dpp: 45000000, ppn: 4950000, status: "Tervalidasi" },
  { nomor: "04002600337622290", jenis: "Pajak Masuk", lawanTransaksi: "TRESNO JAMU INDONESIA", npwp: "04.002.600.3-405.000", dpp: 32000000, ppn: 3520000, status: "Tervalidasi" },
  { nomor: "04002600325530633", jenis: "Pajak Masuk", lawanTransaksi: "TRESNO JAMU INDONESIA", npwp: "04.002.600.3-405.000", dpp: 78500000, ppn: 8635000, status: "Tervalidasi" },
  { nomor: "04002600348383810", jenis: "Pajak Masuk", lawanTransaksi: "TRESNO JAMU INDONESIA", npwp: "04.002.600.3-405.000", dpp: 19800000, ppn: 2178000, status: "Tervalidasi" },
  { nomor: "01002600492104921", jenis: "Pajak Keluar", lawanTransaksi: "PT ETHOS MITRA NIAGA", npwp: "09.933.974.4-752.000", dpp: 120000000, ppn: 13200000, status: "Tervalidasi" },
  { nomor: "01002600492104922", jenis: "Pajak Keluar", lawanTransaksi: "PT SEJAHTERA LOGISTIK", npwp: "07.812.345.6-012.000", dpp: 54000000, ppn: 5940000, status: "Tervalidasi" }
];

export function BupotExtractorSimulator() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'excel'>('terminal');
  const [filterType, setFilterType] = useState<'all' | 'masuk' | 'keluar'>('all');
  const [logs, setLogs] = useState<string[]>([
    "[READY] Direktori E:\\FHI\\FHI 2026\\PPh\\Faktur_Input terdeteksi.",
    "[INFO] Menunggu berkas PDF Bupot / Faktur Coretax untuk diekstrak..."
  ]);

  const runExtraction = () => {
    setIsProcessing(true);
    setIsCompleted(false);
    setLogs([
      "[INIT] Memulai inisiasi engine Bupot & Faktur Extractor v1.0...",
      "[SCAN] Membaca berkas PDF di folder input..."
    ]);

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        "[SUCCESS] InputTaxInvoice-a2c1c3ae-46f5-8318-ddbde9d59123 -> TRESNO JAMU INDONESIA (04002600348383794)",
        "[SUCCESS] InputTaxInvoice-aaba4f5d-da8a-4ade-87e7-761ca6e46b91 -> TRESNO JAMU INDONESIA (04002600337622290)",
        "[SUCCESS] InputTaxInvoice-bdf1aa03-841f-4e35-93cc-2d22a394f63e -> TRESNO JAMU INDONESIA (04002600325530633)"
      ]);
    }, 400);

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        "[INFO] Memproses Kategori: Pajak Keluar (8 file Coretax)...",
        "[SUCCESS] OutputTaxInvoice-e3a7a70b-3625-4794-b7df -> PT ETHOS MITRA NIAGA",
        "[INFO] Menyimpan rekapitulasi data ke E:\\FHI\\FHI 2026\\PPh\\Faktur Extractor V1.0\\Hasil Rekap Pajak.xlsx...",
        "[INFO] Sheet 'Pajak Masuk' tersimpan dengan 22 baris data terverifikasi.",
        "[INFO] Sheet 'Pajak Keluar' tersimpan dengan 8 baris data terverifikasi.",
        "[FINISH] Ekstraksi dan Rekapitulasi Selesai dalam 1.8 detik! Total 30 Berkas Pajak.",
        "[OFFLINE] 100% diproses secara lokal tanpa transmisi data sensitif ke cloud luar."
      ]);
      setIsProcessing(false);
      setIsCompleted(true);
      setActiveTab('excel');
    }, 1200);
  };

  const handleDownloadCsv = () => {
    const headers = "Nomor Faktur,Jenis Pajak,Lawan Transaksi,NPWP,DPP (Rp),PPN (Rp),Status\n";
    const rows = SAMPLE_RECORDS.map(r => 
      `"${r.nomor}","${r.jenis}","${r.lawanTransaksi}","${r.npwp}",${r.dpp},${r.ppn},"${r.status}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Hasil_Rekap_Pajak_Ethos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = SAMPLE_RECORDS.filter(r => {
    if (filterType === 'masuk') return r.jenis === 'Pajak Masuk';
    if (filterType === 'keluar') return r.jenis === 'Pajak Keluar';
    return true;
  });

  return (
    <div className="bg-[#0E1522] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header of Simulator */}
      <div className="px-5 py-3 bg-[#070A0F] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] inline-block" />
          <span className="text-sm font-semibold text-white tracking-wide">
            Simulator: Bupot & Faktur Extractor (Coretax)
          </span>
          <span className="text-xs text-slate-400">
            Internal Offline Tool · Python CLI Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-[#0B0F17] border border-white/[0.08] rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeTab === 'terminal' ? 'bg-[#131D2E] text-white shadow-sm border border-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Terminal Console
            </button>
            <button
              onClick={() => setActiveTab('excel')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeTab === 'excel' ? 'bg-[#131D2E] text-white shadow-sm border border-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Preview Excel
            </button>
          </div>

          <button
            onClick={runExtraction}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#38BDF8] via-[#289CD7] to-[#0284C7] hover:brightness-110 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all shadow-[0_0_15px_rgba(40,156,215,0.3)]"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Mengekstrak PDF...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Simulasikan Ekstraksi (30 PDF)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulator Body */}
      {activeTab === 'terminal' ? (
        <div className="terminal-window p-4 bg-[#070A0F] font-mono text-xs leading-relaxed h-80 overflow-y-auto border-b border-white/[0.08]">
          <div className="text-slate-500 mb-2">
            Ethos Tax Automation CLI [Version 1.0.4] · Keamanan Data Finansial Terjamin
          </div>
          {logs.map((log, idx) => {
            const isSuccess = log.includes("[SUCCESS]");
            const isInfo = log.includes("[INFO]");
            const isFinish = log.includes("[FINISH]");
            const isOffline = log.includes("[OFFLINE]");

            return (
              <div
                key={idx}
                className={`py-0.5 ${
                  isSuccess
                    ? "text-emerald-400"
                    : isFinish
                    ? "text-amber-300 font-semibold"
                    : isOffline
                    ? "text-[#38BDF8]"
                    : isInfo
                    ? "text-[#289CD7]"
                    : "text-slate-300"
                }`}
              >
                {log}
              </div>
            );
          })}
          {isProcessing && (
            <div className="text-[#38BDF8] animate-pulse mt-2">
              &gt; Mengurai token XML/PDF struktur faktur masukan...
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 bg-[#0B0F17]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter Data:</span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  filterType === 'all' ? 'bg-[#131D2E] text-white border border-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Semua (30)
              </button>
              <button
                onClick={() => setFilterType('masuk')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  filterType === 'masuk' ? 'bg-[#131D2E] text-white border border-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pajak Masuk (22)
              </button>
              <button
                onClick={() => setFilterType('keluar')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  filterType === 'keluar' ? 'bg-[#131D2E] text-white border border-white/[0.08]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pajak Keluar (8)
              </button>
            </div>

            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh Hasil Rekap Pajak.xlsx
            </button>
          </div>

          <div className="overflow-x-auto border border-white/[0.08] rounded-lg">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070A0F] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th className="px-3 py-2.5">Nomor Faktur / Bupot</th>
                  <th className="px-3 py-2.5">Jenis</th>
                  <th className="px-3 py-2.5">Lawan Transaksi</th>
                  <th className="px-3 py-2.5">NPWP</th>
                  <th className="px-3 py-2.5 text-right">DPP (Rp)</th>
                  <th className="px-3 py-2.5 text-right">PPN 11% (Rp)</th>
                  <th className="px-3 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] font-mono">
                {filteredRecords.map((item, i) => (
                  <tr key={i} className="hover:bg-[#131D2E]/50 transition-colors">
                    <td className="px-3 py-2 text-white font-medium">{item.nomor}</td>
                    <td className="px-3 py-2">
                      <span className={item.jenis === 'Pajak Masuk' ? 'text-[#38BDF8]' : 'text-amber-400'}>
                        {item.jenis}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-sans text-slate-200">{item.lawanTransaksi}</td>
                    <td className="px-3 py-2 text-slate-400">{item.npwp}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{item.dpp.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-emerald-400 font-semibold">
                      {item.ppn.toLocaleString('id-ID')}
                    </td>
                    <td className="px-3 py-2 font-sans">
                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle className="w-3 h-3" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Simulator Footer Status */}
      <div className="px-4 py-2.5 bg-[#070A0F] border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span>Inisiasi Awal: <strong className="text-white">&lt; 1 Jam</strong></span>
          <span>·</span>
          <span>Zero IT Backlog: <strong className="text-white">0 Story Points</strong></span>
          <span>·</span>
          <span>Keamanan Data: <strong className="text-emerald-400">Zero Data Leak (100% Offline)</strong></span>
        </div>
        <div className="text-slate-400">
          Dampak: <span className="text-[#38BDF8] font-medium">Efisiensi SLA Tim Tax &amp; Masuk 3 Besar Tim Finance</span>
        </div>
      </div>
    </div>
  );
}
