import { useState } from 'react';
import { Link2, Copy, Check, Globe, Smartphone, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { LinkEthosLogo, LinkEthosIcon } from '../logo';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface LinkItem {
  id: string;
  slug: string;
  originalUrl: string;
  clicks: number;
  created: string;
}

const INITIAL_LINKS: LinkItem[] = [
  { id: "1", slug: "JobFairEthos", originalUrl: "https://careers.ethos.co.id/events/2026-batch-5", clicks: 1856, created: "18 Sep 2026" },
  { id: "2", slug: "StandUpImprovement", originalUrl: "https://ethos.co.id/internal/stand-up-batch-5", clicks: 942, created: "23 Sep 2026" },
  { id: "3", slug: "KatalogProduk2026", originalUrl: "https://drive.google.com/corp/katalog-resmi", clicks: 1120, created: "28 Sep 2026" },
  { id: "4", slug: "FormFeedbackHR", originalUrl: "https://forms.ethos.co.id/hc-satisfaction", clicks: 732, created: "05 Okt 2026" }
];

export function LinkEthosSimulator() {
  const [links, setLinks] = useState<LinkItem[]>(INITIAL_LINKS);
  const [customSlug, setCustomSlug] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [createdNotice, setCreatedNotice] = useState<string | null>(null);

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    const slug = customSlug.trim() || `link-${Math.random().toString(36).substring(2, 7)}`;
    const newLink: LinkItem = {
      id: String(Date.now()),
      slug: slug,
      originalUrl: targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`,
      clicks: 1,
      created: "Hari ini"
    };

    setLinks([newLink, ...links]);
    setCreatedNotice(`Tautan berhasil dibuat: link.ethos.co.id/${slug}`);
    setCustomSlug('');
    setTargetUrl('');

    setTimeout(() => {
      setCreatedNotice(null);
    }, 4000);
  };

  const handleCopy = (slug: string, id: string) => {
    navigator.clipboard.writeText(`https://link.ethos.co.id/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header bar with Official Link Ethos Branding */}
      <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <LinkEthosLogo size="sm" subtitle="Official Shortlink & Bio Pages System" />
          <Badge variant="default" className="text-[10px] hidden sm:inline-flex">
            Bebas Malware &amp; Iklan
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Domain Resmi Terverifikasi
          </span>
          <span>·</span>
          <span className="font-mono text-slate-300">link.ethos.co.id</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-800 bg-slate-950/60 border-b border-slate-800">
        <div className="p-4">
          <div className="text-xs text-slate-400">Total Trafik Periode</div>
          <div className="text-xl font-bold text-white font-mono mt-1">4.650</div>
          <div className="text-xs text-slate-500 mt-0.5">4.633 klik link · 17 bio views</div>
        </div>
        <div className="p-4">
          <div className="text-xs text-slate-400">Pengunjung Unik</div>
          <div className="text-xl font-bold text-white font-mono mt-1">2.256</div>
          <div className="text-xs text-slate-500 mt-0.5">Alamat IP terisolasi aman</div>
        </div>
        <div className="p-4">
          <div className="text-xs text-slate-400">Perangkat Utama</div>
          <div className="text-xl font-bold text-blue-400 font-mono mt-1">56% Mobile</div>
          <div className="text-xs text-slate-500 mt-0.5">43% Desktop PC · 1% Tablet</div>
        </div>
        <div className="p-4">
          <div className="text-xs text-slate-400">Top Performer</div>
          <div className="text-base font-bold text-emerald-400 font-mono mt-1 truncate">/JobFairEthos</div>
          <div className="text-xs text-slate-500 mt-0.5">1.856 total kunjungan</div>
        </div>
      </div>

      {/* Body: Form + List */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Create Link */}
        <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-blue-400" /> Buat Shortlink Resmi Baru
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            Menggunakan subdomain resmi Ethos Group untuk menjaga citra profesional dan keamanan tautan.
          </p>

          <form onSubmit={handleCreateLink} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                URL Tujuan / Berkas Panjang
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/file/d/1aB2c3... atau halaman event"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Kustom Tautan (Slug Resmi)
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-slate-800 border border-r-0 border-slate-700 rounded-l-lg text-xs text-slate-400 font-mono">
                  link.ethos.co.id/
                </span>
                <input
                  type="text"
                  placeholder="NamaAcara-2026"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-r-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#289CD7] hover:bg-[#2083B6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm border border-[#38BDF8]/30 cursor-pointer"
            >
              <Link2 className="w-3.5 h-3.5" />
              Buat Tautan Resmi
            </button>

            {createdNotice && (
              <div className="p-2.5 bg-emerald-950/70 border border-emerald-800/60 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{createdNotice}</span>
              </div>
            )}
          </form>
        </div>

        {/* Right List: Active Links */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Tautan Aktif &amp; Statistik Klik
            </h4>
            <span className="text-xs text-slate-500">{links.length} Tautan Terdaftar</span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto">
            {links.map((link) => (
              <div
                key={link.id}
                className="p-3 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-xl transition-colors flex flex-wrap items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-400">
                      link.ethos.co.id/{link.slug}
                    </span>
                    <button
                      onClick={() => handleCopy(link.slug, link.id)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                      title="Salin Link"
                    >
                      {copiedId === link.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="text-xs text-slate-400 truncate mt-0.5">
                    {link.originalUrl}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <div className="text-right">
                    <div className="text-white font-bold tabular-nums">{link.clicks.toLocaleString('id-ID')}</div>
                    <div className="text-slate-500 text-[10px]">Klik Trafik</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div>
          Keresahan Sebelumnya: Bitly gratis menyisipkan iklan &amp; acesse.one berisiko malware eksternal.
        </div>
        <div className="text-blue-400 font-medium">
          Dampak: Peningkatan kepercayaan brand perusahaan di setiap tautan promosi &amp; operasional.
        </div>
      </div>
    </div>
  );
}
