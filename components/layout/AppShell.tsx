"use client";

import { Nav } from "@/components/nav/Nav";
import { useLanguage } from "@/lib/i18n";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { locale } = useLanguage();
  const skipLabel = locale === "id" ? "Lewati ke konten" : "Skip to content";

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        {skipLabel}
      </a>
      <Nav />
      <main id="content">{children}</main>
    </>
  );
}
