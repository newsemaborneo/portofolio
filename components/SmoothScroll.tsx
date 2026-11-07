"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/reduced-motion";

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
