"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-t border-line"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
        <Reveal>
          <h2
            id="services-title"
            className="font-display text-4xl text-paper md:text-6xl"
          >
            {t.services.title}
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="mt-12 divide-y divide-line/70 border-y border-line/70">
          {t.services.items.map((item, index) => (
            <li
              key={item.title}
              className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8 transition-colors duration-200 hover:bg-paper/[0.01]"
            >
              <span className="font-mono text-xs text-accent md:col-span-2">
                // {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-medium text-paper transition-colors group-hover:text-accent md:col-span-4">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:col-span-6">{item.description}</p>
            </li>
          ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
