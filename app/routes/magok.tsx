import { useState } from "react";

import torpikekKep from "../assets/torpikekkep.webp";

const species = [
  "egynyári tisztesfű (Stachys annua)",
  "ernyős tatárvirág (Iberis umbellata)",
  "festő pipitér (Anthemis tinctoria)",
  "gyepes szappanfű (Saponaria ocymoides)",
  "háromszínű árvácska (Viola tricolor)",
  "havasi nefelejcs (Myosotis alpestris)",
  "homoki habszegfű (Silene conica)",
  "illatos rezeda (Reseda odorata)",
  "kárpáti harangvirág (Campanula carpatica)",
  "kerti habszegfű (Silene armeria)",
  "keserű tatárvirág (Iberis amara)",
  "körömvirág (Calendula officinalis)",
  "kúszó fátyolvirág (Gypsophila repens)",
  "marokkói gyújtoványfű (Linaria maroccana)",
  "mezei árvácska (Viola arvensis)",
  "mezei katicavirág (Nigella arvensis)",
  "mézvirág (Lobularia maritima)",
  "nyúlszapuka (Anthyllis vulneraria)",
  "parlagi madárhúr (Cerastium arvense)",
  "parlagi pipitér (Anthemis arvensis)",
  "pázsitviola (Aubrieta hybrida)",
  "porcsinrózsa (Portulaca grandiflora)",
  "réti szegfű (Dianthus deltoides)",
  "törpe rézvirág (Zinnia elegans)",
  "sárgaviola (Cheiranthus cheiri)",
  "szirti ternye (Alyssum saxatile)",
  "tarkalevelű zsálya (Salvia horminum)",
  "törpe tátika (Antirrhinum majus)",
  "törpe törökszegfű (Dianthus barbatus)",
  "törpe búzavirág (Centaurea cyanus)",
];

export default function Magok() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Köszönő csoMAG
        </h1>
      </div>

      <div className="grid items-start gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <article className="overflow-hidden rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface shadow-wedding-card">
            <img
              src={torpikekKep}
              alt="Törpikék magkeverék"
              className="w-full bg-wedding-surfaceWarm object-contain"
            />
          </article>

          <SpeciesAccordion />
        </div>

        <article className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-6 shadow-wedding-card sm:p-8">
          <div className="space-y-4 font-sans text-sm leading-7 text-wedding-bodySoft">
            <h2 className="pt-2 font-display text-2xl leading-8 text-wedding-ink">
              Törpikék Magkeverék
            </h2>
            
            <p>
              A Törpikék mixben maximum 30 cm-es fajok vannak, így a hasonló magasság miatt
              egy rendezettebb képet kap a virágszigetünk. A keverékben némely
              faj alapvetően alacsony (árvácska, szirti ternye, gyepes
              szappanfű), némely virágnak pedig a törpe variációja került bele
              (törpe búzavirág, törpe tátika, törpe rézvirág, törpe
              törökszegfű). Ez egy első évben is igazán látványos, hamar és
              hosszan virágzó keverék, melyben vegyesen egynyári és évelő fajok
              vannak: az egynyáriak már az első évtől virágoznak, míg az évelők
              majd második évtől. Az egynyáriak is elszórják a magjukat, így nem
              kell a keveréket újravetni sem.
            </p>

            <h2 className="pt-2 font-display text-2xl leading-8 text-wedding-ink">
              Vetési javaslat
            </h2>

            <p>
              Szórd szét amit kaptál, kb. 1 négyzetméteren. Vessük szabadföldbe, előkészített, gyommentes magágyba (ne fű közé). Ne takarjuk a magokat, sok mag fényre csírázik. Szárazságtűrő, de vetés után csírázás alatt tartsuk nedvesen a földet (2-3 hét), őszi vetéskor tavasszal is locsoljuk kicsit. Nyáron havi 1-2 öntözést meghálálnak. Vethetjük kora tavasszal vagy ősszel. Első évben az egynyáriak nyílnak, másodévtől az évelők is. Évente egyszer, késő ősszel vagy kora tavasszal vágjuk vissza. Jó csírázást kívánunk a magoknak!
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function SpeciesAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-wedding-borderSoft bg-wedding-surface shadow-wedding-card">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-sans text-base font-medium text-wedding-ink"
      >
        <span>Mi van benne?</span>
        <span
          className={[
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-wedding-surfaceWarm text-wedding-muted transition",
            isOpen
              ? "rotate-180 border-wedding-accent text-wedding-ink"
              : "border-wedding-border",
          ].join(" ")}
        >
          <i className="fa-solid fa-chevron-down text-sm" aria-hidden="true"></i>
        </span>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div
            className={[
              "space-y-3 border-t border-wedding-border px-5 font-sans text-sm leading-7 text-wedding-bodySoft transition-[padding,opacity] duration-300 ease-in-out",
              isOpen ? "pb-5 pt-4 opacity-100" : "pb-0 pt-0 opacity-0",
            ].join(" ")}
          >
            <ul className="space-y-2">
              {species.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
