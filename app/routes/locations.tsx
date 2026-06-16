const keyLocations = [
  {
    name: "Wein & Speiz Fogadó",
    address: "Györköny, Petőfi Sandor u. 386",
    icon: "fa-champagne-glasses",
    label: "Helyszín & Szállás",
  },
  {
    name: "Nagydorogi Szent István király templom",
    address: "Nagydorog, Kossuth Lajos utca",
    icon: "fa-church",
    label: "Templom",
  },
];

function buildPlaceMapsUrl(address: string) {
  const params = new URLSearchParams({
    api: "1",
    destination: address,
  });

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export default function Locations() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Helyszín
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          Minden fontos tudnivaló, hogy könnyen megtaláljátok a szertartás és
          az ünneplés helyszínét.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-6 shadow-wedding-card sm:p-8">
          <h1 className="mt-3 font-display text-3xl text-wedding-ink">
            A nagy nap helyszínei
          </h1>
          <div className="mt-5 space-y-4 font-sans text-sm leading-7 text-wedding-bodySoft">
            <p>
              Az esküvőnk helyszíne a györkönyi <a href="https://www.bbpince.hu/" target="_blank">Wein & Speiz Fogadó</a> lesz, ahol a vendégvárással indítjuk a napot. 
            </p>
            <p>
              Innen közösen átmegyünk a Nagydorogi templomba, ahol Isten színe előtt letesszük a felbonthatatlan esküt. 
              Ezután már csak egy rövid közös utat teszünk meg vissza Györkönybe, ahol a polgári esküvő után kezdetét veszi a hajnalig tartó lakodalom. 
            </p>
            <p>
              Reggel ugyanitt egy közös morzsapartyval pihenjük ki a <b>másnap</b> fáradalmait.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {keyLocations.map((location) => (
            <div
              key={location.label}
              className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-5 shadow-wedding-card"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surfaceWarm text-wedding-muted">
                  <i
                    className={`fa-solid ${location.icon} text-base`}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-wedding-labelWarm">
                    {location.label}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-wedding-ink">
                    {location.name}
                  </h2>
                  <p className="mt-1 font-sans text-sm leading-6 text-wedding-bodySoft">
                    {location.address}
                  </p>
                  <a
                    href={buildPlaceMapsUrl(location.address)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-sans text-sm"
                  >
                    Megnézem a térképen
                    <i
                      className="fa-solid fa-arrow-up-right-from-square text-xs"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
