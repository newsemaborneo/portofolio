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
            "Sistem kasir dan point of sale cloud untuk UMKM, dengan stok multi-cabang dan laporan otomatis.",
          role: "Fullstack Developer",
          stack: ["Laravel", "PHP", "MySQL", "JavaScript"],
          problem:
            "UMKM mencatat penjualan dan stok secara manual, rawan selisih dan lambat direkap.",
          solution:
            "LAKUPOS menyatukan kasir, stok lintas cabang, dan laporan otomatis dalam satu dashboard.",
          impact: "Multi-tenant dengan data tiap toko terisolasi.",
          liveUrl: "https://lakupos.my.id",
        },
        {
          slug: "siropa",
          name: "SI-ROPA",
          summary: "[DESKRIPSI SI-ROPA]",
          role: "Fullstack Developer",
          stack: ["PHP", "MySQL"],
          problem: "[DESKRIPSI]",
          solution: "[DESKRIPSI]",
          liveUrl: "https://siropa.my.id",
          pending: true,
        },
        {
          slug: "simaksu",
          name: "SIMAKSU",
          summary: "Sistem manajemen surat untuk Diskominfo.",
          role: "Fullstack Developer",
          stack: ["PHP", "MySQL"],
          problem: "[DESKRIPSI]",
          solution: "[DESKRIPSI]",
          liveUrl: "https://simaksu.my.id",
          pending: true,
        },
        {
          slug: "jurnal",
          name: "JURNAL",
          summary: "[DESKRIPSI JURNAL]",
          role: "Fullstack Developer",
          stack: ["TypeScript"],
          problem: "[DESKRIPSI]",
          solution: "[DESKRIPSI]",
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
      email: "[EMAIL]",
      github: "https://github.com/newsemaborneo",
      linkedin: "[LINKEDIN]",
      whatsapp: "[WHATSAPP]",
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
            "A cloud point of sale for small businesses, with multi-branch stock and automatic reports.",
          role: "Fullstack Developer",
          stack: ["Laravel", "PHP", "MySQL", "JavaScript"],
          problem:
            "Small businesses track sales and stock by hand, which is slow and error prone.",
          solution:
            "LAKUPOS brings checkout, cross-branch stock, and automatic reports into one dashboard.",
          impact: "Multi-tenant, with each store's data isolated.",
          liveUrl: "https://lakupos.my.id",
        },
        {
          slug: "siropa",
          name: "SI-ROPA",
          summary: "[SI-ROPA DESCRIPTION]",
          role: "Fullstack Developer",
          stack: ["PHP", "MySQL"],
          problem: "[DESCRIPTION]",
          solution: "[DESCRIPTION]",
          liveUrl: "https://siropa.my.id",
          pending: true,
        },
        {
          slug: "simaksu",
          name: "SIMAKSU",
          summary: "A mail management system for Diskominfo.",
          role: "Fullstack Developer",
          stack: ["PHP", "MySQL"],
          problem: "[DESCRIPTION]",
          solution: "[DESCRIPTION]",
          liveUrl: "https://simaksu.my.id",
          pending: true,
        },
        {
          slug: "jurnal",
          name: "JURNAL",
          summary: "[JURNAL DESCRIPTION]",
          role: "Fullstack Developer",
          stack: ["TypeScript"],
          problem: "[DESCRIPTION]",
          solution: "[DESCRIPTION]",
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
      email: "[EMAIL]",
      github: "https://github.com/newsemaborneo",
      linkedin: "[LINKEDIN]",
      whatsapp: "[WHATSAPP]",
      pendingLabel: "Coming soon",
    },
    footer: {
      rights: "Newsem Aborneo",
      backToTop: "Back to top",
    },
  },
};
