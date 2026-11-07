import { describe, it, expect } from "vitest";
import { overlayOpacity, overlayTranslate } from "@/lib/hero-state";

describe("hero overlay state", () => {
  it("keeps the overlay visible at the start", () => {
    expect(overlayOpacity(0)).toBeGreaterThan(0.9);
  });

  it("fades the overlay out as progress rises", () => {
    expect(overlayOpacity(0.5)).toBe(0);
    expect(overlayOpacity(1)).toBe(0);
  });

  it("never returns NaN or negative translate", () => {
    for (const progress of [-1, 0, 0.3, 1, 2, NaN]) {
      const value = overlayTranslate(progress);
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
    }
  });
});
