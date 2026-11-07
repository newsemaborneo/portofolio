import { clamp } from "@/lib/scroll";

export function overlayOpacity(progress: number): number {
  if (!Number.isFinite(progress)) return 1;
  const p = clamp(progress, 0, 1);
  if (p <= 0.25) return 1;
  if (p >= 0.5) return 0;
  return 1 - (p - 0.25) / 0.25;
}

export function overlayTranslate(progress: number): number {
  if (!Number.isFinite(progress)) return 0;
  const p = clamp(progress, 0, 1);
  return p * 120;
}
