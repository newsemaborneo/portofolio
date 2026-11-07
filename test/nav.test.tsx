import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "@/components/nav/Nav";
import { LanguageProvider } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/sections";

function setup() {
  return render(
    <LanguageProvider>
      <Nav />
    </LanguageProvider>,
  );
}

describe("Nav", () => {
  it("links only to existing section ids", () => {
    setup();
    const nav = screen.getByRole("navigation");
    const hrefs = within(nav)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    for (const id of SECTION_IDS) {
      expect(hrefs).toContain(`#${id}`);
    }
  });

  it("toggles the mobile menu and closes on Escape", async () => {
    const user = userEvent.setup();
    setup();
    const button = screen.getByRole("button", { name: /menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("switches language labels", async () => {
    const user = userEvent.setup();
    setup();
    const toggle = screen.getByRole("button", {
      name: /ganti bahasa|switch language/i,
    });
    const before = screen.getByRole("navigation").textContent;
    await user.click(toggle);
    expect(screen.getByRole("navigation").textContent).not.toBe(before);
  });
});
