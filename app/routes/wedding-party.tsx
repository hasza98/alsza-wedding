const timelineEvents = [
  {
    time: "14:30",
    title: "Guest Arrival",
    description: "Arrive, find your seat, and settle in before the ceremony.",
    icon: "fa-location-dot",
  },
  {
    time: "15:00",
    title: "Ceremony",
    description: "The official yes, the rings, and probably a few happy tears.",
    icon: "fa-ring",
  },
  {
    time: "16:00",
    title: "Congratulations",
    description: "Hugs, photos, and a first little toast together.",
    icon: "fa-champagne-glasses",
  },
  {
    time: "17:30",
    title: "Dinner",
    description: "A shared meal, speeches, and enough food to fuel the party.",
    icon: "fa-utensils",
  },
  {
    time: "20:00",
    title: "First Dance",
    description: "We open the dance floor, and then it is everyone’s turn.",
    icon: "fa-music",
  },
  {
    time: "23:30",
    title: "Late Night Bites",
    description: "A small refill for anyone still dancing, chatting, or both.",
    icon: "fa-moon",
  },
];

export default function WeddingParty() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="font-sans text-sm uppercase tracking-[0.35em] text-wedding-labelWarm">
          Wedding Party
        </p>
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Timeline Of Events
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          A gentle plan for the day, so everyone knows where the celebration is
          heading.
        </p>
      </div>

      <div className="relative">
        <div className="absolute bottom-5 left-5 top-5 w-px bg-wedding-divider md:left-1/2 md:bottom-6 md:top-6 md:-translate-x-1/2"></div>

        <div className="space-y-8">
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
            <div
              key={`${event.time}-${event.title}`}
              className={`relative grid gap-4 pl-14 md:grid-cols-[1fr_4rem_1fr] md:pl-0 ${
                isLeft ? "md:text-right" : ""
              }`}
            >
              <div className={isLeft ? "md:col-start-1 md:pr-4" : "md:col-start-3 md:pl-4"}>
                <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-wedding-labelWarm">
                  {event.time}
                </p>
                <h2 className="mt-1 font-display text-2xl text-wedding-ink">
                  {event.title}
                </h2>
                <p className="mt-2 font-sans text-sm leading-7 text-wedding-bodySoft">
                  {event.description}
                </p>
              </div>

              <div className="absolute left-5 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-wedding-border bg-wedding-panel text-wedding-muted shadow-wedding-radio md:left-1/2 md:h-12 md:w-12">
                <i className={`fa-solid ${event.icon}`} aria-hidden="true"></i>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
