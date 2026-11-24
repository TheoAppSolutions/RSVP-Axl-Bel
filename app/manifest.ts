import type { MetadataRoute } from "next";
import { wedding } from "@/lib/event";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${wedding.couple} — Wedding Invitation`,
    short_name: "J & M Wedding",
    start_url: "/",
    display: "standalone",
    theme_color: "#3F2B54",
    background_color: "#F8F3EA",
    icons: [
      { src: "/favicon/android-chrome-192x192.png?v=jm-1", sizes: "192x192", type: "image/png" },
      { src: "/favicon/android-chrome-512x512.png?v=jm-1", sizes: "512x512", type: "image/png" },
    ],
  };
}
