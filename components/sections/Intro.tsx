"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

export function Intro() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="intro-title" className="border-t border-line">
      <Reveal>
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <h2
              id="intro-title"
              className="font-display text-3xl leading-tight text-paper md:text-5xl"
            >
              {t.intro.statement}
            </h2>
          </div>
          <div className="space-y-4 text-muted md:col-span-5 md:pt-2">
            <p>{t.intro.bio}</p>
            <p className="text-sm">{t.intro.meta}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
