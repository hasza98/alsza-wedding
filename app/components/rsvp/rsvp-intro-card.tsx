import { InfoRow } from "./info-row";

export function RsvpIntroCard() {
  return (
    <div className="rounded-[2rem] border border-[#e6ddd2] bg-[#f4ede4] p-8 shadow-[0_24px_70px_rgba(80,56,38,0.08)]">
      <p
        className="text-sm uppercase tracking-[0.35em] text-[#8b6f60]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        Visszajelzés
      </p>
      <h2
        className="mt-4 text-4xl text-[#2f2421] sm:text-5xl"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        Ünnepeljünk együtt
      </h2>
      <p
        className="mt-5 text-base leading-7 text-[#5f524c]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        Légyszi háztartásonként csak egyszer töltéstek ki. Jöhetnek a zene kérések (eskü figyelembe vesszük a jókat), illetve egyéb hasznos megjegyzések :)
      </p>
      <div className="mt-8 space-y-4 text-sm text-[#5f524c]">
        <InfoRow label="Határidő" value="2026. Szeptember 1." />
        <InfoRow label="A nagy nap" value="2026. Szeptember 5." />
      </div>
    </div>
  );
}
