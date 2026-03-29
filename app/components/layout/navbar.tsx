import { NavLink } from "react-router";

import { siteNavItems } from "./site-nav-items";

export function Navbar() {
  return (
    <nav className="border-t border-b border-[#e8e0d8]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 text-center">
        {siteNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            preventScrollReset
            className={({ isActive }) =>
              [
                "relative inline-block pb-1 text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-200",
                "text-[#5f524c] hover:text-[#2f2421]",
                "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-center after:scale-x-0 after:bg-[#3b2f2b] after:transition-transform after:duration-300 after:content-['']",
                "hover:after:scale-x-100",
                isActive ? "text-[#2f2421] after:scale-x-100" : "",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
