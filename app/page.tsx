import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { Gallery } from "@/components/gallery";
import { LeafDivider, Monogram } from "@/components/monogram";
import { HeroMusicButton } from "@/components/music-player";
import { PageEffects } from "@/components/page-effects";
import { wedding } from "@/lib/event";

const attireColors = [
  { name: "Beige", color: "#F8F3EA" },
  { name: "Warm Beige", color: "#EFE4D3" },
  { name: "Lilac", color: "#DCCBEA" },
  { name: "Purple", color: "#9A7DB8" },
  { name: "Deep Purple", color: "#6B4E8E" },
];

export default function HomePage() {
  return (
    <>
      <PageEffects />

      <div className="ribbon">
        <span>Save the Date</span>
        <span className="ribbon-dot" aria-hidden="true">&bull;</span>
        <span>{wedding.date}</span>
        <span className="ribbon-dot" aria-hidden="true">&bull;</span>
        <span>{wedding.venue}</span>
      </div>

      <header className="hero" id="home">
        <div className="hero-photo-placeholder" aria-hidden="true">
          <Image src={wedding.heroImage} alt="" fill sizes="100vw" preload />
        </div>
        <div className="hero-veil" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow reveal">The Wedding Of</p>
          <h1 className="hero-names reveal">
            <span>Jan Axl</span>
            <span className="amp">&amp;</span>
            <span>Maribel</span>
          </h1>
          <div className="hero-divider reveal"><Monogram /></div>
          <p className="hero-date reveal">{wedding.date} &nbsp;·&nbsp; {wedding.venue}</p>
          <a href="#rsvp" className="btn btn-outline reveal">RSVP</a>
          <HeroMusicButton />
        </div>
        <a className="scroll-cue" id="scrollCue" href="#details" aria-label="Scroll to details"><span /></a>
      </header>

      <main>
        <section className="countdown-section" aria-label="Wedding countdown">
          <LeafDivider />
          <p className="eyebrow">Counting Down To Forever</p>
          <Countdown />
        </section>

        <section className="message-section reveal-on-scroll" aria-label="Our invitation">
          <p className="eyebrow">With Joyful Hearts</p>
          <p className="message-text">
            Together with our families, we invite you to witness the beginning of our
            forever. Your presence would mean the world to us as we exchange vows and
            celebrate a love story years in the making.
          </p>
          <p className="signature">{wedding.couple}</p>
        </section>

        <section className="details-section reveal-on-scroll" id="details" aria-labelledby="details-title">
          <p className="eyebrow">The Details</p>
          <h2 className="section-title" id="details-title">When &amp; Where</h2>
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="5" width="18" height="16" rx="1.5" />
                  <path d="M3 9H21M8 3V6M16 3V6" />
                </svg>
              </div>
              <h3>The Date</h3>
              <p>{wedding.weekday}</p>
              <p className="detail-highlight">{wedding.date}</p>
            </div>
            <div className="detail-card">
              <div className="detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7V12L15.5 14" />
                </svg>
              </div>
              <h3>The Time</h3>
              <p>Ceremony begins</p>
              <p className="detail-highlight">{wedding.time}</p>
            </div>
            <div className="detail-card">
              <div className="detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.4" />
                </svg>
              </div>
              <h3>The Venue</h3>
              <p>Ceremony &amp; Reception</p>
              <p className="detail-highlight">{wedding.venue}</p>
            </div>
          </div>
          <div className="map-placeholder">
            <iframe className="map-box map-embed" src={wedding.mapUrl} title={`Map of ${wedding.venue}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </section>

        <section className="theme-section reveal-on-scroll" aria-labelledby="attire-title">
          <LeafDivider />
          <p className="eyebrow">Attire</p>
          <h2 className="section-title" id="attire-title">Purple &amp; Beige Motif</h2>
          <p className="theme-copy">
            We&apos;d love for our guests to complement the day. Formal attire in
            shades of purple, lilac, and warm beige is warmly encouraged. Please
            kindly avoid white and champagne, reserved for the bride.
          </p>
          <div className="palette">
            {attireColors.map(({ name, color }) => (
              <div className="swatch" key={name} style={{ background: color }}><span>{name}</span></div>
            ))}
          </div>
        </section>

        <section className="carousel-section reveal-on-scroll" id="carousel" aria-labelledby="gallery-title">
          <LeafDivider />
          <p className="eyebrow">Moments In Motion</p>
          <h2 className="section-title" id="gallery-title">A Closer Look</h2>
          <Gallery />
        </section>

        <section className="gift-section reveal-on-scroll" id="gift" aria-labelledby="gift-title">
          <LeafDivider />
          <p className="eyebrow">A Small Note</p>
          <h2 className="section-title" id="gift-title">Gift Giving</h2>
          <p className="gift-copy">
            Your presence and prayers are already the greatest gift we could ask
            for. Should you wish to give something more, a monetary gift toward
            our new life together would be deeply appreciated in lieu of a
            boxed present.
          </p>
          <div className="gift-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="8" width="18" height="13" rx="1.5" />
              <path d="M3 8L12 3L21 8M12 3V21" />
            </svg>
          </div>
        </section>

        <section className="rsvp-section reveal-on-scroll" id="rsvp" aria-labelledby="rsvp-title">
          <LeafDivider light />
          <p className="eyebrow eyebrow-light">Kindly Respond By {wedding.rsvpDeadline}</p>
          <h2 className="section-title section-title-light" id="rsvp-title">We Hope You Can Celebrate With Us</h2>
          <p className="rsvp-copy">
            Please let us know if you&apos;ll be joining us on our special day by
            confirming your attendance through the form below.
          </p>
          <a href={wedding.rsvpUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid" id="rsvpButton">
            Confirm Your Attendance
          </a>
          <p className="rsvp-note">You&apos;ll be taken to our RSVP form in a new tab.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-monogram">J&amp;M</div>
        <p>With love, {wedding.couple}</p>
        <p className="footer-date">{wedding.footerDate}</p>
      </footer>
    </>
  );
}
