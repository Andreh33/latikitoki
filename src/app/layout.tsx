import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://latikitoki.com"),
  title: {
    default: "La TikiToki — Lo viral, antes que nadie",
    template: "%s · La TikiToki",
  },
  description:
    "La tienda de los productos que petan en tu feed. Gadgets, iluminación y aesthetic para tu cuarto, tu glow-up y tu vibe. Envío a toda España.",
  keywords: [
    "productos virales",
    "tienda aesthetic",
    "gadgets tiktok",
    "decoración cuarto",
    "iluminación led",
    "La TikiToki",
  ],
  openGraph: {
    title: "La TikiToki — Lo viral, antes que nadie",
    description:
      "Gadgets, iluminación y aesthetic que petan en tu feed. Envío a toda España.",
    type: "website",
    locale: "es_ES",
    siteName: "La TikiToki",
  },
  twitter: {
    card: "summary_large_image",
    title: "La TikiToki — Lo viral, antes que nadie",
    description: "Lo viral, antes que nadie. Envío a toda España.",
  },
};

export const viewport: Viewport = {
  themeColor: "#070411",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
