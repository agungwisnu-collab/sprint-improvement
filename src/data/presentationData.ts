export interface SlideItem {
  id: number;
  slideNumber: number;
  title: string;
  subtitle?: string;
  category: 'intro' | 'problem' | 'analysis' | 'solution' | 'portfolio' | 'impact' | 'learning' | 'roadmap';
  speakerNotes: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  category: 'Enterprise App' | 'Internal Service' | 'Desktop Tool' | 'Converter Tool' | 'Productivity';
  description: string;
  businessNeed: string;
  impactMetrics: { label: string; value: string }[];
  keyFeatures: string[];
  builtIn: string;
  techStack: string[];
  mockData?: Record<string, unknown>;
}

export const TEAM_INFO = {
  title: "AI-Driven Rapid Prototyping",
  subtitle: "Solusi Cepat Kebutuhan Operasional Departemen Tanpa Membebani Backlog IT",
  event: "Stand Up for Improvement Batch 5",
  organization: "Ethos Group - Business Analyst Division",
  members: [
    { name: "Agung Wisnu Anggoro", role: "Business Analyst" },
    { name: "Nina Verina", role: "Business Analyst" },
    { name: "Lisa Amri Mubarokah", role: "Business Analyst" }
  ]
};

export const PROBLEM_METRICS = {
  backlogTotal: 117,
  onHold: 9,
  notStarted: 76,
  inProgress: 32,
  avgLeadTimeBefore: "1 - 3 Bulan",
  avgLeadTimeAfter: "Kurang dari 1 Hari - 5 Hari Kerja",
  itDevCapacityToCore: "100%",
  shadowItRisks: [
    {
      title: "Sisipan Iklan & Citra Perusahaan",
      desc: "Penggunaan shortlink publik gratis (Bitly dll) memuat iklan mengganggu dan tautan non-resmi yang menurunkan reputasi brand profesional.",
      severity: "Medium"
    },
    {
      title: "Risiko Kebocoran Data Perusahaan",
      desc: "Dokumen pajak dan finansial sensitif (Bupot & Faktur Pajak Coretax) diunggah ke converter/parser pihak ketiga online tanpa jaminan kerahasiaan.",
      severity: "Kritis"
    },
    {
      title: "Potensi Pelacakan & Malware",
      desc: "Domain asing tidak terverifikasi (seperti acesse.one) berisiko menyisipkan pelacak, phishing, atau injeksi berbahaya ke perangkat karyawan.",
      severity: "Tinggi"
    }
  ]
};

export const FISHBONE_DATA = [
  {
    category: "1. Manusia (People)",
    causes: [
      "Kapasitas developer IT 100% terikat KPI IT, Core System Ethos & KPI Utama",
      "Keterbatasan programmer untuk mengurusi tugas operasional mikro",
      "Business Analyst sebelumnya bertindak pasif hanya menulis dokumen FSD"
    ]
  },
  {
    category: "2. Metode (Process)",
    causes: [
      "Metode konvensional mewajibkan seluruh pembuatan tools melewati proses admintistrasi dan antrean SDLC developer IT",
      "Birokrasi antrean tiket IT memakan waktu 1 hingga 3 bulan"
    ]
  },
  {
    category: "3. Prioritas & Lingkungan (Environment)",
    causes: [
      "Fokus IT mutlak ke Core System & dependensi KPI perusahaan",
      "Kebutuhan mikro departemen operasional selalu kalah prioritas",
      "Departemen terpaksa berinisiatif sendiri mencari jalan pintas (Shadow IT)"
    ]
  },
  {
    category: "4. Teknologi & Keamanan (Tools)",
    causes: [
      "Ketergantungan pada tools gratisan internet yang beriklan",
      "Potensi kebocoran data finansial (Bupot, Faktur, Payroll) di server pihak ketiga",
      "Domain eksternal tidak aman tanpa alokasi subdomain resmi perusahaan"
    ]
  }
];

export const FIVE_WHYS = [
  {
    step: 1,
    question: "Mengapa pembuatan tools operasional departemen tertunda 1 hingga 3 bulan di IT?",
    answer: "Karena kapasitas developer IT teralokasi penuh (100%) untuk mengejar target KPI tim IT sendiri, memelihara Core System Ethos, dan mengawal sistem pendukung KPI utama perusahaan.",
    implication: "Kebutuhan mikro departemen tergeser ke prioritas terbawah backlog."
  },
  {
    step: 2,
    question: "Mengapa kondisi ini memicu keresahan dari VP IT dan manajemen?",
    answer: "Karena untuk mempercepat kerja harian, departemen berinisiatif (ideasi mandiri) menggunakan tools gratis pihak ketiga di internet (Shadow IT), yang memicu kekhawatiran risiko kebocoran data finansial (Bupot & Faktur), potensi pelacakan domain asing (acesse.one), serta sisipan iklan (Bitly) yang menurunkan citra profesional perusahaan.",
    implication: "Terjadi friksi antara kecepatan operasional dan risiko keamanan siber & reputasi."
  },
  {
    step: 3,
    question: "Mengapa kebutuhan operasional tersebut tidak segera dibuatkan solusi internalnya?",
    answer: "Karena metode konvensional mewajibkan seluruh pembuatan tools melewati antrean SDLC developer IT (koding manual dari nol) beserta rangkaian administrasi lainnya, sementara Business Analyst sebelumnya hanya bertindak pasif sebagai pembuat dokumen kebutuhan (FRD) tanpa kemampuan eksekusi teknis langsung.",
    implication: "Bottleneck ada pada proses development konvensional yang kaku."
  },
  {
    step: 4,
    question: "Mengapa Business Analyst tidak bisa langsung membangun solusi mandiri sebelumnya?",
    answer: "Karena business analyst terbiasa hanya sampai level spesifikasi kebutuhan, dan memiliki keterbatasan skill pemrograman teknis konvensional untuk membangun aplikasi web/desktop dari nol (scratch).",
    implication: "Perlu alat pengungkit (leverage) untuk menjembatani ide bisnis menjadi kode yang bekerja."
  },
  {
    step: 5,
    question: "Apa titik balik terobosan perbaikan (The Turning Point)?",
    answer: "Dengan mengadopsi AI Agentic Coding, Business Analyst kini dapat langsung mentransformasikan proses bisnis menjadi working software fungsional dalam hitungan jam/hari tanpa membebani developer IT, dan menempatkannya di server terisolasi yang aman.",
    implication: "Evolusi peran Business Analyst dari 'dokumen semata' menjadi 'pembuat solusi aktif'."
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "meethos",
    name: "Meethos (Booking Room System)",
    tagline: "Sistem Reservasi & Analitik Okupansi Ruang Rapat Terpusat",
    domain: "booking.ethos.co.id",
    category: "Enterprise App",
    description: "Aplikasi web internal untuk manajemen dan reservasi seluruh ruang rapat perusahaan secara real-time, dilengkapi display signage mode dan analitik okupansi per departemen.",
    businessNeed: "Sebelumnya jadwal ruang rapat sering bentrok, tidak ada visibilitas utilitas ruangan, dan pencatatan manual membuang waktu koordinasi antar-divisi.",
    impactMetrics: [
      { label: "Total Reservasi Tercatat", value: "224 Sesi" },
      { label: "Total Jam Rapat Terkelola", value: "740 jam terpakai" },
      { label: "Total Partisipasi", value: "1632 orang hadir" },
      { label: "Lead Time Pembuatan", value: "~18 Hari Kerja" }
    ],
    keyFeatures: [
      "Master Kalender & Real-time Booking Slot",
      "Laporan & Analitik Penggunaan (Grafik tren harian, jam sibuk, metrik divisi)",
      "Pintasan Cepat Mode Display Signage Ruangan",
      "Distribusi Utilisasi per Divisi (HC, IT, Strategy, Corporate Sec, Sales)"
    ],
    builtIn: "3 Hari Kerja (vs estimasi 2 bulan antrean IT)",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Docker"]
  },
  {
    id: "link-ethos",
    name: "link.ethos.co.id",
    tagline: "Official URL Shortener & Corporate Bio Pages Platform",
    domain: "link.ethos.co.id",
    category: "Internal Service",
    description: "Platform penyingkat tautan resmi dan bio pages terintegrasi Ethos Group, menggantikan Bitly dan link aggregator publik beriklan.",
    businessNeed: "Menghapus ketergantungan pada Bitly yang menyisipkan iklan dan acesse.one yang berisiko pelacakan data, serta memperkuat branding domain resmi ethos.co.id.",
    impactMetrics: [
      { label: "Total Trafik Terlayani", value: "7128 Total Traffic" },
      { label: "Pengunjung Unik", value: "3013 Unique IP addresses" },
      { label: "Top Performer", value: "/ethossurvey2026 (2483 total klik)" },
      { label: "Iklan Pihak Ketiga", value: "0% (Bebas Iklan)" }
    ],
    keyFeatures: [
      "Custom Slug dengan domain ethos.co.id (misal: /JobFairEthos)",
      "Global Traffic Analytics lengkap (Tren interaksi harian, perangkat, perujuk)",
      "Corporate Bio Pages builder untuk recruitment & event",
      "Sistem Kritik & Saran terintegrasi"
    ],
    builtIn: "~25 Hari Kerja",
    techStack: ["React", "Express", "PostgreSQL/SQLite", "Tailwind CSS"]
  },
  {
    id: "bupot-extractor",
    name: "Bupot & Faktur Extractor",
    tagline: "Automated Tax Invoice & Bukti Potong Coretax PDF Parser",
    domain: "Internal Desktop / CLI Executable",
    category: "Desktop Tool",
    description: "Software otomasi ekstraksi data Bukti Potong (Bupot) dan Faktur Pajak Masukan/Keluaran dari PDF resmi Coretax menjadi format Excel rekapitulasi terstruktur.",
    businessNeed: "Tim Tax sebelumnya menghabiskan puluhan jam manual mengetik/mencopy nomor faktur, NPWP, dan DPP dari tumpukan ratusan PDF Coretax, dengan risiko kesalahan input dan batas waktu pelaporan.",
    impactMetrics: [
      { label: "Waktu Proses per 100 PDF", value: "< 10 Menit (vs 4 Jam)" },
      { label: "Akurasi Ekstraksi", value: "100% Presisi" },
      { label: "Waktu Pembuatan Tool", value: "< 1 Jam (Inisiasi Awal)" },
      { label: "Peringkat Tim Tax FHI", value: "3 Besar Improvement Sprint" }
    ],
    keyFeatures: [
      "Batch PDF Extraction dari folder input ke output secara otomatis",
      "Pemisahan otomatis Sheet Pajak Masuk (22 baris) dan Pajak Keluar (8 baris)",
      "Ekspor file langsung ke Hasil Rekap Pajak.xlsx siap upload",
      "100% Offline & Aman (Tidak ada data finansial keluar ke internet)"
    ],
    builtIn: "Kurang dari 1 Jam",
    techStack: ["Python", "PDFParser", "OpenPyXL", "PyInstaller (.exe)"]
  },
  {
    id: "payslip-converter",
    name: "Payslip Converter (Hashmicro HC)",
    tagline: "Payroll Draft to Enterprise Human Capital Format Normalizer",
    domain: "Internal Web Converter",
    category: "Converter Tool",
    description: "Alat konversi instan berkas draft payroll excel menjadi format file impor terstandarisasi yang siap diunggah ke ERP Hashmicro Human Capital.",
    businessNeed: "Tim HC dan Payroll harus berulang kali melakukan mapping kolom manual antara draft gaji bulanan dengan kode sistem ERP Hashmicro (GP NEW, ALW1-ALW7, PPH21_TER_ALW, BPJS).",
    impactMetrics: [
      { label: "Waktu Formatting Slip", value: "Sekali Klik (< 3 Detik)" },
      { label: "Mapping Error", value: "0 Human Error" },
      { label: "Kompatibilitas", value: "Hashmicro HC ERP" },
      { label: "Waktu Pembuatan", value: "1 Hari Kerja" }
    ],
    keyFeatures: [
      "Drag & drop upload file draft payroll excel",
      "Mapping otomatis kode output (BASIC, ALW1 s/d ALW7, BPJS_KES, BPJS_TK)",
      "Validasi otomatis nilai numerik gaji pokok proporsional dan potongan",
      "Unduhan instan berkas hasil normalisasi"
    ],
    builtIn: "1 Hari Kerja",
    techStack: ["React", "SheetJS (XLSX)", "TypeScript", "Tailwind CSS"]
  }
];

export const OTHER_TOOLS_CATALOG = [
  { name: "ai-assistant-corporate", category: "AI & Automation", desc: "Corporate operational knowledge assistant untuk SOP internal" },
  { name: "ai-assistant-it", category: "AI & Automation", desc: "Asisten routing tiket IT & FAQ troubleshooting mandiri" },
  { name: "brieflinksync", category: "Integration", desc: "Sinkronisasi tautan berkas drive ke sistem laporan" },
  { name: "checking-API", category: "Developer Tool", desc: "Dashboard monitoring uptime endpoint layanan internal" },
  { name: "ci-cd", category: "DevOps", desc: "Automated build script untuk deployment ringan" },
  { name: "compiler-crm", category: "Operations", desc: "Kompilasi riwayat leads sales untuk pipeline mingguan" },
  { name: "converter-shipping-rate", category: "Converter Tool", desc: "Kalkulator konversi tarif logistik multi-kurir" },
  { name: "crawling-rate", category: "Data Tool", desc: "Parser perbandingan harga pasar kompetitor" },
  { name: "data-science", category: "Data Tool", desc: "Script analisis tren penjualan berbasis Python notebook" },
  { name: "desktop-mascot-assistant", category: "Productivity", desc: "Widget pengingat istirahat dan tugas harian" },
  { name: "dev-transparency-portal-system", category: "Web Portal", desc: "Dashboard transparansi progress proyek antar divisi" },
  { name: "document-generator", category: "Productivity", desc: "Pembuat template dokumen otomatis berbasis data" },
  { name: "EDIS & edis-db", category: "Enterprise App", desc: "Electronic Document Information System" },
  { name: "employee-org-dashboard", category: "HR Tool", desc: "Bagan struktur organisasi dan direktori kontak karyawan" },
  { name: "ethos-shorten-link", category: "Internal Service", desc: "Layanan URL shortener internal terisolasi" },
  { name: "focalboard-main", category: "Productivity", desc: "Board manajemen tugas mandiri tim internal" },
  { name: "gift-website", category: "HR Tool", desc: "Aplikasi klaim bingkisan perayaan tahunan karyawan" },
  { name: "hm-visualization", category: "Data Tool", desc: "Visualisasi data analitik Hashmicro Human Capital" },
  { name: "landing-page-builder", category: "Web Portal", desc: "Pembangun landing page drag-and-drop ringan" },
  { name: "laporan & openproject-mirroring", category: "Productivity", desc: "Generator rekap laporan tugas harian tim" },
  { name: "pdf-merger", category: "Converter Tool", desc: "Alat penggabung dan pemotong berkas PDF aman tanpa upload luar" },
  { name: "performa-test-web", category: "Developer Tool", desc: "Pengukur response time halaman internal" },
  { name: "project-master-reporting-system", category: "Enterprise App", desc: "Sistem pelaporan status proyek multi-unit" },
  { name: "python-exe", category: "Developer Tool", desc: "Distribusi bundler Python ke file Windows standalone" },
  { name: "room-booking-web", category: "Enterprise App", desc: "Versi web prototipe awal sistem pemesanan ruangan" },
  { name: "so-converter", category: "Converter Tool", desc: "Pengubah berkas Sales Order ke format rekap akuntansi" },
  { name: "stakeholder-project", category: "Productivity", desc: "Peta pemangku kepentingan dan matrik komunikasi" },
  { name: "uploader-web", category: "Internal Service", desc: "Portal penampung berkas lampiran berukuran besar" },
  { name: "voucher_system", category: "Operations", desc: "Verifikasi dan validasi kode promo operasional toko" },
  { name: "webhook-hetrix-fonnte", category: "Integration", desc: "Otomasi notifikasi downtime server ke WhatsApp" }
];

export const IMPACT_TABLE = [
  {
    aspek: "Time",
    sebelum: "Tertunda 1 - 3 bulan dalam antrean backlog developer IT",
    hasil: "Penurunan lead time pembuatan tools operasional dari hitungan bulan menjadi 1–5 hari kerja (< 1 jam untuk tool sederhana)",
    tag: "Efisiensi 95%"
  },
  {
    aspek: "Effort",
    sebelum: "Membutuhkan puluhan story points developer IT dan meeting teknis berulang",
    hasil: "Nol (0) story points atau jam kerja developer IT yang terpakai untuk tools mikro ini",
    tag: "0 IT Workload"
  },
  {
    aspek: "Efficiency",
    sebelum: "Proses rekap pajak dan payroll manual memakan waktu berhari-hari menjelang deadline",
    hasil: "Efisiensi waktu pemenuhan SLA tim Tax FHI (membantu pencapaian 3 Besar Improvement Sprint)",
    tag: "SLA Tercapai"
  },
  {
    aspek: "Safety",
    sebelum: "Dokumen Bupot, Faktur, dan link publik berisiko bocor dan disusupi malware",
    hasil: "Menurunkan keresahan terhadap isu keamanan data dan iklan pada shortlink/converter teratasi",
    tag: "Data Terjaga"
  },
  {
    aspek: "Morality / Branding",
    sebelum: "Tautan memakai Bitly/acesse.one pihak ketiga yang memunculkan iklan tidak profesional",
    hasil: "Tautan keluar dan portal kerja menggunakan nama resmi perusahaan (ethos.co.id) sehingga meningkatkan kepercayaan eksternal",
    tag: "100% Resmi"
  }
];

export const TESTIMONIAL_DATA = {
  quote: "Siang mas agung, tools nya udah kita coba dan hasilnya sudah sesuai mas. Terima kasih... brikut mas bintangnya, tak lebihin satu hehe ⭐⭐⭐⭐⭐⭐",
  user: "Tim Operasional / Tax & Finance",
  date: "20 Agustus 2026",
  context: "Umpan balik pasca implementasi Faktur & Bupot Extractor tool yang memangkas waktu kerja dari jam-jaman menjadi hitungan detik."
};

export const LEARNINGS_DATA = [
  {
    obstacle: "Standarisasi Lingkungan Server & Alur Deployment",
    explanation: "Prototipe awal dideploy secara terpisah di Server Self Manage atau GitHub Pages, belum memiliki infrastruktur staging terpusat di server internal Ethos.",
    mitigation: "Menyusun standarisasi template Docker Container dan berkoordinasi dengan tim IT Infrastructure untuk alokasi server terisolasi."
  },
  {
    obstacle: "Kebutuhan Panduan Mandiri bagi User Operasional",
    explanation: "User di departemen kadang bingung terkait penggunaan fungsi, input kolom data, fitur dan format hasil dari tools / sistem baru.",
    mitigation: "Menyusun panduan operasional ringkas (Quick Start Guide) 1 halaman dan menyediakan template file contoh langsung di dalam aplikasi."
  }
];

export const KEY_TAKEAWAYS = [
  {
    title: "Peran BA yang Lebih Dekat ke Solusi",
    desc: "Business Analyst yang memahami alur kerja bisnis secara langsung dapat mengeksekusi kebutuhan operasional secara presisi dengan bantuan AI, tanpa perlu alur birokrasi development yang panjang dan distorsi komunikasi dokumen bertingkat."
  },
  {
    title: "Validasi Nyata di Lapangan",
    desc: "Keberhasilan tools bukan diukur dari kecanggihan teknologinya semata, melainkan dari seberapa cepat tools tersebut menyelesaikan masalah harian tim kerja (terbukti dari pencapaian 3 Besar Tim Tax FHI, simplifikasi import Hashmicro HC, dan sistem support lainnya)."
  }
];

export const NEXT_STEPS = [
  {
    title: "Menjawab Hambatan Standarisasi Server",
    points: [
      "Berkoordinasi dengan tim IT Infrastructure untuk standardisasi lingkungan Docker Container dan alokasi subdomain resmi perusahaan.",
      "Migrasi seluruh supporting tools ke infrastruktur server internal yang terisolasi dan tersentralisasi secara aman."
    ]
  },
  {
    title: "Kebutuhan Panduan Mandiri & Sosialisasi",
    points: [
      "Membuat panduan ringkas terintegrasi pada setiap sistem / tools yang dibangun.",
      "Memberikan sosialisasi proaktif ke user departemen terkait pemanfaatan tools operasional mandiri."
    ]
  }
];

export const SLIDES_CONFIG: SlideItem[] = [
  {
    id: 1,
    slideNumber: 1,
    title: "AI-Driven Rapid Prototyping",
    subtitle: "Solusi Cepat Kebutuhan Operasional Departemen Tanpa Membebani Backlog IT",
    category: "intro",
    speakerNotes: "Selamat pagi dewan juri dan rekan-rekan Stand Up for Improvement Batch 5. Hari ini tim Business Analyst mempersembahkan bagaimana pemanfaatan AI Agentic Coding mampu mengatasi bottleneck operasional tanpa mengganggu developer IT."
  },
  {
    id: 2,
    slideNumber: 2,
    title: "Identifikasi Masalah",
    subtitle: "Keterikatan Tim IT & Penumpukan Backlog Operasional",
    category: "problem",
    speakerNotes: "Kita melihat realitas di lapangan: 100% kapasitas developer IT terikat pada Core System Ethos dan KPI utama perusahaan. Akibatnya, ada 117 antrean task IT mikro yang terdorong ke urutan paling bawah."
  },
  {
    id: 3,
    slideNumber: 3,
    title: "Analisis Akar Masalah",
    subtitle: "Fishbone Diagram (Manusia, Metode, Lingkungan, Teknologi)",
    category: "analysis",
    speakerNotes: "Melalui diagram sebab-akibat, masalah utama penumpukan backlog 1-3 bulan dan keresahan VP atas tools luar dipengaruhi oleh 4 faktor utama: SDLC konvensional, kapasitas dev, fokus core system, dan tools gratisan berisiko."
  },
  {
    id: 4,
    slideNumber: 4,
    title: "Analisis 5 Whys (Bagian 1)",
    subtitle: "Development Priority & Shadow IT",
    category: "analysis",
    speakerNotes: "Mengapa tertunda 1-3 bulan? Karena dev IT fokus penuh ke Core System. Mengapa memicu keresahan VP? Karena departemen terpaksa pakai tools gratisan luar (Bitly beriklan, acesse.one berisiko malware, konversi Bupot ke pihak ketiga)."
  },
  {
    id: 5,
    slideNumber: 5,
    title: "Analisis 5 Whys (Bagian 2)",
    subtitle: "Keterbatasan Metode Konvensional & Titik Balik BA",
    category: "analysis",
    speakerNotes: "Mengapa tidak dibuatkan solusi internal? Karena metode konvensional mewajibkan antrean SDLC koding dari nol dan BA sebelumnya hanya membuat FRD. Dengan AI, BA bisa langsung mengeksekusi kebutuhan."
  },
  {
    id: 6,
    slideNumber: 6,
    title: "Perbaikan yang Diujicobakan",
    subtitle: "Inisiatif Mandiri Tim BA Berbasis AI Agentic Coding",
    category: "solution",
    speakerNotes: "Solusi nyata: Tim BA mengambil inisiatif membangun sendiri tools mikro operasional menggunakan bantuan AI Agentic Coding. Hasilnya, selesai dalam hitungan hari bahkan < 1 hari kerja tanpa mengganggu dev IT."
  },
  {
    id: 7,
    slideNumber: 7,
    title: "Bukti Perbaikan: Kecepatan Inisiasi",
    subtitle: "Pembuatan Tools Kurang dari 1 Jam",
    category: "solution",
    speakerNotes: "Sebagai bukti konkret, kebutuhan parser Bupot yang dikirimkan via chat pukul 15.16 berhasil kami selesaikan dan serahkan untuk testing pada pukul 16.04 — kurang dari 1 jam kerja!"
  },
  {
    id: 8,
    slideNumber: 8,
    title: "Portofolio: Meethos (Booking Room)",
    subtitle: "booking.ethos.co.id - 203 Reservasi & 672 Jam Rapat",
    category: "portfolio",
    speakerNotes: "Sistem Meethos mengelola seluruh reservasi ruang rapat di Ethos. Telah mencatat 203 reservasi, 672 jam rapat, dan 1.493 partisipan dengan visualisasi okupansi lengkap."
  },
  {
    id: 9,
    slideNumber: 9,
    title: "Portofolio: link.ethos.co.id",
    subtitle: "Internal Shortlink & Bio Pages - 4.650 Traffic & 0 Iklan",
    category: "portfolio",
    speakerNotes: "link.ethos.co.id menggantikan Bitly beriklan dan domain pelacak luar. Telah menangani 4.650 interaksi dengan brand resmi ethos.co.id dan analitik trafik menyeluruh."
  },
  {
    id: 10,
    slideNumber: 10,
    title: "Portofolio: Bupot & Faktur Extractor",
    subtitle: "Penyelamat Waktu Tim Tax & Keamanan Data Finansial",
    category: "portfolio",
    speakerNotes: "Aplikasi Python otomatis untuk mengolah faktur pajak Coretax ke Excel Rekap Pajak. Menjamin 100% data keuangan internal tidak bocor ke server luar dan mengantarkan tim masuk 3 besar."
  },
  {
    id: 11,
    slideNumber: 11,
    title: "Portofolio: Payslip Converter",
    subtitle: "Normalisasi Data Payroll ke ERP Hashmicro HC",
    category: "portfolio",
    speakerNotes: "Mengubah file draft payroll menjadi format siap impor Hashmicro HC dengan mapping kode kompensasi dan potongan instan sekali klik."
  },
  {
    id: 12,
    slideNumber: 12,
    title: "Portofolio: 40+ Sistem & Tools Lainnya",
    subtitle: "Katalog Inisiatif Mikro yang Telah Dibangun",
    category: "portfolio",
    speakerNotes: "Inisiatif ini bukan hanya 1 atau 2 tools, melainkan lebih dari 40 repositori dan micro-tools operasional yang berhasil dibangun tim BA melayani berbagai kebutuhan unit kerja."
  },
  {
    id: 13,
    slideNumber: 13,
    title: "Dampak Positif Nyata",
    subtitle: "Kuantitatif & Kualitatif (Time, Effort, Efficiency, Safety, Morality)",
    category: "impact",
    speakerNotes: "Dampak terukur: Lead time turun dari bulanan jadi 1-5 hari, 0 story points dev IT terpakai, SLA tim Tax terpenuhi, isu kebocoran data tereliminasi, dan reputasi domain perusahaan meningkat."
  },
  {
    id: 14,
    slideNumber: 14,
    title: "Umpan Balik Pengguna",
    subtitle: "Testimoni Kepuasan Pengguna Operasional (Bintang 6)",
    category: "impact",
    speakerNotes: "Bukti kepuasan user operasional: user memberikan umpan balik bintang 6 karena kecepatan respons dan kesesuaian tool dengan alur kerja mereka."
  },
  {
    id: 15,
    slideNumber: 15,
    title: "Pembelajaran: Hambatan & Mitigasi",
    subtitle: "Standarisasi Server & Panduan Mandiri",
    category: "learning",
    speakerNotes: "Tantangan lapangan yang dihadapi: standarisasi server awal diselesaikan dengan Docker container template, dan kebingungan user dimitigasi dengan Quick Start Guide 1 halaman dan file template bawaan."
  },
  {
    id: 16,
    slideNumber: 16,
    title: "Pembelajaran: Nilai Strategis BA",
    subtitle: "Peran BA Dekat ke Solusi & Validasi Lapangan",
    category: "learning",
    speakerNotes: "Key learning: BA yang paham alur bisnis kini dapat mengeksekusi solusi langsung secara presisi dengan AI. Keberhasilan diukur bukan dari kerumitan tech stack, melainkan kecepatan problem solving harian."
  },
  {
    id: 17,
    slideNumber: 17,
    title: "Rencana Berikutnya",
    subtitle: "Standarisasi Infrastruktur & Sosialisasi Komprehensif",
    category: "roadmap",
    speakerNotes: "Langkah ke depan: Berkolaborasi dengan IT Infra untuk standarisasi Docker & alokasi subdomain resmi, migrasi supporting tools terpusat, serta pembuatan panduan mandiri dan sosialisasi masif."
  }
];
