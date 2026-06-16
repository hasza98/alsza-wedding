import type { ReactNode } from "react";

const venueAddress = "Wein & Speiz Fogadó, Györköny, Petőfi Sándor utca 386";
const trainStationAddress = "Nagydorog vasútállomás";

type TravelInformation = {
  title: string;
  description: ReactNode;
  icon: string;
};

const travelInformation: TravelInformation[] = [
  {
    title: "Autóval jönnél és még van pár üres helyed?",
    description: (
      <p>
        Ha igen, akkor kérlek <a href="https://docs.google.com/spreadsheets/d/1DKUyXXzY1NrKGo3nCoznba6gkVFDbDlQjNNTcP6gk_U/edit?usp=sharing" target="_blank">ebben a táblázatban</a> jelezd, hogy honnan indulsz,
        hány üres hellyel és fogadj be pár potyázó barátot, akik szórakoztatnak az úton.
      </p>
    ),
    icon: "fa-car-side",
  },
  {
    title: "Nincs még fuvarod az esküvőre?",
    description: (
      <p>
        Csekkold <a href="https://docs.google.com/spreadsheets/d/1DKUyXXzY1NrKGo3nCoznba6gkVFDbDlQjNNTcP6gk_U/edit?usp=sharing" target="_blank">ezt a táblázatot</a>, hátha akad egy üres hely, ami pont rád vár.
      </p>
    ),
    icon: "fa-people-group",
  },
  {
    title: "Tömegközlekednél?",
    description: (
      <p>
        A Budapestről érkezve <a href="https://www.google.hu/maps/place/Nagydorog/@46.6157042,18.6476776,17z/data=!4m10!1m2!2m1!1zTmFneWRvcm9nIHZhc8O6dMOhbGxvbcOhcw!3m6!1s0x474263fe0ebfdb53:0x3e6ba24184f9b7a!8m2!3d46.615485!4d18.65002!15sChlOYWd5ZG9yb2cgdmFzw7p0w6FsbG9tw6FzkgENdHJhaW5fc3RhdGlvbuABAA!16s%2Fg%2F11cj90nf38?entry=ttu&g_ep=EgoyMDI2MDYwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank">Nagydorog Vasútállomást</a> érdemes megcélozni. Aki
        ezt a megoldást választja, az mindenképpen jelezze ezt az esküvő előtti napig és akkor garantáljuk a <b>prémium családi-taxi szolgáltatást</b> a helyszínre.
      </p>
    ),
    icon: "fa-train",
  },
];

function buildTravelMapUrl() {
  const params = new URLSearchParams({
    output: "embed",
    saddr: trainStationAddress,
    daddr: venueAddress,
    dirflg: "d",
  });

  return `https://www.google.com/maps?${params.toString()}`;
}

export default function Travel() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Lejutás
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          Összegyűjtöttük a legfontosabb tudnivalókat, hogy mindenki
          kényelmesen eljusson az esküvő helyszínére.
        </p>
      </div>
        <div className="grid gap-4">
          {travelInformation.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-5 shadow-wedding-card"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surfaceWarm text-wedding-muted">
                  <i
                    className={`fa-solid ${item.icon} text-base`}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl leading-tight text-wedding-ink">
                    {item.title}
                  </h2>
                  <div className="mt-2 font-sans text-sm leading-7 text-wedding-bodySoft">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}
