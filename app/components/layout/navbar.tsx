import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";

import { siteNavItems } from "./site-nav-items";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const shouldScrollToNavRef = useRef(false);

  function scrollNavbarToTop() {
    navRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function handleNavItemClick() {
    shouldScrollToNavRef.current = true;
    scrollNavbarToTop();
  }

  useEffect(() => {
    setIsOpen(false);

    if (shouldScrollToNavRef.current) {
      shouldScrollToNavRef.current = false;
      window.requestAnimationFrame(scrollNavbarToTop);
    }
  }, [location.pathname]);

  return (
    <nav ref={navRef} className="border-t border-b border-wedding-borderPage">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="-mx-6 -my-4 md:hidden">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Menü bezárása" : "Menü megnyitása"}
            onClick={() => setIsOpen((current) => !current)}
            className="flex w-full items-center justify-center px-6 py-4 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-wedding-muted transition hover:bg-wedding-panelHover hover:text-wedding-ink"
          >
            Menü
          </button>
        </div>

        <div className="hidden flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center md:flex">
          {siteNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              preventScrollReset
              onClick={handleNavItemClick}
              className={({ isActive }) =>
                [
                  "relative inline-block pb-1 text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-200",
                  "text-wedding-muted hover:text-wedding-ink",
                  "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-center after:scale-x-0 after:bg-wedding-inkSoft after:transition-transform after:duration-300 after:content-['']",
                  "hover:after:scale-x-100",
                  isActive ? "text-wedding-ink after:scale-x-100" : "",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div
          id="mobile-navigation"
          className={[
            "grid transition-[grid-template-rows] duration-300 md:hidden",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div className="mt-4 grid gap-2 border-t border-wedding-borderSoft pt-4">
              {siteNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  preventScrollReset
                  onClick={handleNavItemClick}
                  className={({ isActive }) =>
                    [
                      "rounded-2xl px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.24em] transition",
                      isActive
                        ? "bg-wedding-panelSelected text-wedding-ink shadow-wedding-radio"
                        : "text-wedding-muted hover:bg-wedding-panelHover hover:text-wedding-ink",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
