import { useState } from 'react';
import { UploadCloud, Check, ArrowRight, Download, FileSpreadsheet, RefreshCw } from 'lucide-react';

interface MappingRule {
  kolomInput: string;
  kodeOutput: string;
  keterangan: string;
  contohNilai: string;
}

const MAPPING_RULES: MappingRule[] = [
  { kolomInput: "GP NEW", kodeOutput: "BASIC", keterangan: "Gaji pokok karyawan. Digunakan jika Total Gaji Proporsional kosong atau nol.", contohNilai: "5.500.000" },
  { kolomInput: "TOTAL GAJI PROPORSIONAL", kodeOutput: "BASIC", keterangan: "Gaji proporsional (untuk karyawan belum genap 1 bulan). Menggantikan GP NEW.", contohNilai: "7.000.000" },
  { kolomInput: "T. JABATAN", kodeOutput: "ALW1", keterangan: "Tunjangan berdasarkan jabatan karyawan", contohNilai: "1.000.000" },
  { kolomInput: "T. KEHADIRAN", kodeOutput: "ALW2", keterangan: "Tunjangan berdasarkan presensi kehadiran karyawan", contohNilai: "500.000" },
  { kolomInput: "T. PROFESI", kodeOutput: "ALW3", keterangan: "Tunjangan berdasarkan bidang profesi spesialis", contohNilai: "500.000" },
  { kolomInput: "T. CASTING", kodeOutput: "ALW6", keterangan: "Tunjangan casting talent internal", contohNilai: "0" },
  { kolomInput: "T. PENUGASAN", kodeOutput: "ALW7", keterangan: "Tunjangan penugasan khusus di luar jobdesk", contohNilai: "1.200.000" },
  { kolomInput: "T. BEBAN KERJA", kodeOutput: "PPH21_TER_ALW", keterangan: "Tunjangan beban kerja, termasuk perhitungan PPh 21", contohNilai: "0" },
  { kolomInput: "LEMBUR", kodeOutput: "OVT", keterangan: "Upah lembur berdasarkan jam kerja lembur disetujui", contohNilai: "200.000" },
  { kolomInput: "BONUS SALES (Rp)", kodeOutput: "BONUS", keterangan: "Bonus penjualan berdasarkan pencapaian target komersial", contohNilai: "1.500.000" },
  { kolomInput: "BPJS KESEHATAN", kodeOutput: "BPJS_KES_EMP", keterangan: "Iuran BPJS Kesehatan bagian karyawan", contohNilai: "250.000" },
  { kolomInput: "BPJS TK PPU", kodeOutput: "BPTK", keterangan: "Iuran BPJS Ketenagakerjaan untuk Penerima Upah", contohNilai: "350.000" }
];

interface SampleRow {
  nik: string;
  nama: string;
  jabatan: string;
  basic: number;
  alw1: number;
  alw2: number;
  alw7: number;
  bonus: number;
  ovt: number;
  bpjsKes: number;
  bpjsTk: number;
  netPayroll: number;
}

const SAMPLE_CONVERTED: SampleRow[] = [
  { nik: "ETH-202401", nama: "Dimas Suryo", jabatan: "Business Analyst", basic: 7000000, alw1: 1200000, alw2: 500000, alw7: 1000000, bonus: 0, ovt: 250000, bpjsKes: 250000, bpjsTk: 350000, netPayroll: 9350000 },
  { nik: "ETH-202402", nama: "Anisa Rahma", jabatan: "Tax Officer", basic: 6200000, alw1: 800000, alw2: 500000, alw7: 500000, bonus: 500000, ovt: 400000, bpjsKes: 250000, bpjsTk: 350000, netPayroll: 8300000 },
  { nik: "ETH-202403", nama: "Fajar Pratama", jabatan: "Sales Executive", basic: 5500000, alw1: 500000, alw2: 500000, alw7: 0, bonus: 3500000, ovt: 0, bpjsKes: 250000, bpjsTk: 350000, netPayroll: 9400000 },
  { nik: "ETH-202404", nama: "Siti Nurhaliza", jabatan: "Operational Support", basic: 5200000, alw1: 400000, alw2: 500000, alw7: 300000, bonus: 0, ovt: 150000, bpjsKes: 250000, bpjsTk: 350000, netPayroll: 5950000 }
];

export function PayslipConverterSimulator() {
  const [isConverted, setIsConverted] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'rules'>('preview');

  const handleSimulateConvert = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsConverted(true);
      setActiveTab('preview');
    }, 600);
  };

  const handleDownloadHashmicroFormat = () => {
    const headers = "EMPLOYEE_ID,EMPLOYEE_NAME,JOB_POSITION,BASIC,ALW1,ALW2,ALW7,BONUS,OVT,BPJS_KES_EMP,BPTK,TOTAL_NETT\n";
    const rows = SAMPLE_CONVERTED.map(r => 
      `"${r.nik}","${r.nama}","${r.jabatan}",${r.basic},${r.alw1},${r.alw2},${r.alw7},${r.bonus},${r.ovt},${r.bpjsKes},${r.bpjsTk},${r.netPayroll}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Import_Hashmicro_HC_Payroll.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white">
            Payslip Converter · Normalisasi ke Hashmicro Human Capital
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Zero Human Error · Selesai dalam 1 Hari Kerja
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 border border-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'preview' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hasil Normalisasi HC
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'rules' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Matriks Mapping Kode (ERP)
            </button>
          </div>

          <button
            onClick={handleSimulateConvert}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Mengonversi...
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5" />
                Simulasikan Upload Draft
              </>
            )}
          </button>
        </div>
      </div>

      {/* Body */}
      {activeTab === 'preview' ? (
        <div className="p-4 bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" /> File Draft Payroll Terbaca
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">4 Karyawan · Siap Diimpor ke Hashmicro HC</span>
            </div>

            <button
              onClick={handleDownloadHashmicroFormat}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Template Siap Import HC (.csv)
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-medium">
                <tr>
                  <th className="px-3 py-2">NIK</th>
                  <th className="px-3 py-2">Nama Karyawan</th>
                  <th className="px-3 py-2">Jabatan</th>
                  <th className="px-3 py-2 text-right">BASIC</th>
                  <th className="px-3 py-2 text-right">ALW1 (Jab)</th>
                  <th className="px-3 py-2 text-right">ALW2 (Hadir)</th>
                  <th className="px-3 py-2 text-right">ALW7 (Tugas)</th>
                  <th className="px-3 py-2 text-right">BONUS</th>
                  <th className="px-3 py-2 text-right">OVT (Lembur)</th>
                  <th className="px-3 py-2 text-right">BPJS KES</th>
                  <th className="px-3 py-2 text-right">BPTK</th>
                  <th className="px-3 py-2 text-right text-emerald-400 font-semibold">Total Nett</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {SAMPLE_CONVERTED.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50">
                    <td className="px-3 py-2 text-white font-medium">{row.nik}</td>
                    <td className="px-3 py-2 font-sans text-slate-200">{row.nama}</td>
                    <td className="px-3 py-2 font-sans text-slate-400">{row.jabatan}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.basic.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.alw1.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.alw2.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.alw7.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.bonus.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.ovt.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-rose-400">-{row.bpjsKes.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-rose-400">-{row.bpjsTk.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-emerald-400 font-bold">
                      Rp {row.netPayroll.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-950 max-h-80 overflow-y-auto">
          <div className="text-xs text-slate-400 mb-3">
            Matriks Aturan Pengisian Draft Payroll → Standar Kode Impor Hashmicro HC ERP:
          </div>
          <div className="space-y-2">
            {MAPPING_RULES.map((rule, idx) => (
              <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-medium text-slate-200">{rule.kolomInput}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    {rule.kodeOutput}
                  </span>
                </div>
                <div className="text-slate-400 text-right max-w-md">
                  {rule.keterangan}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div>
          Sebelumnya: Membutuhkan pencocokan manual kolom satu per satu setiap bulan.
        </div>
        <div className="text-emerald-400 font-medium">
          Solusi: Sekali drag-and-drop &gt; Siap upload ke modul Hashmicro HC
        </div>
      </div>
    </div>
  );
}
