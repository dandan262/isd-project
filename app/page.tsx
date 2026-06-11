import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Database, Layers3, Sparkles, TerminalSquare } from "lucide-react";

const setupSteps = [
  {
    title: "1. Siapkan environment",
    description:
      "Salin DATABASE_URL dan GEMINI_API_KEY ke file .env.local lalu pastikan nilainya valid untuk environment masing-masing.",
  },
  {
    title: "2. Jalankan Prisma",
    description:
      "Generate client dan dorong schema ke PostgreSQL dengan prisma generate lalu prisma db push atau migration sesuai alur tim.",
  },
  {
    title: "3. Tes Gemini API",
    description:
      "Panggil route POST /api/gemini dengan prompt sederhana untuk memastikan API key sudah bekerja.",
  },
];

const codeSamples = [
  {
    label: ".env.local",
    content: `DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/isdproject?schema=public"
GEMINI_API_KEY="your-gemini-api-key"`,
  },
  {
    label: "prisma/schema.prisma",
    content: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`,
  },
  {
    label: "app/api/gemini/route.ts",
    content: `const model = getGeminiModel();
const result = await model.generateContent(prompt);
return NextResponse.json({ text: result.response.text() });`,
  },
];

const foundationCards = [
  {
    icon: Layers3,
    title: "Next.js + Tailwind + UI",
    description:
      "Layout root, metadata, font, dan komponen UI dasar sudah siap untuk dipakai sebagai fondasi antarmuka berikutnya.",
  },
  {
    icon: Database,
    title: "PostgreSQL + Prisma",
    description:
      "Schema sudah terhubung ke DATABASE_URL dan model Conversation/Message disiapkan untuk fase chat dan memory.",
  },
  {
    icon: Sparkles,
    title: "Gemini API",
    description:
      "Wrapper server-side dan route test minimal sudah tersedia untuk validasi integrasi awal tanpa bocor ke client.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="noise pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex flex-col gap-6 py-8">
          <Badge>Phase 1 · Foundation & Infra</Badge>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Fondasi ISD Project sudah disusun untuk Next.js, PostgreSQL, Prisma, dan Gemini.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Halaman ini merangkum setup Phase 1 dan langsung menampilkan file inti yang dipakai.
                Kode fondasinya sudah siap untuk dipakai sebagai pijakan fase chat dan memory berikutnya.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <div className="max-w-sm rounded-[28px] border border-border bg-card/90 p-5 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Output Phase 1
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Layout root, env contract, Prisma datasource, helper Gemini, dan route test sudah tersedia.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="#setup">Lihat langkah setup</Button>
            <Button href="/api/gemini" variant="secondary">
              Cek route Gemini
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {foundationCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card key={card.title} className="h-full">
                <CardHeader>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-muted/70 text-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </section>

        <section id="setup" className="grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <Badge className="w-fit">Langkah Setup</Badge>
              <CardTitle>Urutan kerja yang aman untuk Phase 1</CardTitle>
              <CardDescription>
                Ini urutan paling praktis buat jalanin fondasi tanpa lompat langsung ke fitur chat penuh.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {setupSteps.map((step) => (
                <div key={step.title} className="rounded-3xl border border-border bg-background/60 p-4">
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge className="w-fit">Starter Payload</Badge>
              <CardTitle>Contoh file dan route inti</CardTitle>
              <CardDescription>
                Potongan kode ini mencerminkan konfigurasi yang sudah dipasang di repo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {codeSamples.map((sample) => (
                <div key={sample.label} className="rounded-3xl border border-border bg-slate-950 p-4 text-slate-100">
                  <div className="mb-3 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
                    <span>{sample.label}</span>
                    <TerminalSquare className="h-4 w-4" />
                  </div>
                  <pre className={cn("overflow-x-auto text-sm leading-6", "font-mono")}>
                    <code>{sample.content}</code>
                  </pre>
                </div>
              ))}
            </CardContent>
            <CardFooter className="grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
              <div className="space-y-1 rounded-3xl border border-border bg-background/60 p-4">
                <p className="text-sm font-semibold">Form test Gemini</p>
                <Input disabled placeholder="Prompt contoh: ringkas roadmap fase 1" />
              </div>
              <div className="space-y-1 rounded-3xl border border-border bg-background/60 p-4">
                <p className="text-sm font-semibold">Body request</p>
                <Textarea disabled placeholder='{"prompt": "Tolong rangkum setup phase 1"}' />
              </div>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}
