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
          <div className="rounded-lg border border-line p-6">
            <a
              href={t.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-display text-2xl text-paper hover:text-accent"
            >
              GitHub
            </a>

            <p className="mt-6 text-sm text-muted">{t.contact.pendingLabel}</p>

            <ul className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
              <li className="flex items-center justify-between gap-4">
                <span className="text-muted">Email</span>
                <span className="text-paper/80">{t.contact.email}</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span className="text-muted">LinkedIn</span>
                <span className="text-paper/80">{t.contact.linkedin}</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span className="text-muted">WhatsApp</span>
                <span className="text-paper/80">{t.contact.whatsapp}</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
