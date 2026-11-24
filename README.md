# Jan Axl & Maribel — Wedding Invitation

The Merced-Wedding-RSVP invitation migrated to **Next.js 16**, **React 19**, and **TypeScript** using the App Router. The original purple and beige design, invitation copy, October 9, 2026 event date, photos, soundtrack, map, and external RSVP link are preserved.

## Run locally

Use Node.js 20.9 or newer (Node.js 22 LTS is recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify and build

```bash
npm run typecheck
npm run build
npm start
```

`npm run build` creates a production build in `.next`. `npm start` serves that build. Use `npm ci` instead of `npm install` for a clean install from the committed lockfile.

## Project structure

```text
app/
  layout.tsx        Page metadata, icons, and fonts
  page.tsx          Server-rendered invitation sections
  globals.css       Original design and responsive styles
  manifest.ts       Web app manifest
  admin/            Password-protected guest dashboard from RSVP-Templates
  api/admin/rsvps/  Authenticated static response listing
components/
  countdown.tsx     Philippine-time countdown
  gallery.tsx       Swipeable carousel and keyboard-accessible modal lightbox
  monogram.tsx      Shared decorative monogram
  music-player.tsx  Shared hero and floating music controls
  page-effects.tsx  Loader and scroll reveal lifecycle
lib/
  admin-rsvps.json  Fixed admin guest responses with blank submission dates
  event.ts          Event details, external links, and gallery metadata
public/
  images/          Original hero and 12 gallery photos
  audio/           Original soundtrack
  favicon/         Original icon files
```

## Customize

- Edit `lib/event.ts` to update the date, time, venue, RSVP deadline, RSVP URL, map URL, or media. The countdown's ISO date includes the Philippine UTC+8 offset. Keep the display date, weekday, and footer date in sync when changing the event.
- Edit `app/page.tsx` for invitation wording and attire colors.
- Edit `app/globals.css` for the theme and layout.
- Replace media in `public/` using the same filenames, or update the paths in `lib/event.ts`. Update gallery dimensions if replacing a photo with a different aspect ratio.

The countdown stops at zero after the wedding date. The original date and RSVP deadline have intentionally been retained during the migration.

## Behavior and integrations

- Next.js Image serves responsive, optimized photos. The hero is preloaded and gallery images load lazily.
- Music starts after an eligible visitor click or keypress, subject to browser playback rules. Either music button can play or pause it; the audio does not preload on page load.
- The lightbox supports Escape, arrow keys, native modal focus management, and keyboard activation of gallery photos.
- Effects clean up observers, event listeners, timers, and body scroll locking when their components unmount. The loader has a CSS fallback and invitation content remains readable without JavaScript.
- RSVP opens the existing external form in a new tab. Responses from that external service are not automatically synchronized to the admin dashboard.
- Google Fonts and Google Maps require an internet connection. The invitation does not need environment variables or a Google Maps API key.

## Admin dashboard

Open `/admin` to use the dashboard copied from RSVP-Templates. It includes password login, response counts, guest/message search, attendance and date filters, sorting, full message viewing, CSV export, and refresh. Admin pages do not play the invitation soundtrack.

1. Copy `.env.example` to `.env.local`.
2. Set a strong `ADMIN_PASSWORD`. Keep the admin password server-side; never prefix it with `NEXT_PUBLIC_`.
3. Restart the development server and sign in at `/admin`. Configure the same password on your deployment host.

The dashboard serves the 45 supplied responses from `lib/admin-rsvps.json` through the password-protected API. Both florenz dajoya entries are retained. Every `created_at` value is empty, so submission dates display and export as blank. Leave the date filter on “Any time” to see these undated responses. Edit the JSON file to update the fixed list; deletion is unavailable. The existing external form continues to collect responses separately.

Login is remembered in the current tab's session storage until you close the tab. The server verifies the password for every list request. A missing admin password produces a setup message.

## Deploy

Import this repository into Vercel and select the **Next.js** framework preset. Use `npm run build` as the build command and leave the output directory at its default. Other hosts must support a Next.js Node.js server and its image optimization endpoint.
