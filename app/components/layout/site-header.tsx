import { FloralTop } from "./floral-top";
import { Navbar } from "./navbar";

export function SiteHeader() {
  return (
    <header className="relative overflow-hidden bg-wedding-page">
      <FloralTop />

      <div className="relative z-20 px-6 pt-[25rem] pb-8 text-center">
        <h1
          className="mt-4 font-display text-5xl font-medium uppercase tracking-[0.18em] text-wedding-heading sm:text-6xl"
          
        >
          Aliz &amp; Szatya
        </h1>
        <p
          className="mt-4 text-sm uppercase tracking-[0.35em] text-wedding-mutedWarm"
          
        >
          esküvője
        </p>
        <p
          className="mt-4 text-sm uppercase tracking-[0.3em] text-wedding-mutedWarm sm:text-base"
          
        >
          2026 Szeptember 5. Szombat
        </p>
      </div>

      <Navbar />
    </header>
  );
}
