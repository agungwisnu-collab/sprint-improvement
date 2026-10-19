# Link Ethos Design System & Atomic Design Specification
**Dokumentasi Resmi Desain Sistem, Token, Komponen, dan Hierarki Atomic Design**  
*Versi: 1.0.0 | Terakhir Diperbarui: Oktober 2026*  
*Lokasi Project: `d:\Project\ethos-shorten-link`*

---

## 1. Pendahuluan & Filosofi Desain

Link Ethos dibangun dengan metodologi **Atomic Design** yang dipopulerkan oleh Brad Frost. Pendekatan modular ini memecah antarmuka pengguna (UI) menjadi lima tingkatan hierarki berkesinambungan:

```
┌─────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐      ┌─────────┐
│  Atoms  │ ───> │ Molecules │ ───> │ Organisms │ ───> │ Templates │ ───> │  Pages  │
└─────────┘      └───────────┘      └───────────┘      └───────────┘      └─────────┘
   Tombol,          Search Bar,        Form Canvas,       Layout Shell,     Dashboard,
   Input, Icon,     Quiz Option,       Quiz Evaluator,    Bio Page Shell,   Public Form,
   Badge, Teks      Metric Card        Responses Table    Builder Shell     Panduan
```

### Prinsip Utama Desain Link Ethos:
1. **Clarity & Simplicity**: Antarmuka bersih, fokus pada produktivitas pengguna, bebas elemen berlebihan.
2. **Predictable Consistency**: Komponen atomik dapat digunakan ulang (reusable) di seluruh modul (Links, Bio Pages, Form Builder, Kuis, Analitik).
3. **Accessibility & Contrast**: Mematuhi standar WCAG 2.1 AA dengan rasio kontras warna yang ramah mata baik di mode terang (Light Mode) maupun gelap (Dark Mode).
4. **Resilient Responsiveness**: Tampilan mulus di ponsel pintar (360px) hingga layar desktop ultra-wide (1920px+).

---

## 2. Brand Identity & Logo Guidelines

### 2.1 Identitas Visual
- **Nama Brand**: Link Ethos
- **Perusahaan**: PT Ethos Kreatif Indonesia
- **Warna Identitas Primer**:
  - **Brand Cyan / Electric Blue**: `#289CD7` (Aksen Utama Link Ethos)
  - **Neutral Dark (Light Mode)**: `oklch(0.205 0 0)` (Slate/Zinc 900)
  - **Neutral Light (Dark Mode)**: `oklch(0.985 0 0)` (Slate/Zinc 50)
- **Komponen Logo**: [`components/logo.tsx`](file:///d:/Project/ethos-shorten-link/components/logo.tsx)
  - `<LinkEthosIcon size={number} />`: Logo ikonik Ethos (simbol roket / orbit modern).
  - `<LinkEthosLogo size="sm"|"md"|"lg"|"xl" showText={boolean} />`: Kombinasi ikon + teks tipografi "Link Ethos".

---

## 3. Design Tokens (Fundamen Sistem)

### 3.1 Palet Warna & Semantic Tokens (OKLCH)
Sistem warna dikonfigurasi melalui Tailwind CSS v4 `@theme` di [`app/globals.css`](file:///d:/Project/ethos-shorten-link/app/globals.css):

| Semantic Token | Nilai Light Mode | Nilai Dark Mode | Penggunaan / Konteks |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` (#ffffff) | `oklch(0.145 0 0)` (#0f172a) | Latar belakang kanvas utama aplikasi |
| `--foreground` | `oklch(0.145 0 0)` (#0f172a) | `oklch(0.985 0 0)` (#f8fafc) | Warna teks primer |
| `--card` | `oklch(1 0 0)` (#ffffff) | `oklch(0.205 0 0)` (#1e293b) | Latar belakang kartu kontainer |
| `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Teks di dalam kartu |
| `--primary` | `oklch(0.205 0 0)` / Brand `#289CD7` | `oklch(0.922 0 0)` | Aksi utama, tombol primer, link fokus |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | Teks kontras di atas warna primer |
| `--secondary` | `oklch(0.97 0 0)` (#f1f5f9) | `oklch(0.269 0 0)` (#334155) | Tombol sekunder, chip tag netral |
| `--muted` | `oklch(0.97 0 0)` (#f1f5f9) | `oklch(0.269 0 0)` (#334155) | Latar seksi non-aktif, badge abu |
| `--muted-foreground` | `oklch(0.556 0 0)` (#64748b) | `oklch(0.708 0 0)` (#94a3b8) | Label bantuan, placeholder, tanggal |
| `--accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | State hover pada menu & opsi pilihan |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Pesan bahaya, gagal kuis, hapus data |
| `--border` | `oklch(0.922 0 0)` (#e2e8f0) | `oklch(0.269 0 0)` (#334155) | Garis batas elemen dan pemisah |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.439 0 0)` | Fokus outline aksesibilitas keyboard |

#### Warna Aksen Status Fungsional:
- **Success / Lulus (Emerald)**: `bg-emerald-500/15`, `text-emerald-700`, `dark:text-emerald-400`, `border-emerald-500/30`
- **Warning / Review (Amber)**: `bg-amber-500/15`, `text-amber-700`, `dark:text-amber-400`, `border-amber-500/30`
- **Info / Panduan (Sky/Blue)**: `bg-blue-500/15`, `text-blue-700`, `dark:text-blue-400`, `border-blue-500/30`
- **Brand Identity**: `#289CD7` (RGB: `40, 156, 215`)

### 3.2 Tipografi
Link Ethos menggunakan 3 font Google terintegrasi:
1. **Geist Sans (`--font-sans`)**: Font antarmuka UI utama, modern, sangat terbaca di layar resolusi tinggi.
2. **Poppins (`--font-poppins`)**: Font judul display, estetis, ramah untuk branding Bio Link.
3. **JetBrains Mono (`--font-mono`)**: Font angka monospaced untuk stempel waktu, nilai kuis (`80/100`), IP address, dan kode slug.

#### Skala Tipografi:
- **Display 1**: `text-4xl` s/d `text-5xl` (Font Weight: `800`, Tracking: `tracking-tight`)
- **Heading 1 (H1)**: `text-2xl` s/d `text-3xl` (Font Weight: `700`, Tracking: `tracking-tight`)
- **Heading 2 (H2)**: `text-xl` s/d `text-2xl` (Font Weight: `700`)
- **Heading 3 (H3)**: `text-base` s/d `text-lg` (Font Weight: `600`)
- **Body Regular**: `text-sm` (Line Height: `leading-normal`)
- **Body Small**: `text-xs` (Line Height: `leading-relaxed`)
- **Caption / Meta**: `text-[10px]` s/d `text-[11px]` (Font Weight: `500`, Uppercase tracking)

### 3.3 Border Radius & Elevasi
- `--radius-sm`: `calc(var(--radius) * 0.6)` (~4px)
- `--radius-md`: `calc(var(--radius) * 0.8)` (~6px)
- `--radius-lg`: `var(--radius)` (10px) - Radius standar tombol & input
- `--radius-xl`: `calc(var(--radius) * 1.4)` (14px) - Radius kartu & modal
- `--radius-2xl`: `calc(var(--radius) * 1.8)` (18px) - Radius pill & hero spotlight
- **Shadows**:
  - `shadow-2xs`: Elevasi kartu halus di mode terang.
  - `shadow-xs` / `shadow-sm`: Elevasi tombol dan dropdown.
  - `shadow-md` / `shadow-lg`: Elevasi modal dialog & popover.

---

## 4. Tingkatan Atomic Design di Link Ethos

### 4.1 Atoms (Elemen Terkecil UI)
Atoms adalah elemen dasar yang tidak dapat dipecah lagi tanpa kehilangan fungsinya.

1. **Button (`components/ui/button.tsx`)**:
   - Varian: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`.
   - Ukuran: `xs`, `sm`, `default` (md), `lg`, `icon`.
   - Status: Active, Hover, Focus-visible ring, Disabled, Loading spinner.
2. **Badge (`components/ui/badge.tsx`)**:
   - Varian: `default`, `secondary`, `outline`, `destructive`.
   - Varian Khusus: Status Kuis (`LULUS`, `BELUM LULUS`), Poin (`+50 Poin`), Role (`ADMIN`, `USER`).
3. **Input & Controls**:
   - `Input` ([`components/ui/input.tsx`](file:///d:/Project/ethos-shorten-link/components/ui/input.tsx)): Text, email, password, number, search.
   - `Textarea`: Multi-line text field dengan auto-expand.
   - `Checkbox` & `Radio`: Kontrol pemilihan tunggal/jamak dengan state checked aktif.
   - `Switch`: Toggle slider untuk aktivasi mode kuis, proteksi password, UTM.
4. **Canvas Tanda Tangan**:
   - HTML5 Canvas resolusi tinggi dengan event sentuhan halus (Pointer/Touch events) dan output Base64 PNG.
5. **Icon System**:
   - Menggunakan ikon set Lucide React dengan ukuran terstandarisasi (`size-3.5`, `size-4`, `size-5`).

---

### 4.2 Molecules (Kombinasi Atom yang Membentuk Komponen Sederhana)
Molecules menggabungkan beberapa atom untuk melakukan satu tugas spesifik.

1. **Search Bar with Reset**:
   - Gabungan Input + Ikon Search (kiri) + Tombol Reset (kanan).
2. **Quiz Option Row**:
   - Opsi jawaban pilihan ganda yang memuat Radio/Checkbox + Teks Opsi + Tombol Toggle **"Kunci Benar"** (dengan badge hijau saat aktif) + Tombol Hapus Opsi.
3. **Question Header Molecule**:
   - Nomor soal + Teks Pertanyaan + Badge Tipe Field + Input **Bobot Poin** (`[ 50 Poin ]`) + Tombol Duplikat/Hapus.
4. **Metric Stat Card**:
   - Kartu kecil dengan Label + Nilai Numerik Monospace tebal (`24.5`) + Pembanding/KKM + Subteks deskriptif.
5. **Callout Box Molecule**:
   - Kontainer informasi dengan varian `info`, `success`, `warning`, dan `destructive` memuat Ikon + Judul + Paragraf deskripsi.
6. **File Attachment Pill**:
   - Ikon Paperclip + Nama file truncate + Ukuran KB/MB + Tombol Download/Preview.
7. **Social Media Pill Bar**:
   - Baris tombol ikon media sosial dengan efek animasi hover (WhatsApp, IG, LinkedIn, YouTube).

---

### 4.3 Organisms (Komponen Fungsional Kompleks)
Organisms menggabungkan molekul dan atom menjadi blok antarmuka yang utuh.

1. **Top Navigation & Sidebar Organisms**:
   - Header aplikasi dengan Logo Link Ethos, profil pengguna, dan menu navigasi responsif.
2. **Form Builder Canvas Organism**:
   - Ruang kerja penyusun formulir dengan tab Pertanyaan, Tata Letak, Desain Tema, dan Pengaturan Mode Kuis.
3. **Quiz Evaluator Banner Organism**:
   - Komponen rekapitulasi penilaian kuis: Nilai total vs Nilai maksimum, persentase nilai, status kelulusan (LULUS / BELUM LULUS), dan standar KKM.
4. **Submissions Table Organism**:
   - Tabel data responsif dengan sorting, pencarian teks, kolom Nilai Kuis, preview tanda tangan, dan aksi Cetak PDF / Hapus.
5. **Printable PDF Document Organism (`#printable-response-doc`)**:
   - Struktur dokumen lembar jawaban formal dengan kop resmi Link Ethos, stempel waktu, metadata IP, tanda tangan elektronik terverifikasi, dan styling ramah cetak A4.

---

### 4.4 Templates (Kerangka Layout Halaman)
Templates menentukan struktur tata letak halaman tanpa data spesifik.

1. **Dashboard Shell Template**:
   - Layout dengan Sidebar di sebelah kiri (collapsible di mobile) dan area konten utama di kanan.
2. **Public Form Template**:
   - Layout kartu vertikal di tengah layar (*centered card layout*) dengan banner cover, judul form, seksi pertanyaan bertingkat, dan kartu hasil kuis.
3. **Bio Link Mobile-First Template**:
   - Layout mini profil vertikal dengan foto avatar melingkar, nama, bio, tombol tautan bertingkat, dan bar sosial media.
4. **Documentation / Panduan Template**:
   - Layout dokumentasi dengan Hero section, Spotlight bar, Navigasi kategori pills, grid topik kartu, dan FAQ accordion.

---

### 4.5 Pages (Instansiasi Nyata dengan Data Nyata)
Halaman operasional yang aktif digunakan di Link Ethos:
- `/dashboard`: Halaman analitik dan ringkasan seluruh aset.
- `/links`: Manajemen pemendek URL, QR Code, dan password protection.
- `/pages`: Builder dan pratinjau halaman Bio Link.
- `/forms`: Daftar formulir, pembuatan form baru, dan ekspor CSV.
- `/forms/[id]/edit`: Form Builder interaktif dengan mode kuis & bobot poin.
- `/forms/[id]/responses`: Analitik skor kuis, tabel respon, modal detail, dan cetak PDF.
- `/f/[slug]`: Halaman pengisian formulir publik untuk responden.
- `/panduan`: Pusat dokumentasi dan panduan langkah demi langkah.
- `/design-system`: **Halaman Showcase Atomic Design Interaktif**.

---

## 5. Panduan Implementasi Komponen Baru

Saat menambahkan fitur atau komponen baru ke Link Ethos, ikuti checklist berikut:

---

## 5. Sistem Visualisasi Data & Grafik (Charts System)

Visualisasi data di Link Ethos dibangun secara *custom* menggunakan SVG murni dan CSS Tailwind untuk menjamin performa ultra-ringan tanpa *bloatware* library pihak ketiga yang berat.

### 5.1 Token Warna Khusus Grafik (Chart Tokens)
Dikonfigurasi di [`app/globals.css`](file:///d:/Project/ethos-shorten-link/app/globals.css) melalui variabel semantik Tailwind `@theme`:

| Token Grafik | Nilai Default | Nilai Aksen Terapan | Peruntukan / Konteks Visual |
|---|---|---|---|
| `--color-chart-1` | `oklch(0.87 0 0)` | `#289CD7` (Brand Cyan) | Garis tren lalu lintas utama & klik link |
| `--color-chart-2` | `oklch(0.556 0 0)` | `#10B981` (Emerald Success) | Kunjungan bio page & skor kuis LULUS |
| `--color-chart-3` | `oklch(0.439 0 0)` | `#F59E0B` (Amber Warning) | Batas standar KKM & perangkat tablet |
| `--color-chart-4` | `oklch(0.371 0 0)` | `#8B5CF6` (Purple Accent) | Perangkat PC / Desktop |
| `--color-chart-5` | `oklch(0.269 0 0)` | `#EF4444` (Rose / Red) | Skor kuis TIDAK LULUS & error rate |

### 5.2 Hirarki Atomic Desain pada Grafik

```
┌───────────────────┐    ┌───────────────────────────┐    ┌──────────────────────────────────┐
│   Chart Atoms     │ -> │      Chart Molecules      │ -> │         Chart Organisms          │
├───────────────────┤    ├───────────────────────────┤    ├──────────────────────────────────┤
│ • Bar Column      │    │ • Metric KPI Card + Trend │    │ • Interactive SVG Area/Line Chart│
│ • SVG Data Dot    │    │ • Progress Bar Breakdown  │    │ • 30-Day Vertical Bar Histogram  │
│ • Axis Gridline   │    │ • Device Percentage Pill  │    │ • Device & Browser Breakdown     │
│ • Tooltip Badge   │    │ • Quiz Score Range Bar    │    │ • Quiz Pass/Fail Analytics Gauge │
└───────────────────┘    └───────────────────────────┘    └──────────────────────────────────┘
```

#### 1. Chart Atoms:
- **Bar Column**: Batang vertikal dengan sudut membulat atas (`rounded-t`), ketinggian proporsional (0-100%), dan transisi halus pada state hover (`transition-all`).
- **SVG Data Dot**: Lingkaran SVG titik koordinat (`<circle r="4" />`) dengan efek *drop-shadow* dan *stroke* kontras yang membesar saat kursor melintas.
- **Axis Gridlines & Labels**: Garis pandu putus-putus horizontal (`border-dashed border-border/60`) dengan label nilai monospaced di sisi kiri sumbu Y.
- **Hover Tooltip Tag**: Kotak popover kecil mengambang memuat tanggal lokal, jumlah klik/responden, dan kategori data.

#### 2. Chart Molecules:
- **Horizontal Progress Bar Breakdown**: Batang kemajuan horizontal dengan bar indikator warna-warni yang merepresentasikan proporsi perangkat (Mobile, Desktop, Tablet) dan sistem operasi.
- **Metric KPI Card with Trend Pill**: Kartu statistik utama yang memadukan angka agregat tebal (`2,450`), label metrik, dan *pill badge* persentase tren perbandingan (`+12.4% vs periode lalu`).
- **Score Distribution Range Bar**: Distribusi perolehan nilai kuis dalam rentang skor (90-100, 70-89, <70) dengan indikator ambang KKM.

#### 3. Chart Organisms:
- **Interactive Daily Traffic Area/Line Chart** ([`components/admin/admin-analytics-view.tsx`](file:///d:/Project/ethos-shorten-link/components/admin/admin-analytics-view.tsx)):
  - Kurva halus Bezier (`d="M ... C ..."`), gradien transparan di bawah kurva, garis pandu vertikal interaktif mengikuti posisi kursor mouse, dan filter kategori (All Traffic, Link Clicks, Page Views).
- **30-Day Continuous Bar Histogram Chart** ([`components/analytics/clicks-chart.tsx`](file:///d:/Project/ethos-shorten-link/components/analytics/clicks-chart.tsx)):
  - Histogram 30 slot tanggal tanpa gap waktu, skala vertikal dinamis berdasarkan *peak traffic*, dan animasi ketinggian batang.
- **Quiz Performance & Pass Rate Summary Organism** ([`components/forms/responses-table.tsx`](file:///d:/Project/ethos-shorten-link/components/forms/responses-table.tsx)):
  - Gabungan kartu rata-rata nilai, skor tertinggi, persentase kelulusan, dan status KKM.

---

## 6. Panduan Implementasi Komponen Baru

Saat menambahkan fitur atau komponen baru ke Link Ethos, ikuti checklist berikut:

1. **Identifikasi Level**: Tentukan apakah komponen baru adalah Atom, Molekul, Organisme, atau Template.
2. **Gunakan Token Warna**: Jangan menggunakan kode warna *hardcoded* (seperti `bg-[#123456]`). Selalu gunakan token semantik seperti `bg-card`, `text-primary`, `text-muted-foreground`, `border-border`.
3. **Dukungan Dark Mode**: Pastikan setiap komponen diuji pada kedua mode tema dengan class `dark:`.
4. **Dukungan Mobile**: Utamakan pendekatan *mobile-first* (gunakan `sm:`, `md:`, `lg:` untuk penyesuaian breakpoint).
5. **Aksesibilitas Grafik**:
   - Sertakan teks tabel atau angka alternatif untuk pembaca layar (*screen readers*).
   - Pastikan warna grafik memiliki rasio kontras yang memadai dan tidak semata-mata mengandalkan warna untuk menyampaikan status (sertakan teks/ikon).

---

## 7. Referensi File Utama Desain Sistem
- **Design System Showcase Page**: [`app/design-system/page.tsx`](file:///d:/Project/ethos-shorten-link/app/design-system/page.tsx) / [`app/atomic-design/page.tsx`](file:///d:/Project/ethos-shorten-link/app/atomic-design/page.tsx)
- **Showcase View Component**: [`components/design-system/atomic-design-view.tsx`](file:///d:/Project/ethos-shorten-link/components/design-system/atomic-design-view.tsx)
- **CSS Tokens & Theme**: [`app/globals.css`](file:///d:/Project/ethos-shorten-link/app/globals.css)
- **Analytics Charts**: [`components/analytics/clicks-chart.tsx`](file:///d:/Project/ethos-shorten-link/components/analytics/clicks-chart.tsx) & [`components/admin/admin-analytics-view.tsx`](file:///d:/Project/ethos-shorten-link/components/admin/admin-analytics-view.tsx)
- **UI Atoms Library**: [`components/ui/`](file:///d:/Project/ethos-shorten-link/components/ui/)
- **Brand Logo**: [`components/logo.tsx`](file:///d:/Project/ethos-shorten-link/components/logo.tsx)
- **Form Builder**: [`components/forms/form-builder.tsx`](file:///d:/Project/ethos-shorten-link/components/forms/form-builder.tsx)
- **Public Renderer**: [`components/forms/public-form-renderer.tsx`](file:///d:/Project/ethos-shorten-link/components/forms/public-form-renderer.tsx)
- **Responses & PDF Table**: [`components/forms/responses-table.tsx`](file:///d:/Project/ethos-shorten-link/components/forms/responses-table.tsx)

