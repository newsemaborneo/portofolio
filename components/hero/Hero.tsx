"use client";

import { useEffect, useRef } from "react";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { useLanguage } from "@/lib/i18n";
import { overlayOpacity, overlayTranslate } from "@/lib/hero-state";
import { useReducedMotion } from "@/lib/reduced-motion";
import { scrollProgress } from "@/lib/scroll";

export function Hero() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) return;

    if (reduced) {
      overlay.style.opacity = "1";
      overlay.style.transform = "none";
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = scrollProgress(-rect.top, 0, scrollable);
      overlay.style.opacity = String(overlayOpacity(progress));
      overlay.style.transform = `translate3d(0, -${overlayTranslate(progress)}px, 0)`;
    };

    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-name"
      className="relative h-[200vh] bg-ink"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroCanvas sectionRef={sectionRef} reduced={reduced} />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1240px] flex-col justify-end px-6 pb-14 pt-24">
          <div
            ref={overlayRef}
            className="will-change-[opacity,transform]"
            style={{ opacity: 1 }}
          >
            <p className="mb-3 text-sm text-muted">{t.hero.role}</p>

            <h1
              id="hero-name"
              className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[0.98] tracking-tight text-paper"
            >
              <span className="block transition-transform duration-700 ease-out hover:translate-x-2 hover:text-accent">
                NEWSEM
              </span>
              <span className="block transition-transform duration-700 ease-out hover:translate-x-2 hover:text-accent">
                ABORNEO
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
              {t.hero.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-paper px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-all hover:bg-paper/90 active:scale-95"
              >
                {t.nav.work} ↓
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line/80 bg-paper/[0.02] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-paper transition-all hover:border-accent hover:text-accent active:scale-95"
              >
                {t.nav.cta}
              </a>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-3 text-xs text-muted">
            <span aria-hidden="true" className="block h-10 w-px bg-accent/60" />
            <span className="font-mono tracking-wider uppercase">{t.hero.scrollCue}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
