"use client";

import { Fragment, useEffect, useState } from "react";
import { wedding } from "@/lib/event";

const units = ["Days", "Hours", "Minutes", "Seconds"] as const;
const weddingTime = new Date(wedding.dateTime).getTime();

function getRemainingTime() {
  const seconds = Math.max(0, Math.floor((weddingTime - Date.now()) / 1000));
  return [
    Math.floor(seconds / 86400),
    Math.floor((seconds % 86400) / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ];
}

export function Countdown() {
  // Match the server render before reading the visitor's clock after hydration.
  const [remaining, setRemaining] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const update = () => setRemaining(getRemainingTime());
    update();
    if (Date.now() >= weddingTime) return;

    const interval = window.setInterval(() => {
      update();
      if (Date.now() >= weddingTime) window.clearInterval(interval);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="countdown" id="countdown" role="timer" aria-label={`Time until the wedding on ${wedding.date}`}>
      {units.map((unit, index) => (
        <Fragment key={unit}>
          {index > 0 && <div className="countdown-sep" aria-hidden="true">:</div>}
          <div className="countdown-unit">
            <span className="countdown-number" id={`cd-${unit.toLowerCase()}`}>
              {String(remaining[index]).padStart(2, "0")}
            </span>
            <span className="countdown-label">{unit}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
