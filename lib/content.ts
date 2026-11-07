export type Locale = "id" | "en";

export interface Project {
  slug: string;
  name: string;
  summary: string;
  role: string;
  stack: string[];
  problem: string;
  solution: string;
  impact?: string;
  liveUrl?: string;
  pending?: boolean;
}

export interface SiteContent {
  nav: {
    work: string;
    services: string;
    about: string;
    contact: string;
    cta: string;
    langLabel: string;
  };
  hero: {
    name: string;
    role: string;
    tagline: string;
    scrollCue: string;
  };
  intro: {
    statement: string;
    bio: string;
    meta: string;
  };
  work: {
    title: string;
    subtitle: string;
    liveLabel: string;
    pendingLabel: string;
    projects: Project[];
  };
  services: {
    title: string;
    items: { title: string; description: string }[];
  };
  stack: {
    title: string;
    items: string[];
  };
  about: {
    title: string;
    body: string;
    cvLabel: string;
    cvPending: string;
  };
  contact: {
    title: string;
    lead: string;
    email: string;
    github: string;
    linkedin: string;
    whatsapp: string;
    pendingLabel: string;
  };
  footer: {
    rights: string;
    backToTop: string;
  };
}

const stackItems = [
  "Next.js",
  "TypeScript",
  "NestJS",
  "Laravel",
  "Node.js",
  "PHP",
  "MySQL",
  "Python",
  "Git",
];

export const content: Record<Locale, SiteContent> = {
  id: {
    nav: {
      work: "Karya",
      services: "Layanan",
      about: "Tentang",
      contact: "Kontak",
      cta: "Diskusikan proyek",
      langLabel: "EN",
    },
    hero: {
      name: "Newsem Aborneo",
      role: "Fullstack Engineer",
      tagline:
        "Membangun produk SaaS dan sistem internal dari database sampai antarmuka.",
      scrollCue: "Gulir",
    },
    intro: {
      statement:
        "Saya membangun aplikasi yang dipakai orang setiap hari, dari kasir UMKM sampai sistem instansi.",
      bio: "Fokus di backend dan fullstack: NestJS, Laravel, Node.js, dan Next.js. Saya suka sistem yang rapi, cepat, dan mudah dirawat.",
      meta: "Berbasis di Indonesia. Terbuka untuk kerja penuh waktu dan proyek freelance.",
    },
    work: {
      title: "Karya terpilih",
      subtitle: "Produk dan sistem nyata yang sudah berjalan.",
      liveLabel: "Lihat situs",
      pendingLabel: "Segera",
      projects: [
        {
          slug: "lakupos",
          name: "LAKUPOS",
          summary:
            "SaaS Point of Sales (POS) komprehensif multi-tenant dengan AI Business Assistant (NVIDIA NIM/Gemini RAG), WhatsApp Bot terintegrasi, dan manajemen multi-cabang.",
          role: "Lead Fullstack & AI Architect",
          stack: ["Laravel", "PHP", "MySQL", "NVIDIA NIM", "Google Gemini", "Tailwind CSS", "PWA"],
          problem:
            "Operasional ritel multi-cabang terfragmentasi antara kasir, gudang, pembelian, utang-piutang, serta minimnya analitik data real-time untuk keputusan strategis.",
          solution:
            "Membangun platform cloud POS terpadu dengan arsitektur multi-tenant, inventory sync lintas gudang, dan AI Asisten berbasis RAG untuk analisis penjualan & rekomendasi stok otomatis.",
          impact: "Multi-tenant arsitektur dengan isolasi data aman, offline caching PWA, serta bot WhatsApp otomatis untuk pesanan online.",
          liveUrl: "https://lakupos.my.id",
        },
        {
          slug: "siropa",
          name: "SI-ROPA",
          summary: "Sistem Informasi Kepatuhan Pelindungan Data Pribadi (UU No. 27/2022) untuk Dinas Komunikasi dan Informatika Provinsi Kalimantan Barat.",
          role: "Fullstack Developer",
          stack: ["Laravel", "PHP 8.3", "Vue.js 3", "Inertia.js", "Tailwind CSS", "MySQL"],
          problem: "Inventarisasi 33 field wajib kepatuhan pemrosesan data pribadi dan penilaian risiko DPIA tersebar tanpa audit trail terstruktur.",
          solution: "Membangun sistem terpusat dengan register ROPA multi-tab, screening & assessment DPIA 2-tahap, pemantauan insiden PDP (SLA 3x24 jam), dan MFA authentication.",
          impact: "Mendukung implementasi kepatuhan tata kelola data pemerintahan berstandar UU PDP di Kalimantan Barat.",
          liveUrl: "https://siropa.my.id",
          pending: false,
        },
        {
          slug: "simaksu",
          name: "SIMAKSU",
          summary: "Sistem Informasi Manajemen Arsip dan Surat Masuk/Keluar Diskominfo dengan disposisi digital berjenjang dan pohon pelacakan real-time.",
          role: "Backend & Fullstack Developer",
          stack: ["NestJS v12", "TypeScript", "Vue 3", "TypeORM", "MySQL", "JWT/RBAC"],
          problem: "Pengelolaan surat fisik konvensional rentan tercecer, birokrasi tanda tangan lambat, dan disposisi bawahan sulit dipantau progresnya.",
          solution: "Membangun engine persuratan digital berbasis NestJS dengan disposisi multi-level parent-child tree (/dispositions/tree/:id), penomoran otomatis AG/sequence, dan audit log append-only.",
          impact: "Memangkas birokrasi persuratan dinas dan aktif memproses ratusan korespondensi resmi secara auditable.",
          liveUrl: "https://simaksu.my.id",
          pending: false,
        },
        {
          slug: "jurnal",
          name: "Djoernal Asistent",
          summary: "Chrome Extension (Manifest V3) asisten riset cerdas & literature review bertenaga AI untuk Google Scholar dan naskah skripsi.",
          role: "Creator & Frontend/Extension Engineer",
          stack: ["Chrome MV3", "TypeScript", "React", "Vite", "OpenAlex API", "Tailwind CSS"],
          problem: "Mahasiswa dan peneliti kesulitan menyaring ribuan jurnal di Google Scholar, mensintesis matriks literatur Bab 2, dan memeriksa kepatuhan naskah skripsi.",
          solution: "Mengembangkan floating assistant dengan smart keyword generator 10+ query, 1-click citation (APA/IEEE/BibTeX), matriks literatur export CSV, dan scanner naskah laporan PDF/DOCX.",
          impact: "Mempercepat proses penyusunan literature review dan analisis research gap secara instan langsung di Google Scholar.",
          pending: true,
        },
      ],
    },
    services: {
      title: "Yang bisa saya kerjakan",
      items: [
        {
          title: "Aplikasi web fullstack",
          description:
            "Dari database sampai antarmuka, siap dipakai tim dan tumbuh bersama bisnis.",
        },
        {
          title: "Backend dan API",
          description:
            "API, autentikasi, dan integrasi yang aman, terukur, dan mudah dirawat.",
        },
        {
          title: "Sistem internal",
          description:
            "Mendigitalkan alur kerja instansi dan bisnis jadi satu sistem yang rapi.",
        },
      ],
    },
    stack: {
      title: "Stack yang saya pakai",
      items: stackItems,
    },
    about: {
      title: "Tentang",
      body: "Saya Newsem Aborneo, fullstack engineer. Saya mengerjakan produk komersial dan sistem internal, dengan perhatian pada performa, keamanan, dan kemudahan perawatan.",
      cvLabel: "Unduh CV",
      cvPending: "CV menyusul",
    },
    contact: {
      title: "Mari bekerja sama",
      lead: "Punya proyek atau posisi yang cocok? Kirim pesan singkat soal kebutuhanmu.",
      email: "newsemaborneonewsem@gmail.com",
      github: "https://github.com/newsemaborneo",
      linkedin: "[LINKEDIN]",
      whatsapp: "081348686348",
      pendingLabel: "Menyusul",
    },
    footer: {
      rights: "Newsem Aborneo",
      backToTop: "Kembali ke atas",
    },
  },
  en: {
    nav: {
      work: "Work",
      services: "Services",
      about: "About",
      contact: "Contact",
      cta: "Start a project",
      langLabel: "ID",
    },
    hero: {
      name: "Newsem Aborneo",
      role: "Fullstack Engineer",
      tagline:
        "Building SaaS products and internal systems from the database to the interface.",
      scrollCue: "Scroll",
    },
    intro: {
      statement:
        "I build applications people use every day, from small-business point of sale to government systems.",
      bio: "Focused on backend and fullstack work with NestJS, Laravel, Node.js, and Next.js. I care about systems that stay fast, readable, and easy to maintain.",
      meta: "Based in Indonesia. Open to full-time roles and freelance projects.",
    },
    work: {
      title: "Selected work",
      subtitle: "Real products and systems that are already running.",
      liveLabel: "Visit site",
      pendingLabel: "Coming soon",
      projects: [
        {
          slug: "lakupos",
          name: "LAKUPOS",
          summary:
            "A comprehensive multi-tenant SaaS Point of Sales with an AI Business Assistant (NVIDIA NIM/Gemini RAG), integrated WhatsApp Bot, and multi-warehouse management.",
          role: "Lead Fullstack & AI Architect",
          stack: ["Laravel", "PHP", "MySQL", "NVIDIA NIM", "Google Gemini", "Tailwind CSS", "PWA"],
          problem:
            "Multi-branch retail operations struggle with fragmented checkouts, siloed warehouses, purchasing, debt management, and lack of real-time predictive analytics.",
          solution:
            "Built a centralized cloud POS platform with multi-tenant architecture, multi-warehouse inventory sync, and a RAG-powered AI business assistant for automated sales insights & stock recommendations.",
          impact: "True multi-tenant data isolation, offline caching via PWA service workers, and automated customer order processing via WhatsApp AI Bot.",
          liveUrl: "https://lakupos.my.id",
        },
        {
          slug: "siropa",
          name: "SI-ROPA",
          summary: "Personal Data Protection (UU No. 27/2022) Compliance Information System for Diskominfo West Kalimantan Provincial Government.",
          role: "Fullstack Developer",
          stack: ["Laravel", "PHP 8.3", "Vue.js 3", "Inertia.js", "Tailwind CSS", "MySQL"],
          problem: "Auditing 33 mandatory statutory PDP compliance fields and 2-stage DPIA risk assessments across government units lacked centralized governance and audit trails.",
          solution: "Delivered a centralized platform featuring multi-tab ROPA registration, 2-stage DPIA assessment, incident response tracking (3x24h SLA), and MFA session auth.",
          impact: "Powers institutional personal data protection governance compliance across provincial agencies in West Kalimantan.",
          liveUrl: "https://siropa.my.id",
          pending: false,
        },
        {
          slug: "simaksu",
          name: "SIMAKSU",
          summary: "Official incoming and outgoing correspondence management platform for Diskominfo with tiered digital routing and real-time disposition tracking trees.",
          role: "Backend & Fullstack Developer",
          stack: ["NestJS v12", "TypeScript", "Vue 3", "TypeORM", "MySQL", "JWT/RBAC"],
          problem: "Paper correspondence was prone to physical loss, slow bureaucratic sign-offs, and untracked subordinate disposition progress.",
          solution: "Engineered a digital mail orchestration engine with multi-level parent-child tree tracking (/dispositions/tree/:id), automated AG/sequence numbering, and append-only audit logging.",
          impact: "Eliminated bureaucratic bottlenecks and actively processes hundreds of official administrative records every month.",
          liveUrl: "https://simaksu.my.id",
          pending: false,
        },
        {
          slug: "jurnal",
          name: "Djoernal Asistent",
          summary: "Manifest V3 Chrome Extension powered by AI for smart literature reviews, Google Scholar search synthesis, and manuscript auditing.",
          role: "Creator & Frontend/Extension Engineer",
          stack: ["Chrome MV3", "TypeScript", "React", "Vite", "OpenAlex API", "Tailwind CSS"],
          problem: "Students and academic researchers spend days manually sifting search results, compiling Chapter 2 literature matrices, and checking thesis compliance.",
          solution: "Engineered a floating assistant with offline smart keyword generation, 1-click citation generators (APA/IEEE/BibTeX), automated literature matrices, and full PDF/DOCX manuscript rubric auditing.",
          impact: "Radically accelerates literature review synthesis and research gap analysis directly inside Google Scholar.",
          pending: true,
        },
      ],
    },
    services: {
      title: "What I can build",
      items: [
        {
          title: "Fullstack web apps",
          description:
            "From database to interface, ready to ship and ready to grow with the business.",
        },
        {
          title: "Backend and APIs",
          description:
            "APIs, authentication, and integrations that stay secure, measured, and maintainable.",
        },
        {
          title: "Internal systems",
          description:
            "Digitizing workflows for organizations and businesses into one clean system.",
        },
      ],
    },
    stack: {
      title: "My stack",
      items: stackItems,
    },
    about: {
      title: "About",
      body: "I am Newsem Aborneo, a fullstack engineer. I work on commercial products and internal systems, with care for performance, security, and maintainability.",
      cvLabel: "Download CV",
      cvPending: "CV coming soon",
    },
    contact: {
      title: "Let's work together",
      lead: "Have a project or a role that fits? Send a short note about what you need.",
      email: "newsemaborneonewsem@gmail.com",
      github: "https://github.com/newsemaborneo",
      linkedin: "[LINKEDIN]",
      whatsapp: "081348686348",
      pendingLabel: "Coming soon",
    },
    footer: {
      rights: "Newsem Aborneo",
      backToTop: "Back to top",
    },
  },
};
