import { FloralTop } from "./floral-top";
import { Navbar } from "./navbar";

export function SiteHeader() {
  return (
    <header className="relative overflow-hidden bg-[#faf8f4]">
      <FloralTop />

      <div className="relative z-20 px-6 pt-[25rem] pb-8 text-center">
        <h1
          className="mt-4 text-5xl font-medium uppercase tracking-[0.18em] text-[#332824] sm:text-6xl"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Aliz &amp; Szatya
        </h1>
        <p
          className="mt-4 text-sm uppercase tracking-[0.35em] text-[#7c6f68]"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          esküvője
        </p>
        <p
          className="mt-4 text-sm uppercase tracking-[0.3em] text-[#7c6f68] sm:text-base"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          2026 Szeptember 5. Szombat
        </p>
      </div>

      <Navbar />
    </header>
  );
}
