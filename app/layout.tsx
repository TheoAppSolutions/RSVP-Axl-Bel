import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { wedding } from "@/lib/event";
import "./globals.css";

export const metadata: Metadata = {
  title: `${wedding.couple} — ${wedding.date}`,
  description: `The wedding of Jan Axl and Maribel — ${wedding.date} at ${wedding.venue}.`,
  openGraph: {
    title: `The Wedding of ${wedding.couple}`,
    description: `${wedding.date} · ${wedding.venue}`,
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico?v=jm-1" },
      { url: "/favicon/favicon-32x32.png?v=jm-1", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png?v=jm-1", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png?v=jm-1", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#3F2B54",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@400;500;600&family=Alex+Brush&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
