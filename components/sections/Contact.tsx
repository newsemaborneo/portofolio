"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-line"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-24 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-7">
          <div>
            <h2
              id="contact-title"
              className="font-display text-4xl text-paper md:text-6xl"
            >
              {t.contact.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted">{t.contact.lead}</p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.1}>
          <div className="rounded-xl border border-line/80 bg-gradient-to-b from-paper/[0.04] to-paper/[0.01] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">// CONNECT</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Available
              </span>
            </div>

            <a
              href={t.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 group inline-flex min-h-11 items-center justify-between w-full rounded-lg border border-line/70 bg-ink/50 px-4 py-3 font-display text-xl text-paper transition-all hover:border-accent hover:text-accent"
            >
              <span>GitHub</span>
              <span className="text-sm font-mono text-muted group-hover:text-accent transition-transform group-hover:translate-x-1">↗</span>
            </a>

            <div className="mt-6">
              <ul className="space-y-3 border-t border-line/60 pt-4 text-sm">
                <li className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-muted">Email</span>
                  <a
                    href={`mailto:${t.contact.email}`}
                    className="font-mono text-xs text-paper/90 transition-colors hover:text-accent"
                  >
                    {t.contact.email}
                  </a>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-muted">WhatsApp</span>
                  <a
                    href="https://wa.me/6281348686348"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-paper/90 transition-colors hover:text-accent"
                  >
                    {t.contact.whatsapp}
                  </a>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-muted">LinkedIn</span>
                  <span className="font-mono text-xs text-muted">
                    {t.contact.pendingLabel}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
