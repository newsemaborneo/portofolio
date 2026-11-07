import type { Metadata } from "next";
import { Syne, Instrument_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Newsem Aborneo | Fullstack Engineer",
  description:
    "Portofolio Newsem Aborneo, fullstack engineer yang membangun produk SaaS dan sistem internal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${syne.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
