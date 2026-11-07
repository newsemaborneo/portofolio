import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider, useLanguage } from "@/lib/i18n";

function Probe() {
  const { locale, toggle, t } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="label">{t.nav.work}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = "id";
});

describe("LanguageProvider", () => {
  it("defaults to id", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("id");
  });

  it("toggles locale and persists it", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    await user.click(screen.getByText("toggle"));
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(localStorage.getItem("newsem.locale")).toBe("en");
  });

  it("ignores an invalid stored locale", () => {
    localStorage.setItem("newsem.locale", "fr");
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("id");
  });

  it("restores a valid stored locale after mount", async () => {
    localStorage.setItem("newsem.locale", "en");
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(await screen.findByTestId("locale")).toHaveTextContent("en");
  });
});
