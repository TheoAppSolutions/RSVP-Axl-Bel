// Keep the original invitation's event details together for easy updates.
export const wedding = {
  couple: "Jan Axl & Maribel",
  date: "October 9, 2026",
  dateTime: "2026-10-09T14:00:00+08:00",
  weekday: "Friday",
  time: "2:00 PM",
  footerDate: "10 · 09 · 2026",
  venue: "Ritz Tower de Leyte",
  rsvpDeadline: "September 15, 2026",
  rsvpUrl: "https://lal.so/e/OLJLzfNCh1y",
  mapUrl: "https://www.google.com/maps?q=Ritz+Tower+de+Leyte&output=embed",
  heroImage: "/images/hero.webp",
  music: "/audio/music.mp3",
} as const;

export const galleryPhotos = [
  { width: 6000, height: 3700, objectPosition: "50% 50%" },
  { width: 6000, height: 4000, objectPosition: "100%" },
  { width: 6000, height: 3700, objectPosition: "0%" },
  { width: 6000, height: 4000, objectPosition: "100%" },
  { width: 4000, height: 6000, objectPosition: "50% 50%" },
  { width: 3936, height: 2624, objectPosition: "50% 50%" },
  { width: 4000, height: 6000, objectPosition: "50% 50%" },
  { width: 4000, height: 6000, objectPosition: "50% 50%" },
  { width: 6000, height: 4000, objectPosition: "50% 50%" },
  { width: 6000, height: 4000, objectPosition: "50% 50%" },
  { width: 6000, height: 4000, objectPosition: "50% 50%" },
  { width: 4000, height: 6000, objectPosition: "0% 20%" },
].map((photo, index) => ({
  ...photo,
  src: `/images/gallery-${index + 1}.webp`,
  alt: `Jan Axl and Maribel — photo ${index + 1}`,
}));
