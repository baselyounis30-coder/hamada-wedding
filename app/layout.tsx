import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Dancing_Script,
  Great_Vibes,
  Libre_Baskerville,
} from "next/font/google";
import "./globals.css";

const script = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

const hand = Dancing_Script({
  variable: "--font-hand",
  subsets: ["latin"],
});

const caps = Libre_Baskerville({
  variable: "--font-caps",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed & Nehal · November 6, 2026",
  description:
    "Please reserve the date for our wedding. November 6, 2026 at 6:30 PM, Palace Hall, Jewel Sports City Hotel.",
};

export const viewport: Viewport = {
  themeColor: "#f8d9cd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${script.variable} ${hand.variable} ${caps.variable} ${serif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
