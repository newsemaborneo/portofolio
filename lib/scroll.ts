export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function scrollProgress(
  scrollY: number,
  top: number,
  height: number,
): number {
  if (
    !Number.isFinite(scrollY) ||
    !Number.isFinite(top) ||
    !Number.isFinite(height) ||
    height <= 0
  ) {
    return 0;
  }
  return clamp((scrollY - top) / height, 0, 1);
}

export function frameIndex(progress: number, frameCount: number): number {
  if (!Number.isFinite(frameCount) || frameCount <= 0) return 0;
  const clamped = clamp(progress, 0, 1);
  return Math.min(frameCount - 1, Math.floor(clamped * frameCount));
}
