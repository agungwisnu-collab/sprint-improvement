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
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header of Simulator */}
      <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span className="text-sm font-semibold text-white tracking-wide">
            Simulator: Bupot & Faktur Extractor (Coretax)
          </span>
          <span className="text-xs text-slate-400">
            Internal Offline Tool · Python CLI Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 border border-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'terminal' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Terminal Console
            </button>
            <button
              onClick={() => setActiveTab('excel')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'excel' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Preview Excel
            </button>
          </div>

          <button
            onClick={runExtraction}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
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
        <div className="p-4 bg-slate-950 font-mono text-xs leading-relaxed h-80 overflow-y-auto">
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
                    ? "text-cyan-400"
                    : isInfo
                    ? "text-blue-400"
                    : "text-slate-300"
                }`}
              >
                {log}
              </div>
            );
          })}
          {isProcessing && (
            <div className="text-blue-400 animate-pulse mt-2">
              &gt; Mengurai token XML/PDF struktur faktur masukan...
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter Data:</span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 text-xs rounded-md ${
                  filterType === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Semua (30)
              </button>
              <button
                onClick={() => setFilterType('masuk')}
                className={`px-2.5 py-1 text-xs rounded-md ${
                  filterType === 'masuk' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pajak Masuk (22)
              </button>
              <button
                onClick={() => setFilterType('keluar')}
                className={`px-2.5 py-1 text-xs rounded-md ${
                  filterType === 'keluar' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pajak Keluar (8)
              </button>
            </div>

            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh Hasil Rekap Pajak.xlsx
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-medium">
                <tr>
                  <th className="px-3 py-2">Nomor Faktur / Bupot</th>
                  <th className="px-3 py-2">Jenis</th>
                  <th className="px-3 py-2">Lawan Transaksi</th>
                  <th className="px-3 py-2">NPWP</th>
                  <th className="px-3 py-2 text-right">DPP (Rp)</th>
                  <th className="px-3 py-2 text-right">PPN 11% (Rp)</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {filteredRecords.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-800/50">
                    <td className="px-3 py-2 text-white font-medium">{item.nomor}</td>
                    <td className="px-3 py-2">
                      <span className={item.jenis === 'Pajak Masuk' ? 'text-blue-400' : 'text-amber-400'}>
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
                      <span className="text-emerald-400 flex items-center gap-1">
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
      <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span>Inisiasi Awal: <strong>&lt; 1 Jam</strong></span>
          <span>·</span>
          <span>Zero IT Backlog: <strong>0 Story Points</strong></span>
          <span>·</span>
          <span>Keamanan Data: <strong>Zero Data Leak (100% Offline)</strong></span>
        </div>
        <div className="text-slate-400">
          Dampak: Efisiensi SLA Tim Tax &amp; Masuk 3 Besar Tim Finance
        </div>
      </div>
    </div>
  );
}
