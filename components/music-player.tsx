"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { wedding } from "@/lib/event";

type MusicContextValue = { isPlaying: boolean; toggle: () => void };
const MusicContext = createContext<MusicContextValue | null>(null);

function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg className="music-play-icon" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l14-7.5z" />
    </svg>
  );
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userHasChosen = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    function playOnFirstInteraction(event: MouseEvent | KeyboardEvent) {
      if (userHasChosen.current) return;
      // A music button handles its own gesture so a first tap cannot immediately pause it.
      if (event.target instanceof Element && event.target.closest("[data-music-control]")) return;
      if (event instanceof KeyboardEvent && event.key !== "Enter" && event.key !== " ") return;

      const audio = audioRef.current;
      if (!audio) return;
      void audio.play().then(() => {
        userHasChosen.current = true;
      }).catch(() => {
        // Keep the manual controls available if the browser blocks playback.
        setIsPlaying(false);
      });
    }

    document.addEventListener("click", playOnFirstInteraction);
    document.addEventListener("keydown", playOnFirstInteraction);
    return () => {
      document.removeEventListener("click", playOnFirstInteraction);
      document.removeEventListener("keydown", playOnFirstInteraction);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    userHasChosen.current = true;
    if (audio.paused) {
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }

  return (
    <MusicContext.Provider value={{ isPlaying, toggle }}>
      <audio
        ref={audioRef}
        id="bgMusic"
        src={wedding.music}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
      <button
        type="button"
        className={`music-toggle${isPlaying ? " is-playing" : ""}`}
        id="musicToggle"
        data-music-control
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={isPlaying}
        onClick={toggle}
      >
        <PlayIcon />
        <span className="music-bars" aria-hidden="true"><span /><span /><span /></span>
      </button>
      {children}
    </MusicContext.Provider>
  );
}

export function HeroMusicButton() {
  const music = useContext(MusicContext);
  if (!music) throw new Error("HeroMusicButton must be rendered inside MusicProvider.");

  return (
    <button
      type="button"
      className={`hero-music-btn reveal${music.isPlaying ? " is-playing" : ""}`}
      id="heroMusicBtn"
      data-music-control
      aria-label={music.isPlaying ? "Pause our theme song" : "Play our theme song"}
      aria-pressed={music.isPlaying}
      onClick={music.toggle}
    >
      <PlayIcon size={16} />
      <span id="heroMusicLabel">{music.isPlaying ? "Now playing our theme song" : "Click to play our theme song"}</span>
    </button>
  );
}
