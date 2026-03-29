import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/our-story" },
  { label: "Q + A", to: "/q-and-a" },
  { label: "Travel", to: "/travel" },
  { label: "Registry", to: "/registry" },
  { label: "Wedding Party", to: "/wedding-party" },
  { label: "Photos", to: "/photos" },
  { label: "Share Your Photos", to: "/share-photos" },
  { label: "RSVP", to: "/rsvp" },
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#faf8f4] text-[#3b2f2b] antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function FloralTop() {
  return (
    <div className="w-full overflow-hidden">
    <img
      src="/new.png" // ha public-ban van
      alt="Floral decoration"
      className="
        pointer-events-none
        absolute
        top-0
        left-1/2
        -translate-x-1/2
        w-full
        rotate-180
        opacity-95
        z-10
      "
    />
  </div>
  );
}

function Navbar() {
  return (
    <nav className="border-t border-b border-[#e8e0d8]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 text-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
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

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="relative bg-[#faf8f4] overflow-hidden">
        <FloralTop />

        <div className="px-6 pb-8 pt-10 text-center mt-[25rem]">
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

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">{message}</h1>
      <p className="mt-4 text-[#6f625b]">{details}</p>
      {stack && (
        <pre className="mt-6 overflow-x-auto rounded border border-[#e8e0d8] bg-white p-4 text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}