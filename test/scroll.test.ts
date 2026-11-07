import { describe, it, expect } from "vitest";
import { clamp, lerp, scrollProgress, frameIndex } from "@/lib/scroll";

describe("scroll math", () => {
  it("clamps values and rejects non-finite input", () => {
    expect(clamp(5, 0, 1)).toBe(1);
    expect(clamp(-2, 0, 1)).toBe(0);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
    expect(clamp(NaN, 0, 1)).toBe(0);
  });

  it("returns 0 progress for zero or invalid height", () => {
    expect(scrollProgress(100, 0, 0)).toBe(0);
    expect(scrollProgress(100, 0, -5)).toBe(0);
    expect(scrollProgress(NaN, 0, 300)).toBe(0);
  });

  it("maps scroll to 0..1 and clamps outside the hero", () => {
    expect(scrollProgress(-100, 0, 300)).toBe(0);
    expect(scrollProgress(0, 0, 300)).toBe(0);
    expect(scrollProgress(150, 0, 300)).toBe(0.5);
    expect(scrollProgress(1000, 0, 300)).toBe(1);
  });

  it("maps progress to in-range frame indices", () => {
    expect(frameIndex(0, 120)).toBe(0);
    expect(frameIndex(1, 120)).toBe(119);
    expect(frameIndex(0.5, 120)).toBe(60);
    expect(frameIndex(5, 120)).toBe(119);
    expect(frameIndex(-1, 120)).toBe(0);
    expect(frameIndex(0.5, 0)).toBe(0);
  });

  it("lerps between values", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(10, 0, 0.25)).toBe(7.5);
  });
});
