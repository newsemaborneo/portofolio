"use client";

import { useEffect, useRef } from "react";
import { scrollProgress } from "@/lib/scroll";
import { fieldOffset } from "@/lib/visual";

interface HeroCanvasProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  reduced: boolean;
}

export function HeroCanvas({ sectionRef, reduced }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;

    const draw = (time: number, progress: number) => {
      context.clearRect(0, 0, width, height);
      const columns = Math.max(20, Math.floor(width / 64));
      const rows = Math.max(14, Math.floor(height / 64));
      const cellWidth = width / columns;
      const cellHeight = height / rows;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = (column + 0.5) * cellWidth;
          const y = (row + 0.5) * cellHeight;
          const { dx, dy } = fieldOffset(x, y, time, progress);
          const wave = 0.5 + 0.5 * Math.sin(x * 0.01 + y * 0.012 + time * 0.8);
          const alpha = 0.06 + 0.26 * progress * wave;
          context.beginPath();
          context.fillStyle =
            (row + column) % 9 === 0
              ? `rgba(46, 158, 247, ${alpha})`
              : `rgba(242, 240, 234, ${alpha * 0.45})`;
          context.arc(x + dx, y + dy, 1.2, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0, 0);
    };

    const currentProgress = () => {
      const section = sectionRef.current;
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      return scrollProgress(-rect.top, 0, scrollable);
    };

    const loop = (timestamp: number) => {
      draw(timestamp / 1000, currentProgress());
      raf = window.requestAnimationFrame(loop);
    };

    resize();
    if (!reduced) {
      raf = window.requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
