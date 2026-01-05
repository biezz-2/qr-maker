# 🚀 QR MAKER - Next Generation QR Code Generator

<div align="center">

![QR Maker Banner](https://img.shields.io/badge/QR%20Maker-v1.0-38bdf8?style=for-the-badge&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Bun](https://img.shields.io/badge/Bun-1.3-fbf0df?style=for-the-badge&logo=bun)

*A modern, futuristic QR code generator built with cutting-edge technologies*

[**🟢 Try Live Demo →**](https://qr-maker.biezz.my.id/)

</div>

---

## 📋 Daftar Isi

1. [Tentang Proyek](#tentang-proyek)
2. [Fitur Utama](#fitur-utama)
3. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4. [Arsitektur Sistem](#arsitektur-sistem)
5. [Struktur Proyek](#struktur-proyek)
6. [Instalasi & Konfigurasi](#instalasi--konfigurasi)
7. [Panduan Penggunaan](#panduan-penggunaan)
8. [API Reference](#api-reference)
9. [Deployment](#deployment)
10. [Kontribusi](#kontribusi)
11. [Lisensi](#lisensi)

---

## 🔮 Tentang Proyek

**QR Maker** adalah generator kode QR modern yang dibangun dengan teknologi tercanggih saat ini. Aplikasi web ini memungkinkan pengguna untuk membuat kode QR yang disesuaikan dengan kebutuhan mereka, mulai dari URL sederhana hingga konfigurasi WiFi yang kompleks.

### Visi & Misi

Visi kami adalah menyediakan alat pembuat kode QR yang paling intuitif, powerful, dan mudah digunakan di internet. Dengan antarmuka pengguna yang elegan dan fitur-fitur canggih, kami memastikan setiap pengguna dapat menghasilkan kode QR profesional dalam hitungan detik.

### Target Pengguna

| Kategori | Penggunaan |
|----------|------------|
| 🧑‍💼 **Pengusaha & Pebisnis** | Materi pemasaran dan informasi kontak |
| 👨‍💻 **Developer** | Proyek yang memerlukan integrasi kode QR |
| 🎨 **Content Creator** | Tautan media sosial dan portofolio |
| 👥 **Pengguna Umum** | Kebutuhan sehari-hari |

---

## ✨ Fitur Utama

### 1. 📱 Multi-Format Konten

#### URL Kode QR
Bangun kode QR untuk tautan website dengan dukungan:
- Input URL otomatis dengan validasi format
- Preview real-time saat mengetik
- Dukungan panjang URL tanpa batas

#### Teks Biasa
Enkripsi teks arbitrary ke dalam kode QR:
- Dukungan Unicode penuh
- Karakter khusus dan emoji
- Panjang teks hingga 1000+ karakter

#### Email
Buat kode QR untuk pengiriman email:
- Alamat email tujuan
- Subjek email (opsional)
- Isi pesan email (opsional)
- Format RFC compliant `mailto:` protocol

#### Nomor Telepon
Dukungan format telepon internasional:
- Format internasional (+62, +1, dll.)
- Auto-format untuk kemudahan
- Dukungan ekstensi telepon

#### WiFi
Generate kode QR untuk koneksi WiFi instan:
- Dukungan WPA/WPA2
- Dukungan WEP
- Jaringan terbuka (tanpa password)
- SSID tersembunyi

### 2. 🎨 Kustomisasi Visual

#### Warna & Kontras
Kontrol penuh atas penampilan visual:
- **Warna Depan (QR Code)** - Hex color picker + input manual
- **Warna Latar Belakang** - Solid color atau gambar custom
- **Kontras Tinggi** - Algoritma optimasi otomatis
- **Mode Gelap/Terang** - Tema otomatis berbasis sistem

#### Logo & Branding
Tambahkan identitas brand ke dalam kode QR:

| Fitur | Deskripsi |
|-------|-----------|
| **Upload Logo** | Format PNG, JPG, WebP, GIF |
| **Mode Auto-Fit** | Penyesuaian otomatis dengan aspect ratio |
| **Mode Manual** | Kontrol ukuran persentase |
| **Bingkai Circular** | Area logo dengan background circular |
| **Maksimum 22%** | Batas ukuran untuk menjaga scannability |

#### Gambar Latar Belakang
Buat kode QR yang estetis dengan background custom:
- **Drag & Drop** - Upload intuitif
- **Opacity Control** - Pengaturan transparansi 10-100%
- **Cover Mode** - Gambar otomatis menyesuaikan canvas
- **Fallback Color** - Warna cadangan untuk area kosong

### 3. ⚙️ Pengaturan Teknis

#### Tingkat Koreksi Error
Pilih tingkat redundansi data:

| Level | Persentase | Penggunaan |
|-------|------------|------------|
| **Low (L)** | 7% | Kode QR bersih |
| **Medium (M)** | 15% | Balance umum |
| **Quartile (Q)** | 25% | Untuk background/warna |
| **High (H)** | 30% | Maksimal untuk logo/cetak |

#### Ukuran Kode QR
Slider interaktif dengan rentang:
- **Minimum**: 128px
- **Maximum**: 512px
- **Step**: 32px
- **Responsive preview** untuk mobile

### 4. 💾 Ekspor & Download

#### Format Unduhan
- **PNG High Quality** - Lossless compression
- **Transparent Background** - Opsi khusus
- **Auto Naming** - Timestamp-based filename
- **Direct Download** - Tanpa redirect

---

## 🛠️ Teknologi yang Digunakan

### Core Framework

#### Next.js 15
Framework React tercanggih dengan fitur:
- **App Router** - Routing modern berbasis filesystem
- **Server Components** - Rendering sisi server otomatis
- **Streaming SSR** - First contentful paint cepat
- **Server Actions** - Mutasi data tanpa API endpoint
- **Partial Prerendering** - Hybrid rendering optimal

#### TypeScript 5
Type safety komprehensif:
- **Strict Mode** - Error prevention maksimal
- **Generic Types** - Reusable component logic
- **Type Inference** - Automatic type detection
- **Decorator Support** - Stage 3 proposal

### Styling & UI

#### Tailwind CSS 4
Utility-first CSS dengan inovasi:
- **Zero-runtime** - CSS generation optimal
- **CSS Variables** - Theming native
- **@import & @theme** - Modern syntax
- **JIT Engine** - Just-in-time compilation

#### shadcn/ui
Component library berbasis Radix UI:
- **Accessible** - WCAG 2.1 compliant
- **Headless** - Full customization freedom
- **Copy-paste** - Own your components
- **Type-safe** - Written in TypeScript

#### Lucide React
Ikonografi modern:
- **Consistent Design** - Unified visual language
- **Tree-shakable** - Small bundle size
- **Customizable** - Stroke, size, color props

#### Framer Motion
Animasi production-ready:
- **Spring Physics** - Natural motion feel
- **Layout Animations** - Smooth transitions
- **Gesture Support** - Drag, hover, tap
- **Exit Animations** - Polymorphic unmounts

### State Management & Data

#### Zustand
Global state management:
- **Minimal Boilerplate** - Simple API
- **DevTools** - Debugging built-in
- **Middleware Support** - Persistence, logging
- **Type-safe** - TypeScript native

#### TanStack Query
Server state synchronization:
- **Caching** - Intelligent cache invalidation
- **Prefetching** - Speculative execution
- **Mutations** - Server state updates
- **DevTools** - Query inspection

### Database & Backend

#### Prisma ORM
Type-safe database access:
- **Auto-generated Types** - Zero manual typing
- **Migration System** - Version-controlled schema
- **Query Engine** - Optimized SQL generation
- **Multi-database** - PostgreSQL, MySQL, SQLite

#### NextAuth.js
Authentication solution:
- **OAuth Providers** - Google, GitHub, etc.
- **Credentials Auth** - Email/password
- **JWT Sessions** - Stateless authentication
- **Security Headers** - CSRF, XSS protection

### Utilities & Helpers

#### React Hook Form
Performant form handling:
- **Uncontrolled Inputs** - Minimal re-renders
- **Validation** - Zod integration
- **Error Handling** - Detailed error messages
- **Performance** - 10x faster than controlled

#### Zod
Schema validation:
- **Type Inference** - Compile-time types
- **Error Mapping** - Human-readable messages
- **Async Support** - Server validation
- **TypeScript Native** - No runtime overhead

#### Date-fns
Modern date utilities:
- **Tree-shakable** - Import only what you need
- **Immutable** - Pure function approach
- **Locale Support** - Internationalization
- **Chainable API** - Fluent interface

---

## 🏗️ Arsitektur Sistem

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              React Application (SPA)                │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │  │   Pages     │ │  Components │ │   Hooks     │   │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Next.js Server (SSR)                   │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │  │  API Routes │ │  Middleware │ │  Static     │   │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              External Services                      │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │  │   Database  │ │  Auth       │ │  CDN/Images │   │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
QRGenerator (Main Component)
├── Header
│   ├── Logo
│   └── Navigation
├── Main Content (Grid Layout)
│   ├── Left Panel (Input Controls)
│   │   ├── Card: QR Content
│   │   │   └── Tabs: URL, Text, Email, Phone, WiFi
│   │   └── Card: Settings
│   │       ├── Error Correction Level
│   │       ├── Size Slider
│   │       ├── Background Section
│   │       │   ├── Solid Color Mode
│   │       │   └── Image Mode
│   │       │       ├── Drag & Drop Zone
│   │       │       ├── Opacity Slider
│   │       │       └── Color Controls
│   │       └── Logo Section
│   │           ├── Upload Input
│   │           └── Size Controls
│   │
│   └── Right Panel (Preview)
│       ├── QR Display
│       │   ├── Canvas (Merged Output)
│       │   └── Hidden QR Code
│       ├── Info Badges
│       ├── Download Button
│       └── Tips Section
│
└── Footer
    └── Links
```

### Data Flow Diagram

```
User Input
    │
    ▼
┌─────────────┐
│   React     │◄── State Management (Zustand)
│   State     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Effect    │◄── React Hooks (useEffect)
│   Hooks     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   QR Code   │◄── qrcode.react
│   Library   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Canvas    │◄── Canvas API
│   Merge     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Download  │◄── PNG Export
└─────────────┘
```

---

## 📁 Struktur Proyek

```
qr-maker/
├── .dockerignore          # Docker ignore rules
├── .gitignore             # Git ignore rules
├── bun.lock               # Bun lockfile
├── Caddyfile              # Caddy server config
├── components.json        # shadcn/ui config
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies & scripts
├── postcss.config.mjs     # PostCSS config
├── README.md              # This file
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
│
├── prisma/
│   └── schema.prisma      # Database schema
│
├── public/
│   ├── apple-touch-icon.png
│   ├── favicon-192x192.png
│   ├── favicon-512x512.png
│   ├── favicon.ico
│   ├── logo.svg
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # SEO rules
│
└── src/
    ├── app/
    │   ├── api/
    │   │   └── route.ts   # API endpoint
    │   ├── globals.css    # Global styles
    │   ├── layout.tsx     # Root layout
    │   └── page.tsx       # Main page (QR Generator)
    │
    ├── components/
    │   ├── theme-provider.tsx  # Theme context
    │   └── ui/                 # shadcn/ui components
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── alert.tsx
    │       ├── aspect-ratio.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── breadcrumb.tsx
    │       ├── button.tsx
    │       ├── calendar.tsx
    │       ├── card.tsx
    │       ├── carousel.tsx
    │       ├── chart.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── command.tsx
    │       ├── context-menu.tsx
    │       ├── dialog.tsx
    │       ├── drawer.tsx
    │       ├── dropdown-menu.tsx
    │       ├── form.tsx
    │       ├── hover-card.tsx
    │       ├── input-otp.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── menubar.tsx
    │       ├── navigation-menu.tsx
    │       ├── pagination.tsx
    │       ├── popover.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── resizable.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── sidebar.tsx
    │       ├── skeleton.tsx
    │       ├── slider.tsx
    │       ├── sonner.tsx
    │       ├── switch.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       ├── textarea.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       ├── toggle-group.tsx
    │       ├── toggle.tsx
    │       └── tooltip.tsx
    │
    ├── hooks/
    │   ├── use-mobile.ts    # Mobile detection hook
    │   └── use-toast.ts     # Toast notification hook
    │
    └── lib/
        ├── db.ts            # Prisma client
        ├── localstorage-polyfill.ts  # SSR polyfill
        └── utils.ts         # Utility functions (cn)
```

---

## 🚀 Instalasi & Konfigurasi

### Prasyarat Sistem

| Requirement | Versi Minimum |
|-------------|---------------|
| **Bun** | v1.3.4 |
| **Node.js** | v18.0 (opsional) |
| **Sistem Operasi** | Linux, macOS, Windows |

### Langkah Instalasi

#### 1. Clone Repository

```bash
git clone https://github.com/biezz-2/qr-maker.git
cd qr-maker
```

#### 2. Install Dependencies

```bash
bun install
```

#### 3. Environment Setup

Buat file `.env` berdasarkan contoh:

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication (Optional)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

#### 4. Database Setup

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# Untuk development dengan migrations
bun run db:migrate
```

#### 5. Jalankan Development Server

```bash
bun run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## 📖 Panduan Penggunaan

### Membuat Kode QR Pertama Anda

#### Langkah 1: Pilih Tipe Konten

Di panel "QR Content", pilih salah satu tab:

| Tab | Penggunaan |
|-----|------------|
| 🔗 **URL** | Tautan website |
| 📝 **Text** | Teks biasa |
| 📧 **Email** | Alamat email |
| 📞 **Phone** | Nomor telepon |
| 📶 **WiFi** | Jaringan WiFi |

#### Langkah 2: Masukkan Data

Sesuaikan input sesuai tipe yang dipilih:

```typescript
// Contoh URL
Input: "https://example.com"

// Contoh WiFi
SSID: "MyWiFiNetwork"
Security: "WPA/WPA2"
Password: "secretpassword"
```

#### Langkah 3: Kustomisasi Tampilan

##### Mengubah Warna
1. Di bagian "Background", pilih "Solid Color"
2. Klik color picker untuk warna QR code
3. Klik color picker kedua untuk warna background

##### Menambahkan Logo
1. Scroll ke bagian "Logo (Optional)"
2. Klik "Choose File" atau drag & drop
3. Rekomendasi: PNG dengan background transparan
4. Gunakan "Auto-Fit" untuk hasil terbaik

##### Menambahkan Background Image
1. Di bagian "Background", pilih "Custom Image"
2. Upload gambar atau drag & drop
3. Atur opacity dengan slider (rekomendasi: 70-90%)
4. Sesuaikan warna QR untuk kontras

#### Langkah 4: Download

Klik tombol "Download PNG" untuk menyimpan kode QR Anda.

### Tips Optimasi

| Skenario | Error Correction | Ukuran | Tips |
|----------|------------------|--------|------|
| 📄 **Pencetakan** | High (H) | Min 256px | Kontras tinggi,hindari merah |
| 🖥️ **Digital Display** | Medium (M) | Sesuai layar | Background opacity tinggi |
| 📦 **Packaging** | High (H) | Min 512px | Test scan sebelum produksi |

---

## 🔌 API Reference

### GET /api

Endpoint utama untuk kesehatan aplikasi.

**Request:**
```http
GET /api HTTP/1.1
Host: localhost:3000
```

**Response:**
```json
{
  "message": "Hello, world!"
}
```

**Status Codes:**
- `200` - OK
- `500` - Internal Server Error

### Future API Endpoints

Berikut endpoint yang direncanakan untuk pengembangan selanjutnya:

#### POST /api/qr/generate

Generate kode QR secara server-side.

```typescript
interface RequestBody {
  type: 'url' | 'text' | 'email' | 'phone' | 'wifi';
  data: Record<string, any>;
  options?: {
    size?: number;
    foreground?: string;
    background?: string;
    errorLevel?: 'L' | 'M' | 'Q' | 'H';
    logo?: string;
    backgroundImage?: string;
  };
}

interface Response {
  success: boolean;
  data?: {
    qrCode: string; // Base64 PNG
    svg?: string;
  };
  error?: string;
}
```

#### POST /api/qr/batch

Generate multiple kode QR sekaligus.

```typescript
interface BatchRequest {
  requests: Array<{
    name: string;
    type: string;
    data: Record<string, any>;
    options?: object;
  }>;
  format?: 'zip' | 'json';
}

interface BatchResponse {
  success: boolean;
  data?: {
    downloadUrl: string;
    results: Array<{
      name: string;
      qrCode: string;
    }>;
  };
}
```

---

## 📦 Deployment

### Deployment ke Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Deployment

```bash
# Build image
docker build -t qr-maker .

# Run container
docker run -p 3000:3000 qr-maker
```

### Standalone Build

Proyek ini mendukung standalone output untuk deployment ke platform manapun:

```bash
# Build production
bun run build

# Start production server
bun start
```

### Environment Variables untuk Production

```env
NODE_ENV=production
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

### Security Headers

Proyek ini sudah mengkonfigurasi security headers di `next.config.ts`:

| Header | Fungsi |
|--------|--------|
| **X-DNS-Prefetch-Control** | DNS prefetching enabled |
| **Strict-Transport-Security** | HSTS enabled (2 tahun) |
| **X-XSS-Protection** | XSS protection enabled |
| **X-Frame-Options** | Clickjacking protection (SAMEORIGIN) |
| **X-Content-Type-Options** | MIME type sniffing protection |
| **Referrer-Policy** | Referrer policy (origin-when-cross-origin) |
| **Permissions-Policy** | Feature policy restrictions |

---

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Berikut panduannya:

### Cara Berkontribusi

1. **Fork Repository**
   ```bash
   git fork https://github.com/biezz-2/qr-maker.git
   ```

2. **Buat Branch Baru**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Perubahan**
   ```bash
   git commit -m 'Add amazing feature'
   ```

4. **Push ke Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Buka Pull Request**

### Panduan Coding

- Gunakan **TypeScript** untuk semua file baru
- Ikuti **ESLint** rules yang sudah dikonfigurasi
- Gunakan **Conventional Commits**
- Test code sebelum submit
- Update dokumentasi jika diperlukan

### Ide Kontribusi

| Feature | Deskripsi |
|---------|-----------|
| 📊 **Dashboard** | History kode QR |
| 🔗 **Short URL** | Integrasi URL shortener |
| 📈 **Analytics** | Scan count tracking |
| 🎨 **Themes** | Lebih banyak tema visual |
| 🌐 **i18n** | Multi-language support |
| 📱 **PWA** | Offline support |
| 🔐 **Password** | Password protected QR |
| 📊 **Batch** | CSV upload generation |

---

## 📈 Roadmap

### v1.0 (Current)
- ✅ Basic QR code generation
- ✅ Multiple content types
- ✅ Custom colors & logo
- ✅ Background image support
- ✅ Download as PNG

### v1.1 (Upcoming)
- [ ] Server-side generation API
- [ ] QR code history
- [ ] User authentication
- [ ] Save & edit QR codes

### v2.0 (Future)
- [ ] QR code analytics
- [ ] Dynamic QR codes
- [ ] Team collaboration
- [ ] API access
- [ ] Mobile app

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

## 🙏 Credits

| Role | Name/Link |
|------|-----------|
| **Author** | [Biezz](https://github.com/biezz-2) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) |
| **Icons** | [Lucide](https://lucide.dev) |
| **QR Library** | [qrcode.react](https://github.com/soldair/node-qrcode) |
| **Framework** | [Next.js](https://nextjs.org) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) |

---

<div align="center">

## 🌟 Didukung oleh Teknologi Masa Depan

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-1.3-fbf0df?style=for-the-badge&logo=bun)](https://bun.sh)

---

Dibuat dengan ❤️ oleh [Biezz](https://github.com/biezz-2)

</div>
