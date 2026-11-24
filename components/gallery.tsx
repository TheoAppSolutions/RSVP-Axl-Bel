"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { galleryPhotos } from "@/lib/event";

function Arrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d={direction === "previous" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isLightboxOpen = lightboxIndex !== null;
  const enlargedPhoto = lightboxIndex === null ? null : galleryPhotos[lightboxIndex];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;

    function updateActivePhoto() {
      if (!track) return;
      const bounds = track.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      Array.from(track.children).forEach((slide, index) => {
        const slideBounds = slide.getBoundingClientRect();
        const distance = Math.abs(slideBounds.left + slideBounds.width / 2 - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    }

    function scheduleUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActivePhoto);
    }

    updateActivePhoto();
    track.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isLightboxOpen || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  function scrollToPhoto(index: number) {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!track || !slide) return;
    const trackBounds = track.getBoundingClientRect();
    const slideBounds = slide.getBoundingClientRect();
    track.scrollBy({
      left: slideBounds.left - trackBounds.left - (trackBounds.width - slideBounds.width) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  function showRelativePhoto(direction: number) {
    setLightboxIndex((index) => index === null ? null : (index + direction + galleryPhotos.length) % galleryPhotos.length);
  }

  return (
    <>
      <div className="carousel" role="region" aria-label="Wedding photo gallery" aria-roledescription="carousel">
        <button type="button" className="carousel-arrow carousel-arrow-prev" id="carouselPrev" aria-label="Previous photo" onClick={() => scrollToPhoto(Math.max(0, activeIndex - 1))}>
          <Arrow direction="previous" />
        </button>
        <div className="carousel-track" id="carouselTrack" ref={trackRef}>
          {galleryPhotos.map((photo, index) => (
            <div className="carousel-slide" key={photo.src} role="group" aria-label={`${index + 1} of ${galleryPhotos.length}`} aria-roledescription="slide">
              <button type="button" className="photo-button" onClick={() => setLightboxIndex(index)} aria-label={`Enlarge photo ${index + 1} of Jan Axl and Maribel`} aria-haspopup="dialog">
                <Image
                  className="carousel-img"
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 666px) 78vw, 520px"
                  style={{ objectPosition: photo.objectPosition }}
                />
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="carousel-arrow carousel-arrow-next" id="carouselNext" aria-label="Next photo" onClick={() => scrollToPhoto(Math.min(galleryPhotos.length - 1, activeIndex + 1))}>
          <Arrow direction="next" />
        </button>
      </div>
      <div className="carousel-dots" id="carouselDots" role="group" aria-label="Choose a photo">
        {galleryPhotos.map((photo, index) => (
          <button
            type="button"
            className={`carousel-dot${index === activeIndex ? " is-active" : ""}`}
            key={photo.src}
            aria-label={`Go to photo ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => scrollToPhoto(index)}
          />
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="lightbox is-open"
        id="lightbox"
        aria-label="Enlarged wedding photo"
        onCancel={(event) => { event.preventDefault(); setLightboxIndex(null); }}
        onClick={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            showRelativePhoto(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <button type="button" className="lightbox-close" id="lightboxClose" aria-label="Close enlarged photo" onClick={() => setLightboxIndex(null)}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M5 5L19 19M19 5L5 19" />
          </svg>
        </button>
        <button type="button" className="lightbox-arrow lightbox-arrow-prev" id="lightboxPrev" aria-label="Previous enlarged photo" onClick={() => showRelativePhoto(-1)}>
          <Arrow direction="previous" />
        </button>
        {enlargedPhoto && (
          <Image className="lightbox-image" id="lightboxImage" src={enlargedPhoto.src} alt={enlargedPhoto.alt} width={enlargedPhoto.width} height={enlargedPhoto.height} sizes="(max-width: 978px) 92vw, 900px" />
        )}
        <button type="button" className="lightbox-arrow lightbox-arrow-next" id="lightboxNext" aria-label="Next enlarged photo" onClick={() => showRelativePhoto(1)}>
          <Arrow direction="next" />
        </button>
      </dialog>
    </>
  );
}
