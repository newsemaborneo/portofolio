import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { About } from "@/components/sections/About";
import { content } from "@/lib/content";

describe("sections", () => {
  it("renders four projects and only links projects with liveUrl", () => {
    render(
      <LanguageProvider>
        <Work />
      </LanguageProvider>,
    );
    const rows = screen.getAllByTestId("project-row");
    expect(rows).toHaveLength(4);
    expect(screen.getByTestId("project-lakupos")).toContainElement(
      screen.getByRole("link", { name: /lakupos/i }),
    );
    expect(screen.queryByTestId("project-jurnal")?.querySelector("a")).toBeNull();
  });

  it("renders live contact links for email and whatsapp", () => {
    render(
      <LanguageProvider>
        <Contact />
      </LanguageProvider>,
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/newsemaborneo",
    );
    expect(
      screen.getByRole("link", { name: /newsemaborneonewsem@gmail\.com/i }),
    ).toHaveAttribute("href", "mailto:newsemaborneonewsem@gmail.com");
    expect(
      screen.getByRole("link", { name: /081348686348/i }),
    ).toHaveAttribute("href", "https://wa.me/6281348686348");
    expect(screen.getByText(content.id.contact.pendingLabel)).toBeInTheDocument();
  });

  it("marks CV as pending until a file exists", () => {
    render(
      <LanguageProvider>
        <About />
      </LanguageProvider>,
    );
    const cv = screen.getByRole("button", {
      name: new RegExp(content.id.about.cvPending, "i"),
    });
    expect(cv).toBeDisabled();
  });
});
