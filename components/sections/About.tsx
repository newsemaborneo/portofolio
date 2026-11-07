"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-24 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-7">
          <div>
            <h2
              id="about-title"
              className="font-display text-4xl text-paper md:text-6xl"
            >
              {t.about.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted">{t.about.body}</p>

            <div className="mt-10">
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-md border border-line px-5 py-3 text-sm font-medium text-muted"
              >
                {t.about.cvPending}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.1}>
          <div>
            <div
              aria-hidden="true"
              className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-xl border border-line/80 bg-gradient-to-b from-paper/[0.04] to-paper/[0.01] p-6"
            >
              <div className="flex items-center justify-between font-mono text-xs text-muted">
                <span className="text-accent">// PROFILE</span>
                <span>BASED IN ID</span>
              </div>
              <div className="my-auto flex flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-2xl font-bold text-accent">
                  NA
                </div>
                <p className="mt-4 font-display text-lg font-medium text-paper">Newsem Aborneo</p>
                <p className="text-xs text-muted">Fullstack & Creative Engineer</p>
              </div>
              <div className="border-t border-line/60 pt-3 text-center font-mono text-[11px] text-muted">
                Crafting performant web experiences
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
