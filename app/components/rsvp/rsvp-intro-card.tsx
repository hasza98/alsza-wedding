import { InfoRow } from "./info-row";

export function RsvpIntroCard() {
  return (
    <div className="rounded-[2rem] border border-wedding-borderWarm bg-wedding-panel p-8 shadow-wedding-card">
      <p className="text-sm uppercase tracking-[0.35em] text-wedding-labelWarm">
        Visszajelzés
      </p>
      <h2
        className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
        Ünnepeljünk együtt
      </h2>
      <p
        className="mt-5 text-base leading-7 text-wedding-muted">
        Légyszi háztartásonként csak egyszer töltéstek ki. Ha még nem tettétek előbb nézzetek szét az oldalon, hátha választ kaptok valamire, amit itt hiányoltok.
      </p>
      <div className="mt-8 space-y-4 text-sm text-wedding-muted">
        <InfoRow label="Határidő" value="2026. Július 31." />
        <InfoRow label="A nagy nap" value="2026. Szeptember 5." />
      </div>
    </div>
  );
}
