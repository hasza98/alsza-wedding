import { Fragment, type ReactNode } from "react";

type TimelineEvent = {
  time: string;
  title: string;
  description: ReactNode;
  icon: string;
  startsNewDay?: boolean;
};

const timelineEvents: TimelineEvent[] = [
  {
    time: "13:00-15:00",
    title: "Szállás átvétel",
    description: "A helyszínen átvehetitek a szobakulcsokat.",
    icon: "fa-key",
  },
  {
    time: "13:30",
    title: "Vendégvárás",
    description: "Evés és ivás, hogy legyen energia a hosszú naphoz.",
    icon: "fa-location-dot",
  },
  {
    time: "16:00",
    title: "Templomi esküvő",
    description: "A Nagydorogi templomban Isten színe előtt esküt teszünk egymásnak.",
    icon: "fa-church",
  },
  {
    time: "17:15",
    title: "Polgári ceremónia",
    description: "Kimondjuk az igent egy zászlós néni előtt, utána pedig gratulációk és koccintás.",
    icon: "fa-ring",
  },
  {
    time: "18:00",
    title: "Fotózás",
    description: "Közös képek az ifjú párral mindenféle kombinácóban.",
    icon: "fa-camera",
  },
  {
    time: "19:30",
    title: "Vacsora",
    description: "Finom falusi bőségtál elfogyasztása jóféle helyi bor társaságában.",
    icon: "fa-utensils",
  },
  {
    time: "21:00",
    title: "Nyitótánc",
    description: "Férj és Feleség első közös tánca, amivel megnyitják a táncparkettet.",
    icon: "fa-music",
  },
    {
    time: "23:00",
    title: "Torta",
    description: "Édes szájúak készüljenek, nagyon finom íz-kombinációkkal készülünk.",
    icon: "fa-cake",
  },
    {
    time: "00:00",
    title: "Meglepetés",
    description: "Csak nektek.",
    icon: "fa-gift",
  },
  {
    time: "00:05-kifulladásig",
    title: "Menyecsketánc aztán buli amíg bírjuk",
    description: (
      <p>
        Egy kaparós sorsjegy fejében megpörgethetitek a menyasszonyt vagy a vőlegényt. <br/>Aki már megtáncoltatta az ifjú párt, az rárabolhat az éjféli menüre. Aztán bulizunk amíg csak bírunk.,
      </p>),
     icon: "fa-moon",
  },
  {
    time: "09:30-11:00",
    title: "Morzsaparty",
    description: "Reggel találkozunk és elfogyasztjuk a maradék rántott husit egy kis tortával, miközben összerakjuk az előző nap képeit.",
    icon: "fa-cookie-bite",
    startsNewDay: true,
  },
];

export default function WeddingParty() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Részletes(ebb) programterv
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          A Nagy Nap hozzávetőleges menetrendje, így tervezünk, aztán lesz ami lesz.
        </p>
      </div>

      <div className="relative">
        <div className="space-y-8">
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isFirst = index === 0;
            const isLast = index === timelineEvents.length - 1;

            return (
              <Fragment key={`${event.time}-${event.title}`}>
                {event.startsNewDay && (
                  <div className="relative z-10 flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-wedding-divider" />
                    <span className="rounded-full border border-wedding-border bg-wedding-surface px-5 py-2 font-sans text-xs font-medium uppercase tracking-[0.28em] text-wedding-labelWarm shadow-wedding-radio">
                      Vasárnap
                    </span>
                    <div className="h-px flex-1 bg-wedding-divider" />
                  </div>
                )}

                <div
                  className={`relative grid gap-4 pl-14 md:grid-cols-[1fr_4rem_1fr] md:pl-0 ${
                    isLeft ? "md:text-right" : ""
                  }`}
                >
                  {!isFirst && (
                    <div className="absolute bottom-1/2 left-5 top-[-2rem] w-px -translate-x-1/2 bg-wedding-divider md:left-1/2" />
                  )}
                  {!isLast && (
                    <div className="absolute bottom-[-2rem] left-5 top-1/2 w-px -translate-x-1/2 bg-wedding-divider md:left-1/2" />
                  )}

                  <div
                    className={
                      isLeft
                        ? "md:col-start-1 md:pr-4"
                        : "md:col-start-3 md:pl-4"
                    }
                  >
                    <div className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-6 shadow-wedding-card">
                      <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-wedding-labelWarm">
                        {event.time}
                      </p>
                      <h2 className="mt-1 font-display text-2xl text-wedding-ink">
                        {event.title}
                      </h2>
                      <div className="mt-2 font-sans text-sm leading-7 text-wedding-bodySoft">
                        {event.description}
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-5 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-wedding-border bg-wedding-panel text-xl text-wedding-muted shadow-wedding-radio md:left-1/2 md:h-16 md:w-16 md:text-2xl">
                    <i
                      className={`fa-solid ${event.icon}`}
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
