"use client";

import { useLanguage } from "@/lib/i18n";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-7">
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

        <div className="md:col-span-5">
          <div
            aria-hidden="true"
            className="flex aspect-[4/5] items-center justify-center rounded-lg border border-line bg-paper/[0.03]"
          >
            <span className="text-sm uppercase tracking-[0.25em] text-muted">
              [FOTO]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
