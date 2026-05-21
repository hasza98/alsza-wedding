import { useState } from "react";

const registryItems = [
  {
    name: "Honeymoon fund",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    href: "https://example.com/honeymoon-fund",
  },
  {
    name: "Dinnerware set",
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=80",
    href: "https://example.com/dinnerware",
  },
  {
    name: "Coffee machine",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    href: "https://example.com/coffee-machine",
  },
  {
    name: "Bedding set",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80",
    href: "https://example.com/bedding",
  },
  {
    name: "Kitchen essentials",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
    href: "https://example.com/kitchen",
  },
  {
    name: "Date night fund",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
    href: "https://example.com/date-night",
  },
];

export default function Registry() {
  const [showPhysicalGifts, setShowPhysicalGifts] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="font-sans text-sm uppercase tracking-[0.35em] text-wedding-labelWarm">
          Registry
        </p>
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          A Gift In An Envelope
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          If you would like to gift us something, an envelope would be the most
          helpful for us. Your presence is already the important part.
        </p>
        <button
          type="button"
          onClick={() => setShowPhysicalGifts((isVisible) => !isVisible)}
          className="mt-5 inline-flex items-center justify-center rounded-full border border-wedding-border px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-wedding-muted transition hover:border-wedding-accentWarm hover:bg-wedding-panelHover hover:text-wedding-ink"
        >
          {showPhysicalGifts ? "Hide gift ideas" : "Show physical gift ideas"}
        </button>
      </div>

      {showPhysicalGifts && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {registryItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl border border-wedding-borderSoft bg-wedding-surface shadow-wedding-card transition hover:-translate-y-1 hover:border-wedding-accentWarm"
            >
              <div className="aspect-square overflow-hidden bg-wedding-panel">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <h2 className="font-sans text-base font-medium text-wedding-ink">
                  {item.name}
                </h2>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surfaceWarm text-wedding-muted transition group-hover:border-wedding-accent group-hover:text-wedding-ink">
                  <i
                    className="fa-solid fa-arrow-up-right-from-square text-sm"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
