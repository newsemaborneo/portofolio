import { describe, it, expect } from "vitest";
import { content } from "@/lib/content";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, shape(v)]),
    );
  }
  return typeof value;
}

describe("content", () => {
  it("has the same shape in both locales", () => {
    expect(shape(content.id)).toEqual(shape(content.en));
  });

  it("has four projects and a non-empty hero name in both locales", () => {
    for (const locale of ["id", "en"] as const) {
      expect(content[locale].hero.name.trim()).not.toBe("");
      expect(content[locale].work.projects).toHaveLength(4);
    }
  });

  it("uses only real live links", () => {
    const allowed = [
      "https://lakupos.my.id",
      "https://siropa.my.id",
      "https://simaksu.my.id",
    ];
    for (const project of content.id.work.projects) {
      if (project.liveUrl) expect(allowed).toContain(project.liveUrl);
    }
    const jurnal = content.id.work.projects.find((p) => p.slug === "jurnal");
    expect(jurnal?.liveUrl).toBeUndefined();
  });

  it("keeps GitHub real and pending contact values as placeholders", () => {
    expect(content.id.contact.github).toBe("https://github.com/newsemaborneo");
    expect(content.id.contact.email).toContain("[");
    expect(content.id.contact.linkedin).toContain("[");
    expect(content.id.contact.whatsapp).toContain("[");
  });
});
