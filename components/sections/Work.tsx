"use client";

import { ProjectRow } from "@/components/ui/ProjectRow";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n";

export function Work() {
  const { t } = useLanguage();

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              id="work-title"
              className="font-display text-4xl text-paper md:text-6xl"
            >
              {t.work.title}
            </h2>
            <p className="max-w-sm text-muted">{t.work.subtitle}</p>
          </div>
        </Reveal>

        <div className="mt-12">
          {t.work.projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.05, 0.2)}>
              <ProjectRow
                project={project}
                index={index}
                liveLabel={t.work.liveLabel}
                pendingLabel={t.work.pendingLabel}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
