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
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {t.stack.items.map((item) => (
              <li
                key={item}
                className="font-display text-2xl text-muted transition-colors hover:text-paper md:text-4xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
