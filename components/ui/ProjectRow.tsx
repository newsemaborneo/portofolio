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
    <article
      data-testid="project-row"
      className="group relative border-t border-line py-12 md:py-16 transition-colors duration-300 hover:border-line/90"
    >
      <div
        data-testid={`project-${project.slug}`}
        className="grid items-center gap-8 md:grid-cols-12 md:gap-12"
      >
        <div className={`md:col-span-7 ${reversed ? "md:order-2" : ""}`}>
          <div className="relative overflow-hidden rounded-xl border border-line/90 bg-gradient-to-b from-paper/[0.04] to-paper/[0.01] p-6 sm:p-8 transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_30px_rgba(46,158,247,0.06)]">
            <div className="flex items-center justify-between gap-4 border-b border-line/60 pb-4 text-xs">
              <span className="font-mono text-xs tracking-wider text-accent uppercase">
                {String(index + 1).padStart(2, "0")} / {project.role}
              </span>
              {project.pending ? (
                <span className="rounded-full border border-line/80 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                  {pendingLabel}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Live Preview
                </span>
              )}
            </div>

            <div className="my-8 flex min-h-[160px] flex-col justify-center">
              <p className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold tracking-tight text-paper transition-transform duration-300 group-hover:translate-x-1">
                {project.name}
              </p>
              <p className="mt-2 text-sm text-muted">
                {project.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-line/60">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line/80 bg-ink/60 px-2.5 py-1 font-mono text-xs text-paper/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`md:col-span-5 ${reversed ? "md:order-1" : ""}`}>
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold text-paper md:text-3xl">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex flex-wrap items-baseline gap-x-2 py-1 text-paper hover:text-accent transition-colors"
                >
                  <span>{project.name}</span>
                  <span className="inline-flex items-center text-xs font-mono font-medium text-accent">
                    {liveLabel} <span aria-hidden="true" className="ml-0.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
                  </span>
                </a>
              ) : (
                project.name
              )}
            </h3>

            <div className="space-y-3 rounded-lg border border-line/60 bg-paper/[0.02] p-4 text-sm text-muted">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-paper/70">Tantangan: </span>
                <span>{project.problem}</span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-paper/70">Solusi: </span>
                <span>{project.solution}</span>
              </div>
            </div>

            {project.impact ? (
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{project.impact}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
