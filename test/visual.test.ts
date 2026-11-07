import { describe, it, expect } from "vitest";
import { fieldOffset } from "@/lib/visual";

describe("visual field", () => {
  it("is deterministic for the same input", () => {
    expect(fieldOffset(10, 20, 0.5, 0.3)).toEqual(fieldOffset(10, 20, 0.5, 0.3));
  });

  it("stays within a bounded pixel range", () => {
    const { dx, dy } = fieldOffset(123, 456, 9.5, 0.75);
    expect(Math.abs(dx)).toBeLessThanOrEqual(40);
    expect(Math.abs(dy)).toBeLessThanOrEqual(40);
  });

  it("responds to progress", () => {
    expect(fieldOffset(10, 20, 0.5, 0)).not.toEqual(fieldOffset(10, 20, 0.5, 1));
  });

  it("does not return NaN for invalid progress", () => {
    const { dx, dy } = fieldOffset(10, 20, 0.5, NaN);
    expect(Number.isFinite(dx)).toBe(true);
    expect(Number.isFinite(dy)).toBe(true);
  });
});
