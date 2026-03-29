import { useEffect, useState } from "react";

const weddingDate = new Date("2026-09-05T14:00:00+02:00");

type CountdownPart = {
  label: string;
  value: number;
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

export function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState<CountdownPart[]>(() => getTimeLeft());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#faf8f4]">
      <FloralBand />

      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex w-full max-w-6xl flex-col items-center text-center">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:flex-nowrap sm:justify-center sm:gap-x-[clamp(1.5rem,5vw,5rem)]">
            {timeLeft.map((part) => (
              <div key={part.label} className="flex flex-col items-center">
                <span
                  className="text-5xl leading-none text-[#2f2421] sm:text-6xl"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {part.value}
                </span>
                <span
                  className="mt-2 text-xs uppercase tracking-[0.35em] text-[#7c6f68]"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {part.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloralBand flipped />
    </div>
  );
}
