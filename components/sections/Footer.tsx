"use client";

import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.rights}</p>
        <a href="#top" className="hover:text-paper">
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
