"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { SECTION_IDS, type SectionId } from "@/lib/sections";

export function Nav() {
  const { t, locale, toggle } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const labels: Record<SectionId, string> = {
    work: t.nav.work,
    services: t.nav.services,
    about: t.nav.about,
    contact: t.nav.contact,
  };

  const languageLabel =
    locale === "id" ? "Ganti bahasa ke Inggris" : "Switch language to Indonesian";
  const menuLabel =
    locale === "id"
      ? open
        ? "Tutup menu"
        : "Buka menu"
      : open
        ? "Close menu"
        : "Open menu";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-ink/80 backdrop-blur-md transition-all">
      <nav
        aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}
        className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-6 px-6"
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-base font-semibold tracking-tight text-paper"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
          <span>Newsem Aborneo</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="relative text-sm text-muted transition-colors duration-200 hover:text-paper after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {labels[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={languageLabel}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line/60 bg-paper/[0.02] px-3 text-xs font-mono font-medium uppercase tracking-wider text-paper transition-all hover:border-accent/40 hover:text-accent"
          >
            {t.nav.langLabel}
          </button>

          <a
            href="#contact"
            className="hidden rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-transform duration-200 hover:opacity-95 active:scale-95 md:inline-block"
          >
            {t.nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={menuLabel}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-line text-paper md:hidden"
          >
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-line bg-ink px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base text-paper"
                >
                  {labels[id]}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink"
              >
                {t.nav.cta}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
