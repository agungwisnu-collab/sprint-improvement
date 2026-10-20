import { useState } from 'react';
import { PORTFOLIO_PROJECTS, OTHER_TOOLS_CATALOG } from '../data/presentationData';
import { MeethosSimulator } from './simulators/MeethosSimulator';
import { LinkEthosSimulator } from './simulators/LinkEthosSimulator';
import { BupotExtractorSimulator } from './simulators/BupotExtractorSimulator';
import { PayslipConverterSimulator } from './simulators/PayslipConverterSimulator';
import { Search, FolderGit2, CheckCircle2, Terminal, Layers } from 'lucide-react';

export function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState<string>('meethos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepoCategory, setSelectedRepoCategory] = useState<string>('All');

  const activeProject = PORTFOLIO_PROJECTS.find(p => p.id === activeTab);
  const categories = ['All', ...Array.from(new Set(OTHER_TOOLS_CATALOG.map(t => t.category)))];

  const filteredRepos = OTHER_TOOLS_CATALOG.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedRepoCategory === 'All' || item.category === selectedRepoCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Refined Segmented Control for the 4 primary systems + the repository catalog */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/[0.08]">
        {PORTFOLIO_PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveTab(project.id)}
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === project.id
                ? 'bg-[#289CD7] text-white shadow-md shadow-[#289CD7]/25 font-bold border border-[#38BDF8]/40'
                : 'bg-[#0E1522]/90 text-slate-300 hover:text-white hover:bg-[#131D2E] border border-white/[0.08]'
            }`}
          >
            <span>{project.name.split(' (')[0]}</span>
            <span className="text-[10px] font-mono opacity-80">{project.category}</span>
          </button>
        ))}

        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-slate-100 text-slate-950 font-bold shadow-md'
              : 'bg-[#0E1522]/90 text-slate-300 hover:text-white hover:bg-[#131D2E] border border-white/[0.08]'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Katalog Inisiatif Mikro</span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
            activeTab === 'catalog'
              ? 'bg-slate-900 text-white border border-slate-700 shadow-xs'
              : 'bg-[#289CD7]/20 text-[#38BDF8] border border-[#289CD7]/40 shadow-xs'
          }`}>
            {OTHER_TOOLS_CATALOG.length} Repo
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab !== 'catalog' && activeProject ? (
        <div className="space-y-6">
          {/* Project Summary Banner */}
          <div className="bg-[#0E1522]/90 border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-xl hover:border-[#289CD7]/30 transition-all">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-mono text-[#38BDF8] mb-1">
                  {activeProject.category} · {activeProject.domain}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeProject.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 border border-white/[0.08] rounded-xl text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Lead Time Pengerjaan:</span>
                <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">
                  {activeProject.builtIn}
                </span>
              </div>
            </div>

            {/* Business Need vs Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
              <div className="p-4 bg-slate-950/70 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
                  Tantangan Operasional / Business Need:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProject.businessNeed}
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-white/[0.06]">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
                  Fitur Unggulan Sistem:
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {activeProject.keyFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Impact Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/[0.06]">
              {activeProject.impactMetrics.map((metric, mIdx) => (
                <div key={mIdx} className="p-3.5 bg-slate-950/80 rounded-xl border border-white/[0.06] hover:border-[#289CD7]/30 transition-all">
                  <div className="text-[11px] text-slate-400 font-mono">{metric.label}</div>
                  <div className="text-base font-bold text-white font-mono mt-1 tabular-nums">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Working Simulator */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
                Live Working Simulator / Production Preview
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Interaktif · Uji coba alur kerja
              </span>
            </div>

            {activeTab === 'meethos' && <MeethosSimulator />}
            {activeTab === 'link-ethos' && <LinkEthosSimulator />}
            {activeTab === 'bupot-extractor' && <BupotExtractorSimulator />}
            {activeTab === 'payslip-converter' && <PayslipConverterSimulator />}
          </div>
        </div>
      ) : (
        /* Micro-tools catalog */
        <div className="space-y-4">
          <div className="bg-[#0E1420] border border-white/[0.08] rounded-2xl p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Katalog Inisiatif Mikro &amp; Repositori Solusi Mandiri
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Bukti nyata kemampuan BA membangun puluhan micro-tools fungsional tanpa membebani developer IT
                </p>
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari repositori / fungsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-6">
              {categories.map((cat, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => setSelectedRepoCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-mono ${
                    selectedRepoCategory === cat
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-white/[0.08]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Repositories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
              {filteredRepos.map((repo, rIdx) => (
                <div
                  key={rIdx}
                  className="p-4 bg-slate-950/70 border border-white/[0.08] hover:border-slate-600 rounded-xl transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-blue-400 group-hover:text-blue-300 truncate">
                        {repo.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0 px-2 py-0.5 rounded bg-[#111827] border border-white/[0.06]">
                        {repo.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Internal Tool</span>
                    <span className="text-emerald-400 font-medium">Status: Aktif</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Menampilkan {filteredRepos.length} dari {OTHER_TOOLS_CATALOG.length} micro-tools</span>
              <span>100% Dibangun mandiri oleh Business Analyst</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
