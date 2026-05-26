import { useEffect, useState } from "react";

const weddingDate = new Date("2026-09-05T14:00:00+02:00");

type CountdownPart = {
  label: string;
  value: number;
};

type CountdownTimerProps = {
  compact?: boolean;
};

function getTimeLeft(): CountdownPart[] {
  const now = Date.now();
  const diff = Math.max(0, weddingDate.getTime() - now);

  const totalSeconds = Math.floor(diff / 1000);
  const secondsPerMinute = 60;
  const secondsPerHour = 60 * secondsPerMinute;
  const secondsPerDay = 24 * secondsPerHour;
  const secondsPerWeek = 7 * secondsPerDay;

  const weeks = Math.floor(totalSeconds / secondsPerWeek);
  const days = Math.floor((totalSeconds % secondsPerWeek) / secondsPerDay);
  const hours = Math.floor((totalSeconds % secondsPerDay) / secondsPerHour);
  const minutes = Math.floor((totalSeconds % secondsPerHour) / secondsPerMinute);
  const seconds = totalSeconds % secondsPerMinute;

  return [
    { label: "Hét", value: weeks },
    { label: "Nap", value: days },
    { label: "Óra", value: hours },
    { label: "Perc", value: minutes },
    { label: "Másodperc", value: seconds },
  ];
}

function FloralBand({ flipped = false }: { flipped?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-[20vh] min-h-[9rem] w-full overflow-hidden sm:min-h-[12rem] lg:min-h-[14rem]"
    >
      <img
        src="/flowerseamlessnarrow.png"
        alt=""
        className={[
          "absolute inset-0 h-full w-full object-cover object-center opacity-95",
          flipped ? "rotate-180" : "",
        ].join(" ")}
      />
    </div>
  );
}

export function CountdownTimer({ compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownPart[]>(() => getTimeLeft());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      aria-label="Az esküvőig hátralévő idő"
      className="flex flex-wrap items-start justify-center gap-x-[clamp(1.25rem,5vw,5rem)] gap-y-6"
    >
      {timeLeft.map((part) => (
        <div key={part.label} className="flex min-w-[4.5rem] flex-col items-center">
          <span
            className={[
              "font-display leading-none text-wedding-ink",
              compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl",
            ].join(" ")}
          >
            {part.value}
          </span>
          <span className="mt-2 text-xs uppercase tracking-[0.3em] text-wedding-mutedWarm">
            {part.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function WeddingCountdown() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-wedding-page">
      <FloralBand />

      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex w-full max-w-6xl flex-col items-center text-center">
          <CountdownTimer />
        </div>
      </div>

      <FloralBand flipped />
    </div>
  );
}
