# Design Doc: Portfolio Landing Page "Newsem Aborneo"

- Tanggal: 2026-11-07
- Status: draft, menunggu approval
- Pemilik: Newsem Aborneo (newsemaborneo)
- Filter aktif: antislop mode DURING

## 1. Intent & Why

Membangun landing page portofolio pribadi yang menjual Newsem sebagai fullstack engineer yang membangun produk dan sistem nyata. Tujuan ganda:

1. Cari kerja: recruiter cepat melihat kredibilitas, stack, dan studi kasus.
2. Cari client freelance: pengunjung mengerti layanan dan bisa langsung menghubungi.
3. Personal branding: pengalaman visual yang berkesan dan diingat.

Pengalaman utama yang diminta: saat halaman di-scroll, visual bergerak seperti video. Ini jadi signature experience, bukan dekorasi.

## 2. Goals

- First impression kuat dalam kurang dari 5 detik: siapa Newsem, posisinya, dan bukti kerja.
- Scroll-driven cinematic hero yang halus di desktop dan nyaman di mobile.
- Menampilkan 4 studi kasus nyata: LAKUPOS, SI-ROPA, SIMAKSU, JURNAL.
- CTA jelas untuk recruiter (CV) dan client (hubungi).
- Performa baik: cepat dimuat, tidak jank saat scroll.

## 3. Non-Goals

- Tidak membuat blog, CMS, atau dashboard.
- Bukan multi-bahasa berbasis routing/SEO penuh. Bilingual ID/EN cukup via toggle ringan di client.
- Tidak membuat backend sendiri. Kontak via mailto/WhatsApp.
- Tidak menampilkan repo publik lama (Fire-Detection, kitaKos, dll) sesuai arahan.
- Tidak membangun animasi 3D/WebGL di iterasi pertama.

## 4. Anti-Goals (dianggap gagal walau "jalan")

- Terasa seperti template portofolio generik.
- Animasi scroll membuat halaman berat atau lag, terutama di HP.
- Scroll-jacking agresif yang membingungkan.
- Konten placeholder yang tidak akurat soal proyek.
- Memakai pola slop: gradient biru-ungu, glow di mana-mana, glassmorphism, badge dekoratif, ikon generik, emoji di UI, statistik karangan.

## 5. Audiens

- Recruiter teknis / hiring manager: ingin lihat stack, peran, dampak, CV.
- Calon client UMKM/instansi: ingin lihat bukti produk live dan cara menghubungi.
- Sesama developer/komunitas: personal branding, kualitas eksekusi.

## 6. Constraints

- Framework: Next.js (App Router) saja, TypeScript.
- Proyek baru di `/home/sem/project_individu/portofolio` (folder kosong).
- Proyek private tidak diberi link repo. Hanya link live untuk yang ada.
- Link live: `lakupos.my.id`, `siropa.my.id`, `simaksu.my.id`. Jurnal belum ada link.
- Aset video/foto hero belum tersedia saat mulai build. v1 memakai visual procedural.
- Copy bilingual ID/EN via toggle di client (disimpan di localStorage), bukan routing.

## 7. Design Read & Dials (antislop)

Reading this as: portfolio landing page for recruiters, freelance clients, and developer community, in a cinematic editorial style, dial ENERGY 3 / RHYTHM 3 / MOTION 3.

- ENERGY 3: halaman harus "menyapa" keras lewat tipografi besar dan hero sinematik. Portfolio ini sendiri adalah bukti skill frontend.
- RHYTHM 3: tiap section beda komposisi. Tidak boleh seragam "judul tengah + grid kartu".
- MOTION 3: parallax, pinned hero, choreography. Boleh, karena demonstrasi motion adalah bagian dari nilai jual, bukan hiasan.

## 8. Opsi Animasi Yang Dipertimbangkan

- A. Scroll-driven image sequence (dipilih): scroll memutar deretan frame di canvas. Paling sesuai permintaan, paling berkesan. Trade-off: butuh aset frame dan perhatian performa.
- B. Video loop + parallax + reveal: lebih ringan, tapi tidak benar-benar dikendalikan scroll.
- C. Still image + Ken Burns/parallax: paling ringan, efek video paling minim.

Dipilih A karena permintaan eksplisit: saat scroll ke bawah, halaman seperti animasi video. Fallback ke perilaku mirip B/C saat aset tidak tersedia atau reduced-motion.

## 9. Visual Direction

### 9.1 Theme: dark tetap, dengan alasan

Tema gelap dipilih karena visual scroll-driven adalah identitas utama dan butuh latar gelap agar gerak cahaya dan aksen terbaca jelas. Audiens developer/creative juga terbiasa dengan tema gelap. Ini alasan identitas, bukan "dark karena terlihat tech".

- Rekomendasi tetap satu tema (dark) untuk v1.
- Toggle terang/gelap tidak dibuat di v1 karena bisa memecah fokus hero sinematik dan menambah permukaan QA. Bila diminta, toggle dibuat penuh dan diuji di dua mode (R-34).

### 9.2 Palette: 2 core + 1 aksen

| Token | Nilai | Peran |
|-------|-------|-------|
| `ink` | `#0B0C0E` | latar utama (core netral) |
| `paper` | `#F2F0EA` | teks utama, off-white hangat (core netral) |
| `muted` | `#8C9098` | teks sekunder (netral) |
| `line` | `#22252B` | garis halus (netral) |
| `accent` | `#2E9EF7` | aksen tunggal, dari identitas GitHub Newsem |

Alasan: `#2E9EF7` diambil dari README/identitas GitHub sebagai warna tanda tangan. Aksen dipakai hanya di momen kunci: status aktif, link penting, satu momen di hero. Tidak dipakai untuk semua tombol, ikon, border, dan background sekaligus.

Dihapus dari rancangan awal: aksen violet dan emerald serta gradient biru-ungu. Itu pola slop tanpa tujuan hierarki.

### 9.3 Typography, dengan alasan

| Peran | Font | Alasan |
|-------|------|--------|
| Display | Syne (Google Fonts) | Bentuk geometris lebar dengan karakter editorial/agency, tidak generik. Cocok untuk hero berbasis nama. |
| Body | Instrument Sans (Google Fonts) | Bersih, sedikit condensed, mudah dibaca di ukuran kecil, tidak se-umum Inter. |
| Label | Instrument Sans, sentence case, tracking normal | Menghindari kostum "mono/uppercase wide tracking" yang jadi ciri slop. |

Skala: hero `clamp(3rem, 9vw, 9rem)`, H2 `clamp(2rem, 4.5vw, 4rem)`, body 16 sampai 18px. Line length dijaga 60 sampai 75 karakter.

Dihapus dari rancangan awal: Space Grotesk, Inter, JetBrains Mono, karena termasuk roster default AI tanpa alasan merek.

### 9.4 Spacing, Grid, dan Permukaan

- Grid 12 kolom, lebar maksimum 1240px, gutter 24px.
- Ritme vertikal bervariasi: hero full-bleed, section lain 96 sampai 160px, tapi tidak semua sama.
- Radius kecil dan konsisten: 8px untuk kontrol, 16px hanya untuk panel besar. Bukan semua serba pill.
- Shadow hanya untuk satu atau dua elemen elevasi. Bukan default di semua kartu.
- Noise/grain sangat tipis hanya di hero untuk tekstur, dengan alasan tekstur sinematik. Tidak dipakai di seluruh halaman.

### 9.5 Motion, dengan tujuan tertulis

- Signature: scroll-scrub visual di hero. Tujuan: membuat kunjungan berkesan dan mendemonstrasikan skill frontend.
- Pendukung: reveal per baris saat section masuk, parallax tipis pada visual proyek.
- Tidak ada loop tanpa henti. Tidak ada animasi Fade Up + Floating + Scale + Bounce sekaligus.
- `prefers-reduced-motion`: matikan scrub, ganti ke fade/static.

### 9.6 Aturan Dekorasi

- Tidak ada background grid/blueprint/dot.
- Tidak ada glow di kartu, tombol, badge, ikon, background sekaligus.
- Tidak ada glassmorphism di navbar + kartu + modal sekaligus.
- Tidak ada badge dekoratif di atas H1.
- Tidak ada emoji di UI.
- Ikon hanya jika relevan dan sudah disepakati. Bila tidak perlu, tanpa ikon.
- Tidak ada panah di semua tombol. Hanya di CTA yang memang butuh arah.

## 10. Struktur Halaman (ritme bervariasi)

```
Nav sticky minimal: Work, Services, About, Contact, toggle ID/EN, CTA "Diskusikan proyek"
│
├─ HERO full-bleed, pinned sekitar 300vh
│     Nama besar (Syne) di kiri bawah, meta kecil di kanan atas,
│     canvas visual bergerak mengikuti scroll, scroll cue
│
├─ INTRO asimetris
│     Statement besar di kiri, bio singkat + meta di kanan
│
├─ SELECTED WORK editorial, bukan grid kartu seragam
│     LAKUPOS sebagai flagship (band full-width, visual besar)
│     SI-ROPA, SIMAKSU, JURNAL sebagai baris bergantian kiri/kanan
│     Tiap studi kasus: peran, stack, masalah, solusi, dampak, tombol
│     "Lihat situs" (Jurnal tanpa link)
│
├─ SERVICES sebagai daftar ringkas
│     Fullstack Web App, Backend/API, Sistem Internal & Integrasi
│     Daftar dengan deskripsi inline, bukan 3 kartu seragam
│
├─ STACK sebagai dinding tipografi statis
│     Next.js, TS, NestJS, Laravel, Node, PHP, MySQL, Python, Git
│     (tanpa marquee loop tanpa henti)
│
├─ ABOUT split: narasi + placeholder foto
│     tombol "Unduh CV"
│
├─ CONTACT tipografi besar
│     email, GitHub, LinkedIn, WhatsApp (placeholder sampai data asli)
│
└─ FOOTER satu baris, link nyata saja
```

## 11. Konten Studi Kasus

Format per proyek: judul, satu baris ringkas, peran, stack, masalah ke solusi, dampak/angka bila nyata, tombol "Lihat situs" (kecuali Jurnal). Semua teks punya versi ID dan EN. Screenshot asli diizinkan untuk semua produk. Data sensitif/PII wajib disamarkan sebelum dipakai.

Catatan konten:
- LAKUPOS: POS cloud UMKM, kasir, stok multi-cabang, laporan otomatis, analisis AI, multi-tenant.
- SI-ROPA: deskripsi menyusul dari pemilik.
- SIMAKSU: sistem untuk Diskominfo, terkait manajemen surat. Konfirmasi menyusul.
- JURNAL: aplikasi jurnal, TypeScript. Deskripsi menyusul.

## 12. Arsitektur Animasi Scroll

- Hero: section tinggi sekitar 300vh, konten dalam `position: sticky` 100vh.
- `<canvas>` full-viewport merender visual procedural (v1) atau frame sequence (upgrade).
- Progress scroll 0 sampai 1 di dalam hero memetakan ke frame/gerak visual, digambar via `requestAnimationFrame` dengan lerp agar halus.
- Overlay teks fade/scale berdasarkan progress dan hilang sebelum sequence selesai.
- Smooth scroll memakai Lenis tanpa scroll-jacking ekstrem. Scroll native dan keyboard tetap jalan.
- Section lain memakai Framer Motion (`whileInView`, reveal per baris, parallax tipis).

### 12.1 Fallback & Aset

- v1 memakai mode procedural cinematic di canvas (flow field atau gradient mesh yang di-scrub scroll) agar terasa seperti video tanpa aset berat. Engine siap menerima frame sequence nyata nanti.
- Mobile atau perangkat low-end: turunkan kompleksitas visual, atau ganti ke visual statis dengan parallax ringan.
- `prefers-reduced-motion`: hero statis + fade.

## 13. Tech Stack & Struktur

- Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion (`motion`) + Lenis.
- Ikon hanya jika relevan. Bila perlu, pilih ikon karena maknanya, bukan karena style library-nya.
- Font via `next/font`. Gambar via `next/image`.
- Struktur:

```
portofolio/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    nav/
    hero/
    sections/ (intro, work, services, stack, about, contact, footer)
    ui/ (button, reveal, project-row)
  lib/ (motion, scroll, content with id/en)
  public/ (images/, cv/)
  docs/superpowers/specs/
```

- Konten terpusat di `lib/content.ts` dengan dua locale (`id`/`en`).
- Deploy target default Vercel. Domain final menyusul.

## 14. Performa, Aksesibilitas, Responsif

- Target: LCP kurang dari 2.5s, CLS mendekati 0, animasi 60fps di desktop mid-range. Angka ini target, bukan klaim terukur.
- Preload aset kritis, lazy-load section bawah, batasi DPR canvas, tidak memuat video besar.
- Kontras AA, focus-visible jelas, navigasi keyboard, heading semantik, alt text, ARIA pada elemen interaktif.
- Responsif penuh dari 360px sampai desktop lebar, tanpa overflow horizontal.
- Setiap media punya dimensi/aspect-ratio. Hero visual bukan elemen lazy.
- `prefers-reduced-motion` dihormati.

## 15. Konten: Placeholder & Launch Gate

Build dimulai dengan placeholder yang jelas untuk item berikut, lalu diganti sebelum launch:

- Foto profesional: placeholder `[FOTO]`.
- CV: tombol disabled atau label "CV menyusul" sampai file ada.
- LinkedIn, WhatsApp, email publik: placeholder yang terlihat, bukan link palsu.
- Deskripsi SI-ROPA dan JURNAL: `[DESKRIPSI]` sampai diisi.

Launch gate: selama data kontak/CV belum masuk, halaman belum dinyatakan launchable. Halaman boleh di-develop dan direview dengan placeholder yang jelas.

## 16. Acceptance Criteria

- Hero memutar visual halus mengikuti scroll, tidak jank di desktop dan HP umum.
- Semua 4 studi kasus tampil dengan link live benar (Jurnal tanpa link).
- Toggle ID/EN mengganti seluruh copy dan tersimpan saat reload.
- CTA "Unduh CV" dan "Hubungi" berfungsi setelah data asli terpasang.
- Placeholder terlihat jelas dan tidak menyamar sebagai data final.
- Tidak ada em dash di teks UI.
- Kontras AA, keyboard bisa dipakai penuh, focus terlihat.
- `prefers-reduced-motion` menonaktifkan scrub dengan benar.
- Tampil rapi 360px sampai desktop lebar, tanpa overflow.
- Tidak ada pola slop dari daftar section 9.6.

## 17. Keputusan Builder (silakan dicek)

- Kontak memakai direct links (mailto + WhatsApp deep link). Tanpa form service.
- Draft konten studi kasus disusun builder dari situs live publik, lalu diverifikasi pemilik. Screenshot hanya dipakai setelah disamarkan dari PII.
- Target perangkat: HP mid-range umum di 4G. Di low-end, hero turun ke static/parallax ringan.
- Bilingual memakai satu sumber konten dengan dua locale di `lib/content.ts`, default `id`.
- Hosting default Vercel.

## 18. Keputusan Pemilik (sudah dijawab)

- Bahasa: bilingual ID/EN.
- Hero: v1 procedural canvas, siap di-upgrade ke frame sequence.
- Screenshot: boleh menampilkan semua produk, data sensitif disamarkan.
- Konten: placeholder dulu, diganti sebelum launch.
