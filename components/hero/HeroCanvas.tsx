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

      // 1. Nebula Cosmic Cloud Glows
      const nebulaCenterX = width * 0.7 - progress * width * 0.2;
      const nebulaCenterY = height * 0.35 + Math.sin(time * 0.3) * 20;
      const nebulaGrad = context.createRadialGradient(
        nebulaCenterX,
        nebulaCenterY,
        10,
        nebulaCenterX,
        nebulaCenterY,
        width * 0.45,
      );
      nebulaGrad.addColorStop(0, "rgba(56, 189, 248, 0.12)");
      nebulaGrad.addColorStop(0.5, "rgba(147, 51, 234, 0.06)");
      nebulaGrad.addColorStop(1, "rgba(7, 8, 10, 0)");
      context.fillStyle = nebulaGrad;
      context.fillRect(0, 0, width, height);

      // 2. Distant Celestial Planet with Proper 3D Depth (Ring Behind & Ring in Front)
      const planetX = width * 0.82 - progress * 100;
      const planetY = height * 0.28 + Math.cos(time * 0.2) * 15;
      const planetRadius = Math.min(width, height) * 0.07 + 25;
      const ringTilt = -Math.PI / 6; // Stable, natural 30-degree orbital inclination
      const ringRx = planetRadius * 2.2;
      const ringRy = planetRadius * 0.48;

      // Draw BACK half of the ring (behind the planet)
      context.save();
      context.translate(planetX, planetY);
      context.rotate(ringTilt);

      // Back ring arcs (angles PI to 2*PI)
      context.beginPath();
      context.ellipse(0, 0, ringRx, ringRy, 0, Math.PI, Math.PI * 2);
      context.strokeStyle = "rgba(56, 189, 248, 0.4)";
      context.lineWidth = 3;
      context.stroke();

      context.beginPath();
      context.ellipse(0, 0, ringRx * 1.15, ringRy * 1.15, 0, Math.PI, Math.PI * 2);
      context.strokeStyle = "rgba(147, 51, 234, 0.25)";
      context.lineWidth = 1.5;
      context.stroke();
      context.restore();

      // Draw Planet Sphere
      context.save();
      // Clip to circular planet body for drawing surface details
      context.beginPath();
      context.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
      context.closePath();
      context.clip();

      // Planet base atmosphere gradient
      const planetGrad = context.createRadialGradient(
        planetX - planetRadius * 0.35,
        planetY - planetRadius * 0.35,
        planetRadius * 0.1,
        planetX,
        planetY,
        planetRadius,
      );
      planetGrad.addColorStop(0, "rgba(56, 189, 248, 0.95)");
      planetGrad.addColorStop(0.4, "rgba(30, 58, 138, 0.85)");
      planetGrad.addColorStop(1, "rgba(8, 12, 24, 0.98)");
      context.fillStyle = planetGrad;
      context.fill();

      // Subtle atmospheric surface bands
      const rotationSpeed = time * 0.35;
      for (let band = -2; band <= 2; band += 1) {
        const bandY = planetY + band * (planetRadius * 0.32);
        const bandOffset = Math.sin(rotationSpeed + band) * (planetRadius * 0.2);
        context.beginPath();
        context.fillStyle = band % 2 === 0
          ? "rgba(56, 189, 248, 0.12)"
          : "rgba(147, 51, 234, 0.1)";
        context.ellipse(
          planetX + bandOffset,
          bandY,
          planetRadius * 1.05,
          planetRadius * 0.1,
          0,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      // Planet crescent shadow (realistic lighting)
      const shadowGrad = context.createRadialGradient(
        planetX - planetRadius * 0.45,
        planetY - planetRadius * 0.35,
        planetRadius * 0.3,
        planetX,
        planetY,
        planetRadius,
      );
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      shadowGrad.addColorStop(0.6, "rgba(7, 10, 18, 0.6)");
      shadowGrad.addColorStop(1, "rgba(4, 6, 12, 0.92)");
      context.fillStyle = shadowGrad;
      context.beginPath();
      context.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
      context.fill();
      context.restore();

      // Draw FRONT half of the ring (in front of the planet)
      context.save();
      context.translate(planetX, planetY);
      context.rotate(ringTilt);

      // Front ring arcs (angles 0 to PI)
      context.beginPath();
      context.ellipse(0, 0, ringRx, ringRy, 0, 0, Math.PI);
      context.strokeStyle = "rgba(56, 189, 248, 0.55)";
      context.lineWidth = 3;
      context.stroke();

      context.beginPath();
      context.ellipse(0, 0, ringRx * 1.15, ringRy * 1.15, 0, 0, Math.PI);
      context.strokeStyle = "rgba(147, 51, 234, 0.35)";
      context.lineWidth = 1.5;
      context.stroke();
      context.restore();

      // 3. Mini Spiral & Elliptical Galaxies in Deep Space
      const galaxies = [
        { gx: width * 0.22, gy: height * 0.24, size: 28, tilt: -0.4, speed: 0.3, color: "rgba(147, 51, 234, 0.45)" },
        { gx: width * 0.48, gy: height * 0.72, size: 22, tilt: 0.6, speed: -0.25, color: "rgba(56, 189, 248, 0.4)" },
        { gx: width * 0.88, gy: height * 0.78, size: 32, tilt: 0.3, speed: 0.2, color: "rgba(236, 72, 153, 0.35)" },
      ];

      for (const gal of galaxies) {
        context.save();
        const galX = gal.gx - progress * 40;
        const galY = gal.gy + Math.sin(time * 0.3 + gal.size) * 8;
        context.translate(galX, galY);
        context.rotate(gal.tilt + time * gal.speed * 0.3);

        // Core glow of the mini galaxy
        const coreGrad = context.createRadialGradient(0, 0, 1, 0, 0, gal.size * 0.9);
        coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.85)");
        coreGrad.addColorStop(0.3, gal.color);
        coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = coreGrad;
        context.beginPath();
        context.arc(0, 0, gal.size * 0.9, 0, Math.PI * 2);
        context.fill();

        // 2 Spiral Arms with star clusters
        for (let arm = 0; arm < 2; arm += 1) {
          const armAngleOffset = arm * Math.PI;
          context.beginPath();
          for (let step = 0; step < 24; step += 1) {
            const r = (step / 24) * gal.size;
            const theta = armAngleOffset + step * 0.28;
            const sx = Math.cos(theta) * r;
            const sy = Math.sin(theta) * (r * 0.55); // tilted disk perspective
            if (step === 0) context.moveTo(sx, sy);
            else context.lineTo(sx, sy);
          }
          context.strokeStyle = gal.color;
          context.lineWidth = 1.4;
          context.stroke();
        }
        context.restore();
      }

      // 4. Galactic Starfield with Orbital Dust
      const columns = Math.max(20, Math.floor(width / 64));
      const rows = Math.max(14, Math.floor(height / 64));
      const cellWidth = width / columns;
      const cellHeight = height / rows;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = (column + 0.5) * cellWidth;
          const y = (row + 0.5) * cellHeight;
          const { dx, dy } = fieldOffset(x, y, time, progress);
          const wave = 0.5 + 0.5 * Math.sin(x * 0.008 + y * 0.01 + time * 0.7);
          const isAccent = (row + column) % 7 === 0;
          const isSpecial = (row * 3 + column) % 13 === 0;
          const alpha = 0.08 + 0.45 * progress * wave;
          const radius = isSpecial ? 3.0 : isAccent ? 2.4 : 1.8;

          context.beginPath();
          context.fillStyle = isAccent
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(244, 244, 240, ${alpha * 0.55})`;
          context.arc(x + dx, y + dy, radius, 0, Math.PI * 2);
          context.fill();

          // Subtle glowing halo for larger stellar points
          if (isSpecial && alpha > 0.15) {
            context.beginPath();
            context.fillStyle = `rgba(56, 189, 248, ${alpha * 0.25})`;
            context.arc(x + dx, y + dy, radius * 2.2, 0, Math.PI * 2);
            context.fill();
          }
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
