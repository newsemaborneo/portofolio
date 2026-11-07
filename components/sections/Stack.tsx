"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

export function Stack() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="stack-title" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
        <Reveal>
          <h2
            id="stack-title"
            className="text-sm uppercase tracking-[0.25em] text-muted"
          >
            {t.stack.title}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            {t.stack.items.map((item) => (
              <li
                key={item}
                className="group flex items-center gap-2 rounded-lg border border-line/80 bg-paper/[0.02] px-4 py-2 font-mono text-sm text-paper/80 transition-all duration-200 hover:border-accent/50 hover:bg-paper/[0.05] hover:text-paper"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/60 transition-transform group-hover:scale-125 group-hover:bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
