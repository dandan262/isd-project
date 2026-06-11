ISD Project memakai Next.js App Router, Tailwind CSS, Prisma, PostgreSQL, dan Gemini.

## Phase 1 Setup

1. Copy `.env.example` ke `.env.local`, lalu isi `DATABASE_URL` dan `GEMINI_API_KEY`.
2. Jalankan `npx prisma generate` lalu `npx prisma db push` atau migration sesuai workflow tim.
3. Jalankan `npm run dev` untuk membuka aplikasi di `http://localhost:3000`.

## Environment Variables

- `DATABASE_URL` untuk koneksi PostgreSQL.
- `GEMINI_API_KEY` untuk route `/api/gemini`.

## Commands

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Phase 1 foundation page.
