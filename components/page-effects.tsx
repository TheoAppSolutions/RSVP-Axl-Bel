"use client";

import { useEffect, useState } from "react";

export function PageEffects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loadTimer: ReturnType<typeof setTimeout>;
    const dismiss = () => { loadTimer = setTimeout(() => setLoading(false), 300); };
    const fallbackTimer = setTimeout(() => setLoading(false), 2000);
    if (document.readyState === "complete") dismiss();
    else window.addEventListener("load", dismiss, { once: true });

    const sections = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-pending");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      sections.forEach((section) => {
        // Server-rendered content stays visible without JavaScript.
        if (section.getBoundingClientRect().top >= window.innerHeight) {
          section.classList.add("is-pending");
          observer?.observe(section);
        }
      });
    }

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("load", dismiss);
      observer?.disconnect();
      sections.forEach((section) => section.classList.remove("is-pending"));
    };
  }, []);

  return (
    <div className={`loader${loading ? "" : " hidden"}`} id="loader" aria-hidden="true">
      <div className="loader-leaf">
        <svg viewBox="0 0 60 60" fill="none" aria-hidden="true">
          <path d="M30 5C30 5 50 18 50 34C50 46 41 55 30 55C19 55 10 46 10 34C10 18 30 5 30 5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M30 5V55" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}
