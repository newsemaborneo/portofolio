"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

export function Intro() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="intro-title" className="border-t border-line">
      <Reveal>
        <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">// IKHTISAR PROFESIONAL</span>
            <h2
              id="intro-title"
              className="mt-4 font-display text-3xl font-semibold leading-tight text-paper md:text-5xl"
            >
              {t.intro.statement}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line/60 pt-6 sm:grid-cols-3">
              <div>
                <p className="font-display text-2xl font-bold text-accent md:text-3xl">4+</p>
                <p className="mt-1 font-mono text-xs text-muted">Sistem Produksi</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-paper md:text-3xl">99.9%</p>
                <p className="mt-1 font-mono text-xs text-muted">Uptime & Reliability</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-paper md:text-3xl">Fullstack</p>
                <p className="mt-1 font-mono text-xs text-muted">Database ke UI</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-muted md:col-span-5 md:pt-8">
            <p className="text-base leading-relaxed text-paper/90">{t.intro.bio}</p>
            <p className="text-sm leading-relaxed">{t.intro.meta}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
