import { clamp } from "@/lib/scroll";

export function fieldOffset(
  x: number,
  y: number,
  time: number,
  progress: number,
): { dx: number; dy: number } {
  const p = Number.isFinite(progress) ? progress : 0;
  const t = Number.isFinite(time) ? time : 0;
  const dx =
    Math.sin(x * 0.01 + t * 0.6 + p * Math.PI * 2) * 30 +
    Math.cos(y * 0.013 + p * 3) * 10;
  const dy =
    Math.cos(y * 0.011 + t * 0.5 + p * Math.PI * 2) * 30 +
    Math.sin(x * 0.017 + p * 3) * 10;
  return { dx: clamp(dx, -40, 40), dy: clamp(dy, -40, 40) };
}
