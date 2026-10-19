"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LinkEthosLogo, LinkEthosIcon } from "@/components/logo";
import {
  Compass,
  Layers,
  Sparkles,
  Palette,
  Type,
  Maximize2,
  Check,
  Copy,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  PenTool,
  UploadCloud,
  FileSpreadsheet,
  Printer,
  GraduationCap,
  Award,
  Download,
  Trash2,
  Edit3,
  Eye,
  Star,
  ExternalLink,
  ArrowRight,
  Sun,
  Moon,
  Laptop,
  Share2,
  Paperclip,
  Bookmark,
  FileText,
  RotateCcw,
  Sliders,
  Shield,
  LayoutDashboard,
  Smartphone,
  BookOpen,
  BarChart3,
  TrendingUp,
  Activity,
  Monitor,
  Tablet,
  Globe,
  MousePointerClick,
} from "lucide-react";

export function AtomicDesignView() {
  const [activeTab, setActiveTab] = useState<"all" | "tokens" | "atoms" | "molecules" | "organisms" | "charts" | "templates">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Interactive Chart States & Datasets
  const [chartMetric, setChartMetric] = useState<"all" | "links" | "pages">("all");
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);

  const sampleTrendData = [
    { date: "01/10", label: "1 Okt", all: 120, links: 85, pages: 35 },
    { date: "02/10", label: "2 Okt", all: 180, links: 110, pages: 70 },
    { date: "03/10", label: "3 Okt", all: 150, links: 95, pages: 55 },
    { date: "04/10", label: "4 Okt", all: 240, links: 160, pages: 80 },
    { date: "05/10", label: "5 Okt", all: 310, links: 200, pages: 110 },
    { date: "06/10", label: "6 Okt", all: 280, links: 175, pages: 105 },
    { date: "07/10", label: "7 Okt", all: 390, links: 250, pages: 140 },
    { date: "08/10", label: "8 Okt", all: 450, links: 290, pages: 160 },
    { date: "09/10", label: "9 Okt", all: 410, links: 260, pages: 150 },
    { date: "10/10", label: "10 Okt", all: 520, links: 330, pages: 190 },
    { date: "11/10", label: "11 Okt", all: 480, links: 310, pages: 170 },
    { date: "12/10", label: "12 Okt", all: 590, links: 380, pages: 210 },
    { date: "13/10", label: "13 Okt", all: 650, links: 420, pages: 230 },
    { date: "14/10", label: "Hari ini", all: 720, links: 460, pages: 260 },
  ];

  const sample30DayBars = [
    12, 18, 25, 20, 34, 45, 40, 52, 60, 55, 70, 68, 85, 92, 78,
    88, 95, 110, 105, 120, 135, 128, 142, 155, 148, 160, 175, 190, 210, 240,
  ];

  // Interactive Atom States
  const [sampleInputVal, setSampleInputVal] = useState("Link Ethos Design System");
  const [sliderVal, setSliderVal] = useState(70);
  const [starRating, setStarRating] = useState(4);
  const [selectedRadio, setSelectedRadio] = useState("option-b");
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({
    opt1: true,
    opt2: false,
    opt3: true,
  });

  // Interactive Quiz Option State
  const [isAnswerKeyActive, setIsAnswerKeyActive] = useState(true);

  // Signature Canvas Atom State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Canvas drawing handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0f172a";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    toast.info("Kanvas tanda tangan telah dibersihkan");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    toast.success(`${label} berhasil disalin ke clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filter sections by search query
  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 selection:bg-primary/20">
      {/* Top Header & Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2">
              <LinkEthosLogo size="md" />
            </Link>
            <Separator orientation="vertical" className="h-5 hidden sm:block" />
            <Badge variant="outline" className="hidden sm:inline-flex gap-1.5 px-2.5 py-0.5 bg-primary/5 text-primary border-primary/20 text-xs font-semibold">
              <Layers className="size-3.5" /> Atomic Design System
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Cari komponen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 text-xs rounded-xl"
              />
            </div>
            <Link href="/panduan">
              <Button variant="ghost" size="sm" className="text-xs gap-1.5 hidden md:inline-flex">
                <BookOpen className="size-3.5" /> Panduan
              </Button>
            </Link>
            <Link href="/forms">
              <Button size="sm" className="text-xs gap-1.5 shadow-xs">
                <LayoutDashboard className="size-3.5" /> Buka App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-background to-background py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-background/80 shadow-2xs text-xs font-medium text-primary">
            <Sparkles className="size-3.5 text-primary" />
            <span>Dokumentasi Sistem Desain UI/UX Resmi</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Atomic Design & Style Guide <span className="text-primary">Link Ethos</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Spesifikasi modular antarmuka aplikasi dari tingkatan Design Tokens, Atoms, Molecules, Organisms, hingga Templates sesuai prinsip Brad Frost.
          </p>

          {/* Atomic Hierarchy Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
            {[
              { id: "all", label: "Semua Level", icon: Compass },
              { id: "tokens", label: "0. Tokens & Gaya", icon: Palette },
              { id: "atoms", label: "1. Atoms (Dasar)", icon: Sparkles },
              { id: "molecules", label: "2. Molecules (Kombinasi)", icon: Layers },
              { id: "organisms", label: "3. Organisms (Modul)", icon: Bookmark },
              { id: "charts", label: "4. Charts & Grafis", icon: BarChart3 },
              { id: "templates", label: "5. Templates (Layout)", icon: Smartphone },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-card text-muted-foreground border-border/70 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 max-w-7xl mt-10 space-y-16">
        {/* ========================================================= */}
        {/* LEVEL 0: DESIGN TOKENS & FOUNDATIONS */}
        {/* ========================================================= */}
        {(activeTab === "all" || activeTab === "tokens") && matchesSearch("token color typography palet warna") && (
          <section id="tokens" className="space-y-6 scroll-mt-20">
            <div className="border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Palette className="size-4" /> Level 0: Design Tokens
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mt-1">
                Warna Semantik & Tipografi
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Fundamen token warna OKLCH, identitas brand Link Ethos, dan skala tipografi terpadu.
              </p>
            </div>

            {/* Brand & Palette Cards */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground">Palet Warna Semantik (Light / Dark)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { name: "Brand Cyan", val: "#289CD7", class: "bg-[#289CD7] text-white", desc: "Aksen Resmi Ethos" },
                  { name: "Primary", val: "oklch(0.205 0 0)", class: "bg-primary text-primary-foreground", desc: "Tombol & Aksi Utama" },
                  { name: "Foreground", val: "oklch(0.145 0 0)", class: "bg-foreground text-background", desc: "Teks Utama" },
                  { name: "Background", val: "oklch(1 0 0)", class: "bg-background text-foreground border border-border", desc: "Latar Kanvas" },
                  { name: "Card", val: "oklch(1 0 0)", class: "bg-card text-card-foreground border border-border", desc: "Kontainer Kartu" },
                  { name: "Muted", val: "oklch(0.97 0 0)", class: "bg-muted text-muted-foreground border border-border/50", desc: "Latar Sekunder" },
                  { name: "Border", val: "oklch(0.922 0 0)", class: "bg-border text-foreground", desc: "Garis Batas" },
                  { name: "Destructive", val: "oklch(0.577 0.245 27.325)", class: "bg-destructive text-white", desc: "Peringatan & Gagal" },
                  { name: "Success Emerald", val: "#10B981", class: "bg-emerald-600 text-white", desc: "Lulus & Terverifikasi" },
                  { name: "Warning Amber", val: "#F59E0B", class: "bg-amber-500 text-slate-900", desc: "Perhatian & KKM" },
                  { name: "Info Sky", val: "#0EA5E9", class: "bg-sky-500 text-white", desc: "Panduan & Tips" },
                  { name: "Purple Accent", val: "#8B5CF6", class: "bg-purple-600 text-white", desc: "Fitur Spesial" },
                ].map((color, i) => (
                  <div
                    key={i}
                    onClick={() => copyToClipboard(color.val, color.name)}
                    className="group rounded-xl border bg-card p-3 space-y-2 cursor-pointer hover:border-primary/50 transition-all shadow-2xs"
                  >
                    <div className={`h-12 w-full rounded-lg flex items-center justify-center font-mono text-[10px] font-bold ${color.class}`}>
                      {color.val.length > 10 ? color.val.substring(0, 10) + "..." : color.val}
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                        <span>{color.name}</span>
                        <Copy className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[10px] text-muted-foreground">{color.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Scale */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold text-foreground">Skala Tipografi (Geist Sans, Poppins & Mono)</h3>
              <Card className="p-5 rounded-2xl border divide-y divide-border/60 shadow-2xs bg-card">
                <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <span className="text-[11px] font-mono text-muted-foreground w-40 shrink-0">Display 1 (text-4xl/5xl)</span>
                  <span className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans">
                    Link Ethos All-in-One Platform
                  </span>
                </div>
                <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <span className="text-[11px] font-mono text-muted-foreground w-40 shrink-0">Heading 1 (text-2xl/3xl)</span>
                  <span className="text-2xl font-bold tracking-tight font-sans">
                    Formulir Kuis & Auto-Grading Berskor
                  </span>
                </div>
                <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <span className="text-[11px] font-mono text-muted-foreground w-40 shrink-0">Heading 2 (text-xl)</span>
                  <span className="text-xl font-bold tracking-tight font-sans">
                    Hasil Analitik & Rekapitulasi Responden
                  </span>
                </div>
                <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <span className="text-[11px] font-mono text-muted-foreground w-40 shrink-0">Heading 3 (text-base font-semibold)</span>
                  <span className="text-base font-semibold text-foreground font-sans">
                    Kriteria Ketuntasan Minimal (KKM) dan Pembahasan Soal
                  </span>
                </div>
                <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <span className="text-[11px] font-mono text-muted-foreground w-40 shrink-0">Body Regular (text-sm)</span>
                  <span className="text-sm text-foreground leading-relaxed font-sans">
                    Responden dapat mengisi formulir secara interaktif dengan dukungan pembubuhan tanda tangan elektronik sah.
                  </span>
                </div>
                <div className="py-2.5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <span className="text-[11px] font-mono text-muted-foreground w-40 shrink-0">Code / Mono (font-mono)</span>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded w-fit">
                    score: 95/100 | slug: /f/evaluasi-tim | status: LULUS
                  </span>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* LEVEL 1: ATOMS */}
        {/* ========================================================= */}
        {(activeTab === "all" || activeTab === "atoms") && matchesSearch("atom button tombol badge input canvas icon") && (
          <section id="atoms" className="space-y-8 scroll-mt-20">
            <div className="border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Sparkles className="size-4" /> Level 1: Atoms
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mt-1">
                Komponen Atomik Dasar
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Elemen UI terkecil yang tidak dapat dipecah lagi: Tombol, Badge, Input, Radio, Checkbox, Slider, dan Kanvas Tanda Tangan.
              </p>
            </div>

            {/* 1. Buttons Matrix */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">1.1 Button Variants & States</h3>
                <span className="text-[11px] text-muted-foreground font-mono">components/ui/button.tsx</span>
              </div>
              <Card className="p-5 rounded-2xl border bg-card shadow-2xs space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button variant="default" size="sm">Primary Default</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                  <Button variant="destructive" size="sm">Destructive</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                  <Button variant="link" size="sm">Link Style</Button>
                  <Button variant="default" size="sm" disabled>Disabled</Button>
                  <Button variant="default" size="sm" className="gap-1.5">
                    <Download className="size-3.5" /> Dengan Icon
                  </Button>
                  <Button variant="outline" size="icon" className="size-8">
                    <Printer className="size-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t">
                  <Button size="xs" variant="secondary">Extra Small (xs)</Button>
                  <Button size="sm" variant="secondary">Small (sm)</Button>
                  <Button size="default" variant="secondary">Default (md)</Button>
                  <Button size="lg" variant="secondary">Large (lg)</Button>
                </div>
              </Card>
            </div>

            {/* 1.2 Badges & Chips */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">1.2 Badges & Status Chips</h3>
                <span className="text-[11px] text-muted-foreground font-mono">components/ui/badge.tsx</span>
              </div>
              <Card className="p-5 rounded-2xl border bg-card shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">Default Badge</Badge>
                  <Badge variant="secondary">Secondary Tag</Badge>
                  <Badge variant="outline">Outline Tag</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  {/* Functional Status Badges */}
                  <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold gap-1">
                    <CheckCircle2 className="size-3" /> LULUS KUIS
                  </Badge>
                  <Badge className="bg-destructive/15 text-destructive border border-destructive/30 text-xs font-bold gap-1">
                    <XCircle className="size-3" /> BELUM LULUS
                  </Badge>
                  <Badge variant="outline" className="font-mono font-bold bg-muted/40 text-xs">
                    +50 Poin
                  </Badge>
                  <Badge className="bg-primary/10 text-primary border border-primary/20 font-mono text-[10px]">
                    ROLE: ADMIN
                  </Badge>
                </div>
              </Card>
            </div>

            {/* 1.3 Inputs & Interactive Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">1.3 Input Fields & Form Controls</h3>
                <span className="text-[11px] text-muted-foreground font-mono">Text, Select, Radio, Checkbox, Slider, Rating</span>
              </div>
              <Card className="p-5 rounded-2xl border bg-card shadow-2xs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Text Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Text Input (Live)</label>
                  <Input
                    value={sampleInputVal}
                    onChange={(e) => setSampleInputVal(e.target.value)}
                    placeholder="Ketik sesuatu..."
                    className="text-xs rounded-xl"
                  />
                  <span className="text-[10px] text-muted-foreground">Preview: {sampleInputVal}</span>
                </div>

                {/* Range Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Range Slider (Skala)</span>
                    <span className="font-mono text-primary font-bold">{sliderVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                  />
                </div>

                {/* Star Rating */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Star Rating Atom</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setStarRating(star)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star className={`size-5 ${star <= starRating ? "fill-amber-400 text-amber-500" : "text-muted/60"}`} />
                      </button>
                    ))}
                    <span className="text-xs font-mono ml-2 font-bold">{starRating} / 5</span>
                  </div>
                </div>

                {/* Checkbox Group */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Checkbox Atom (Multi-select)</label>
                  <div className="space-y-1.5">
                    {Object.keys(checkboxStates).map((key, i) => (
                      <label key={key} className="flex items-center gap-2 text-xs cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={checkboxStates[key]}
                          onChange={(e) => setCheckboxStates({ ...checkboxStates, [key]: e.target.checked })}
                          className="size-4 rounded accent-primary cursor-pointer"
                        />
                        <span>Pilihan Jawaban {i + 1}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Radio Group */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Radio Atom (Single-choice)</label>
                  <div className="space-y-1.5">
                    {["option-a", "option-b", "option-c"].map((val, idx) => (
                      <label key={val} className="flex items-center gap-2 text-xs cursor-pointer select-none">
                        <input
                          type="radio"
                          name="sample-radio"
                          value={val}
                          checked={selectedRadio === val}
                          onChange={(e) => setSelectedRadio(e.target.value)}
                          className="size-4 accent-primary cursor-pointer"
                        />
                        <span>Opsi Pilihan {String.fromCharCode(65 + idx)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* File Upload Atom */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Upload Berkas Dropzone</label>
                  <div className="border-2 border-dashed border-border/80 rounded-xl p-3 text-center bg-muted/20 hover:border-primary/50 transition-colors cursor-pointer">
                    <UploadCloud className="size-5 mx-auto text-primary mb-1" />
                    <span className="text-[11px] font-semibold text-foreground block">Pilih / Tarik Dokumen</span>
                    <span className="text-[9px] text-muted-foreground">PDF, PNG, JPG hingga 5MB</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 1.4 Interactive Signature Canvas Atom */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground">1.4 Digital Signature Canvas Atom</h3>
                  <Badge variant="outline" className="text-[10px] font-semibold text-primary">Interaktif Live</Badge>
                </div>
                <Button variant="outline" size="xs" onClick={clearCanvas} className="gap-1 text-xs">
                  <RotateCcw className="size-3" /> Bersihkan Kanvas
                </Button>
              </div>
              <Card className="p-4 rounded-2xl border bg-card shadow-2xs space-y-2">
                <p className="text-xs text-muted-foreground">
                  Cobalah membubuhkan tanda tangan menggunakan mouse atau layar sentuh pada kanvas berikut:
                </p>
                <div className="border rounded-xl bg-white p-1 overflow-hidden inline-block shadow-inner max-w-full">
                  <canvas
                    ref={canvasRef}
                    width={480}
                    height={160}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="touch-none cursor-crosshair bg-white max-w-full h-auto"
                  />
                </div>
                {hasSignature && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" /> Tanda tangan digital aktif terdeteksi
                  </p>
                )}
              </Card>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* LEVEL 2: MOLECULES */}
        {/* ========================================================= */}
        {(activeTab === "all" || activeTab === "molecules") && matchesSearch("molecule search quiz option header callout stat") && (
          <section id="molecules" className="space-y-8 scroll-mt-20">
            <div className="border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Layers className="size-4" /> Level 2: Molecules
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mt-1">
                Kombinasi Molekul Antarmuka
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Kombinasi beberapa atom yang bekerja bersama membentuk modul fungsional: Quiz Option Row, Question Header, Metric Card, Callout Box, dan Attachment Pill.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 2.1 Quiz Option Row Molecule */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground">2.1 Quiz Option Row Molecule</h3>
                  <span className="text-[10px] text-muted-foreground font-mono">Form Builder</span>
                </div>
                <Card className="p-4 rounded-xl border bg-card shadow-2xs space-y-3">
                  <div className="flex items-center gap-2.5 p-2 rounded-lg border bg-muted/20">
                    <input type="radio" checked={isAnswerKeyActive} readOnly className="size-4 accent-primary" />
                    <Input
                      defaultValue="Paris (Ibukota Prancis)"
                      className="text-xs h-8 bg-card flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setIsAnswerKeyActive(!isAnswerKeyActive)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border flex items-center gap-1 transition-all cursor-pointer ${
                        isAnswerKeyActive
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 shadow-2xs"
                          : "bg-muted text-muted-foreground border-transparent hover:text-foreground"
                      }`}
                    >
                      <CheckCircle2 className="size-3" />
                      <span>{isAnswerKeyActive ? "Kunci Benar ✓" : "Jadikan Kunci"}</span>
                    </button>
                    <Button variant="ghost" size="icon" className="size-7 text-muted-foreground">
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Klik tombol <strong>Kunci Benar</strong> di atas untuk menguji perpindahan status kunci jawaban secara langsung.
                  </p>
                </Card>
              </div>

              {/* 2.2 Question Header Molecule */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground">2.2 Question Card Header Molecule</h3>
                  <span className="text-[10px] text-muted-foreground font-mono">Form Builder</span>
                </div>
                <Card className="p-4 rounded-xl border bg-card shadow-2xs space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center font-mono">
                        1
                      </span>
                      <span className="text-xs font-bold text-foreground">Pilihan Ganda Soal Ujian</span>
                      <Badge variant="secondary" className="text-[10px]">Wajib</Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg border bg-muted/40 text-xs font-mono">
                        <span className="text-[10px] text-muted-foreground">Poin:</span>
                        <input
                          type="number"
                          defaultValue={50}
                          className="w-10 text-right font-bold bg-transparent text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-foreground font-medium pt-1">
                    Siapakah presiden pertama Republik Indonesia yang membacakan naskah Proklamasi?
                  </p>
                </Card>
              </div>

              {/* 2.3 Metric Stat Card Molecule */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground">2.3 Metric Stat Card Molecule</h3>
                  <span className="text-[10px] text-muted-foreground font-mono">Analytics / Responses</span>
                </div>
                <Card className="p-4 rounded-xl border bg-card shadow-2xs space-y-1">
                  <span className="text-xs text-muted-foreground font-medium">Tingkat Kelulusan Responden</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-foreground">87.5%</span>
                    <span className="text-xs text-muted-foreground">(28/32 Lulus)</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Standar KKM: <strong>70 Poin</strong>
                  </p>
                </Card>
              </div>

              {/* 2.4 File Attachment Pill Molecule */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground">2.4 File Attachment Pill Molecule</h3>
                  <span className="text-[10px] text-muted-foreground font-mono">Responses Modal</span>
                </div>
                <Card className="p-3.5 rounded-xl border bg-card shadow-2xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Paperclip className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate max-w-[180px]">
                        surat_pernyataan_pakta.pdf
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">1.4 MB • PDF Document</p>
                    </div>
                  </div>
                  <Button size="xs" variant="outline" className="gap-1 text-xs shrink-0 text-primary">
                    <Download className="size-3" /> Unduh
                  </Button>
                </Card>
              </div>
            </div>

            {/* 2.5 Callout Box Variants */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground">2.5 Callout Information Box Variants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300">
                  <Info className="size-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Info Callout</p>
                    <p className="text-[11px] opacity-90 leading-relaxed">Petunjuk pengisian atau konteks formulir.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Success Callout</p>
                    <p className="text-[11px] opacity-90 leading-relaxed">Pengiriman formulir atau verifikasi berhasil.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Warning Callout</p>
                    <p className="text-[11px] opacity-90 leading-relaxed">Peringatan batas tanggal atau standar KKM.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Destructive Callout</p>
                    <p className="text-[11px] opacity-90 leading-relaxed">Kesalahan input data atau kegagalan sistem.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* LEVEL 3: ORGANISMS */}
        {/* ========================================================= */}
        {(activeTab === "all" || activeTab === "organisms") && matchesSearch("organism evaluator table section header printable") && (
          <section id="organisms" className="space-y-8 scroll-mt-20">
            <div className="border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Bookmark className="size-4" /> Level 3: Organisms
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mt-1">
                Organisme & Modul Antarmuka Kompleks
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Kombinasi molekul dan atom yang membentuk bagian fungsional utuh: Quiz Evaluator Banner, Form Section Header, Data Table, dan Printable Document Layout.
              </p>
            </div>

            {/* 3.1 Quiz Score Evaluator Banner Organism */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">3.1 Quiz Score Evaluator Banner Organism</h3>
                <span className="text-[10px] text-muted-foreground font-mono">Public Form / Detail Respon Modal</span>
              </div>
              <Card className="p-5 rounded-2xl border bg-card shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                      <Award className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Hasil Evaluasi Kuis & Ujian</h4>
                      <p className="text-[11px] text-muted-foreground">Penilaian otomatis oleh sistem Link Ethos</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1">
                    LULUS
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-2 border-t text-center">
                  <div className="p-2.5 rounded-xl bg-muted/40">
                    <span className="text-[10px] text-muted-foreground font-medium block">Perolehan Nilai</span>
                    <span className="text-lg font-bold font-mono text-foreground">90 / 100</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/40">
                    <span className="text-[10px] text-muted-foreground font-medium block">Persentase</span>
                    <span className="text-lg font-bold font-mono text-foreground">90%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/40">
                    <span className="text-[10px] text-muted-foreground font-medium block">Standar KKM</span>
                    <span className="text-lg font-bold font-mono text-foreground">70 Poin</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 3.2 Form Section Header Organism */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">3.2 Form Section Header Organism</h3>
                <span className="text-[10px] text-muted-foreground font-mono">Form Canvas Layout</span>
              </div>
              <div className="rounded-xl border bg-card overflow-hidden shadow-2xs">
                <div className="h-1 bg-gradient-to-r from-primary via-primary/70 to-primary/20" />
                <div className="p-4 space-y-1 bg-primary/5">
                  <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold uppercase tracking-wider">
                    <Bookmark className="size-3.5" /> Bagian 2 dari 3
                  </div>
                  <h4 className="font-bold text-base text-foreground">
                    Pakta Integritas & Pernyataan Kepatuhan GCG
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Mohon membaca dengan saksama seluruh klausul kepatuhan sebelum membubuhkan tanda tangan elektronik resmi di bawah ini.
                  </p>
                </div>
              </div>
            </div>

            {/* 3.3 Printable PDF Header Organism */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">3.3 Printable Document Letterhead Organism</h3>
                <span className="text-[10px] text-muted-foreground font-mono">Cetak / Simpan PDF Lembar Jawaban</span>
              </div>
              <Card className="p-5 rounded-2xl border bg-card shadow-xs space-y-3">
                <div className="flex items-start justify-between border-b-2 border-primary/40 pb-3">
                  <div className="space-y-1">
                    <LinkEthosLogo size="sm" />
                    <h4 className="text-base font-bold text-foreground mt-1.5">
                      Formulir Pakta Integritas Karyawan 2026
                    </h4>
                    <p className="text-xs text-muted-foreground">Lembar Respon Resmi Terverifikasi Sistem</p>
                  </div>
                  <div className="text-right text-xs space-y-0.5 text-muted-foreground font-mono">
                    <div className="font-bold text-foreground">LEMBAR BUKTI RESMI</div>
                    <div>ID: <span className="text-primary font-semibold">SUB-98421038</span></div>
                    <div>Waktu: 14/10/2026 13.30 WIB</div>
                    <div>IP: 103.164.115.81</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                  <span>Status: Terverifikasi Tanda Tangan Digital Sah</span>
                  <span>Dokumen PDF Standar A4</span>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* LEVEL 4: DATA VISUALIZATIONS & CHARTS */}
        {/* ========================================================= */}
        {(activeTab === "all" || activeTab === "charts") && matchesSearch("chart grafik visualisasi traffic tren bar svg") && (
          <section id="charts" className="space-y-8 scroll-mt-20">
            <div className="border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <BarChart3 className="size-4" /> Level 4: Data Visualizations & Charts
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mt-1">
                Sistem Grafik & Visualisasi Metrik
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Komponen grafik performa berbasis SVG murni dan CSS Tailwind: kurva tren interaktif, histogram batang 30 hari, breakdown perangkat, dan distribusi nilai kuis.
              </p>
            </div>

            {/* 4.1 Interactive SVG Area & Bezier Line Chart */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-foreground">4.1 Interactive Daily Traffic Area Chart (SVG Bezier)</h3>
                  <p className="text-[11px] text-muted-foreground">Kurva tren harian dengan titik koordinat interaktif dan tooltip mengambang</p>
                </div>
                {/* Metric Category Selector */}
                <div className="flex rounded-xl bg-muted p-1 text-xs font-medium border self-start sm:self-auto">
                  {(
                    [
                      { id: "all", label: "Semua Traffic" },
                      { id: "links", label: "Klik Tautan" },
                      { id: "pages", label: "Kunjungan Page" },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setChartMetric(m.id);
                        setHoveredPointIdx(null);
                      }}
                      className={`rounded-lg px-2.5 py-1 text-xs transition-all cursor-pointer ${
                        chartMetric === m.id
                          ? "bg-background shadow-xs font-semibold text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Container */}
              <Card className="p-5 rounded-2xl border bg-card shadow-xs space-y-4">
                {(() => {
                  const maxVal = Math.max(...sampleTrendData.map((d) => d[chartMetric]));
                  const svgW = 760;
                  const svgH = 200;
                  const padL = 40;
                  const padR = 20;
                  const padT = 20;
                  const padB = 30;
                  const chartW = svgW - padL - padR;
                  const chartH = svgH - padT - padB;

                  const points = sampleTrendData.map((d, i) => {
                    const x = padL + (i / (sampleTrendData.length - 1)) * chartW;
                    const y = padT + chartH - (d[chartMetric] / maxVal) * chartH;
                    return { x, y, ...d };
                  });

                  // Build smooth cubic bezier curve
                  let linePath = `M ${points[0].x} ${points[0].y}`;
                  for (let i = 0; i < points.length - 1; i++) {
                    const p0 = points[i];
                    const p1 = points[i + 1];
                    const cx = (p0.x + p1.x) / 2;
                    linePath += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
                  }
                  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`;

                  const yTicks = [
                    { val: maxVal, y: padT },
                    { val: Math.round(maxVal * 0.66), y: padT + chartH * 0.34 },
                    { val: Math.round(maxVal * 0.33), y: padT + chartH * 0.67 },
                    { val: 0, y: padT + chartH },
                  ];

                  const activePoint = hoveredPointIdx !== null ? points[hoveredPointIdx] : null;

                  return (
                    <div className="relative">
                      {/* Live Hover Tooltip */}
                      {activePoint && (
                        <div
                          className="pointer-events-none absolute z-20 -top-2 rounded-xl border bg-card px-3 py-1.5 shadow-md text-xs space-y-0.5 border-primary/30 transition-all duration-75"
                          style={{
                            left: `${Math.min(Math.max((activePoint.x / svgW) * 100, 10), 85)}%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          <div className="flex items-center gap-1.5 font-bold text-foreground">
                            <span className="size-2 rounded-full bg-primary" />
                            <span>{activePoint.label}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground font-mono">
                            {chartMetric === "all" ? "Total: " : chartMetric === "links" ? "Klik: " : "Views: "}
                            <strong className="text-primary">{activePoint[chartMetric].toLocaleString()}</strong>
                          </p>
                        </div>
                      )}

                      <svg
                        viewBox={`0 0 ${svgW} ${svgH}`}
                        className="w-full h-48 sm:h-56 select-none overflow-visible"
                        onMouseLeave={() => setHoveredPointIdx(null)}
                      >
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#289CD7" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#289CD7" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Y-axis Gridlines & labels */}
                        {yTicks.map((tick, i) => (
                          <g key={i}>
                            <line
                              x1={padL}
                              y1={tick.y}
                              x2={svgW - padR}
                              y2={tick.y}
                              stroke="currentColor"
                              className="text-border/70"
                              strokeDasharray="4 4"
                            />
                            <text
                              x={padL - 8}
                              y={tick.y + 4}
                              textAnchor="end"
                              className="fill-muted-foreground font-mono text-[10px]"
                            >
                              {tick.val}
                            </text>
                          </g>
                        ))}

                        {/* Area gradient under line */}
                        <path d={areaPath} fill="url(#chartGradient)" />

                        {/* Bezier line */}
                        <path
                          d={linePath}
                          fill="none"
                          stroke="#289CD7"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />

                        {/* Crosshair indicator on active point */}
                        {activePoint && (
                          <line
                            x1={activePoint.x}
                            y1={padT}
                            x2={activePoint.x}
                            y2={padT + chartH}
                            stroke="#289CD7"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                            className="opacity-70"
                          />
                        )}

                        {/* Data point circles & hover targets */}
                        {points.map((p, idx) => {
                          const isHovered = hoveredPointIdx === idx;
                          return (
                            <g
                              key={idx}
                              onMouseEnter={() => setHoveredPointIdx(idx)}
                              className="cursor-pointer"
                            >
                              {/* Transparent larger hit area */}
                              <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
                              {/* Visible point */}
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r={isHovered ? 5.5 : 3.5}
                                fill="#ffffff"
                                stroke="#289CD7"
                                strokeWidth={isHovered ? 3 : 2}
                                className="transition-all duration-150 drop-shadow-xs"
                              />
                              {/* X-axis date labels */}
                              <text
                                x={p.x}
                                y={svgH - 8}
                                textAnchor="middle"
                                className="fill-muted-foreground font-sans text-[10px]"
                              >
                                {p.label}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  );
                })()}

                <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground pt-1 border-t">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-[#289CD7]" />
                    <span>Kurva Trafik Harian (14 Hari Terakhir)</span>
                  </div>
                  <span className="text-[11px] font-mono">Pembaruan Real-Time</span>
                </div>
              </Card>
            </div>

            {/* 4.2 30-Day Vertical Bar Histogram Chart */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">4.2 30-Day Continuous Bar Histogram Chart</h3>
                  <p className="text-[11px] text-muted-foreground">Komponen ClicksChart (30 slot tanggal berkesinambungan tanpa gap)</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary font-semibold font-mono bg-primary/10 px-2.5 py-1 rounded-lg">
                  <TrendingUp className="size-3.5" /> +18.4% vs 30d lalu
                </div>
              </div>

              <Card className="p-5 rounded-2xl border bg-card shadow-xs space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-medium">Total Akumulasi Klik (30 Hari)</span>
                    <div className="text-2xl font-bold font-mono text-foreground">2,840</div>
                  </div>
                  <span className="text-xs text-muted-foreground">Rata-rata: <strong>94 klik/hari</strong></span>
                </div>

                {/* Bars Container */}
                <div className="relative pt-6 pb-2" style={{ height: 160 }}>
                  {/* Grid Lines */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                    {[240, 160, 80, 0].map((t) => (
                      <div key={t} className="relative border-t border-dashed border-border/60">
                        <span className="absolute -top-2 left-0 bg-card pr-1 text-[9px] font-mono text-muted-foreground/70">
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bars list */}
                  <div className="relative flex h-full items-end gap-[3px] pl-8">
                    {sample30DayBars.map((count, i) => {
                      const maxBar = 240;
                      const h = (count / maxBar) * 100;
                      const isHovered = hoveredBarIdx === i;

                      return (
                        <div
                          key={i}
                          onMouseEnter={() => setHoveredBarIdx(i)}
                          onMouseLeave={() => setHoveredBarIdx(null)}
                          className="group relative flex h-full flex-1 items-end cursor-pointer"
                        >
                          {isHovered && (
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-foreground text-background px-1.5 py-0.5 text-[9px] font-mono font-bold whitespace-nowrap z-20 shadow-xs">
                              H-{29 - i}: {count}
                            </div>
                          )}
                          <div
                            className={`w-full rounded-t transition-all ${
                              isHovered
                                ? "bg-primary"
                                : "bg-gradient-to-t from-primary/70 to-primary/95 group-hover:from-primary group-hover:to-primary"
                            }`}
                            style={{ height: `${Math.max(h, 4)}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between text-[10px] text-muted-foreground font-mono pl-8 border-t pt-1">
                  <span>30 Hari Lalu</span>
                  <span>15 Hari Lalu</span>
                  <span>Hari Ini</span>
                </div>
              </Card>
            </div>

            {/* 4.3 Distribution Progress Bars & Breakdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Device Breakdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground">4.3 Device & Platform Distribution</h3>
                  <span className="text-[10px] text-muted-foreground font-mono">Progress Bar Molecule</span>
                </div>
                <Card className="p-4 rounded-xl border bg-card shadow-2xs space-y-3">
                  {/* Multi-Segment Stacked Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Proporsi Penggunaan Perangkat</span>
                      <span className="text-muted-foreground">Total 100%</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-muted flex overflow-hidden">
                      <div className="h-full bg-[#289CD7]" style={{ width: "65%" }} title="Mobile 65%" />
                      <div className="h-full bg-[#8B5CF6]" style={{ width: "28%" }} title="Desktop 28%" />
                      <div className="h-full bg-[#F59E0B]" style={{ width: "7%" }} title="Tablet 7%" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t text-xs">
                    <div className="flex items-center gap-1.5">
                      <Smartphone className="size-3.5 text-[#289CD7]" />
                      <div>
                        <p className="font-bold font-mono">65%</p>
                        <p className="text-[10px] text-muted-foreground">Mobile Phone</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Monitor className="size-3.5 text-[#8B5CF6]" />
                      <div>
                        <p className="font-bold font-mono">28%</p>
                        <p className="text-[10px] text-muted-foreground">PC / Desktop</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tablet className="size-3.5 text-[#F59E0B]" />
                      <div>
                        <p className="font-bold font-mono">7%</p>
                        <p className="text-[10px] text-muted-foreground">Tablet</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quiz Performance & Pass Rate Gauge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground">4.4 Quiz Score Distribution & KKM Gauge</h3>
                  <span className="text-[10px] text-muted-foreground font-mono">Responses Organism</span>
                </div>
                <Card className="p-4 rounded-xl border bg-card shadow-2xs space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Tingkat Kelulusan Kuis (KKM 70)</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">87.5% Lulus</span>
                    </div>
                    {/* Distribution Bars */}
                    <div className="space-y-1.5 text-[11px]">
                      <div>
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
                          <span>Sangat Baik (Skor 90 - 100)</span>
                          <span className="font-mono font-bold">45% (18 Peserta)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "45%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
                          <span>Lulus KKM (Skor 70 - 89)</span>
                          <span className="font-mono font-bold">42% (15 Peserta)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-sky-500 rounded-full" style={{ width: "42%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
                          <span>Belum Lulus (Skor &lt; 70)</span>
                          <span className="font-mono font-bold text-destructive">13% (5 Peserta)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: "13%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* 4.5 Chart Color Tokens */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground">4.5 Chart Semantic Tokens (--color-chart-1 .. 5)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { name: "--color-chart-1", code: "#289CD7", label: "Traffic / Link Clicks", bg: "bg-[#289CD7]" },
                  { name: "--color-chart-2", code: "#10B981", label: "Page Views / Lulus", bg: "bg-[#10B981]" },
                  { name: "--color-chart-3", code: "#F59E0B", label: "KKM / Tablet", bg: "bg-[#F59E0B]" },
                  { name: "--color-chart-4", code: "#8B5CF6", label: "Desktop / PC", bg: "bg-[#8B5CF6]" },
                  { name: "--color-chart-5", code: "#EF4444", label: "Gagal / Error", bg: "bg-[#EF4444]" },
                ].map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.code, token.name)}
                    className="p-3 rounded-xl border bg-card hover:border-primary/50 transition-all cursor-pointer shadow-2xs space-y-1.5"
                  >
                    <div className={`h-8 w-full rounded-lg ${token.bg}`} />
                    <span className="text-xs font-mono font-bold block text-foreground">{token.name}</span>
                    <span className="text-[10px] text-muted-foreground block">{token.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* LEVEL 5: TEMPLATES & LAYOUTS */}
        {/* ========================================================= */}
        {(activeTab === "all" || activeTab === "templates") && matchesSearch("template layout shell public form bio link") && (
          <section id="templates" className="space-y-8 scroll-mt-20">
            <div className="border-b pb-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Smartphone className="size-4" /> Level 5: Templates
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mt-1">
                Kerangka Tata Letak Halaman (Templates)
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Struktur layout halaman yang menyatukan seluruh organisme menjadi alur pengguna utuh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Template 1: Public Form */}
              <Card className="p-4 rounded-2xl border bg-card shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-24 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center border">
                    <FileText className="size-8 text-primary/70" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Public Form Centered Template</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Layout vertikal terpusat (max-w-xl) dengan header cover, kartu pertanyaan bertahap, dan hasil evaluasi kuis.
                  </p>
                </div>
                <Link href="/f/e-teamcampaign" target="_blank">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    <span>Lihat Contoh Live</span>
                    <ExternalLink className="size-3" />
                  </Button>
                </Link>
              </Card>

              {/* Template 2: Bio Link Page */}
              <Card className="p-4 rounded-2xl border bg-card shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-24 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center border text-white">
                    <Smartphone className="size-8 text-white/70" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Bio Link Mobile-First Template</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Halaman profil mini vertikal dengan avatar bulat, bio singkat, tombol bertingkat, dan pemutar media.
                  </p>
                </div>
                <Link href="/pages" target="_blank">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    <span>Lihat Contoh Live</span>
                    <ExternalLink className="size-3" />
                  </Button>
                </Link>
              </Card>

              {/* Template 3: Dashboard Workspace */}
              <Card className="p-4 rounded-2xl border bg-card shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-24 rounded-xl bg-gradient-to-r from-primary/15 via-background to-primary/5 flex items-center justify-center border">
                    <LayoutDashboard className="size-8 text-primary/70" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Dashboard Workspace Shell</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Tata letak dual-pane dengan Sidebar navigasi di kiri dan area kerja responsif dengan metrik analitik di kanan.
                  </p>
                </div>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    <span>Lihat Contoh Live</span>
                    <ExternalLink className="size-3" />
                  </Button>
                </Link>
              </Card>
            </div>
          </section>
        )}

        {/* Documentation Footer Reference */}
        <section className="rounded-3xl border bg-muted/20 p-6 md:p-8 text-center space-y-3">
          <h3 className="text-base font-bold text-foreground">Dokumentasi Spesifikasi Lengkap</h3>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            Spesifikasi arsitektur dan pedoman implementasi lengkap tersimpan di file{" "}
            <code className="px-1.5 py-0.5 bg-muted rounded font-mono text-primary font-bold">
              project_idea/design/design.md
            </code>
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <Link href="/panduan">
              <Button size="sm" variant="outline" className="text-xs gap-1.5">
                <BookOpen className="size-3.5" /> Buka Pusat Panduan
              </Button>
            </Link>
            <Link href="/forms">
              <Button size="sm" className="text-xs gap-1.5">
                <LayoutDashboard className="size-3.5" /> Menuju Aplikasi Formulir
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
