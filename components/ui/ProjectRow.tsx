import type { Project } from "@/lib/content";

interface ProjectRowProps {
  project: Project;
  liveLabel: string;
  pendingLabel: string;
  index: number;
}

export function ProjectRow({
  project,
  liveLabel,
  pendingLabel,
  index,
}: ProjectRowProps) {
  const reversed = index % 2 === 1;

  return (
    <article data-testid="project-row" className="border-t border-line py-12 md:py-16">
      <div
        data-testid={`project-${project.slug}`}
        className="grid items-start gap-8 md:grid-cols-12 md:gap-12"
      >
        <div className={`md:col-span-7 ${reversed ? "md:order-2" : ""}`}>
          <div className="flex aspect-[16/10] flex-col justify-between rounded-lg border border-line bg-paper/[0.03] p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
              <span>{project.role}</span>
              {project.pending ? <span>{pendingLabel}</span> : null}
            </div>
            <p className="font-display text-[clamp(2rem,6vw,5rem)] font-semibold leading-none text-paper/90">
              {project.name}
            </p>
            <p className="text-sm text-muted">{project.stack.join(" / ")}</p>
          </div>
        </div>

        <div className={`md:col-span-5 ${reversed ? "md:order-1" : ""}`}>
          <h3 className="font-display text-2xl text-paper md:text-3xl">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-wrap items-baseline gap-x-3 py-1 hover:text-accent"
              >
                {project.name}
                <span className="text-sm font-normal text-muted group-hover:text-accent">
                  {liveLabel}
                  <span aria-hidden="true"> ↗</span>
                </span>
              </a>
            ) : (
              project.name
            )}
          </h3>

          <p className="mt-4 text-muted">{project.summary}</p>

          <div className="mt-6 space-y-2 border-l border-line pl-4 text-sm text-muted">
            <p>{project.problem}</p>
            <p>{project.solution}</p>
          </div>

          {project.impact ? (
            <p className="mt-4 text-sm text-paper/80">{project.impact}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
