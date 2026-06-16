import { useEffect, useRef, type MouseEvent } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import monogramLogo from "./assets/monogram/ASZ_nobg.png";
import { SiteHeader } from "./components/layout/site-header";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: monogramLogo, type: "image/png" },
  { rel: "apple-touch-icon", href: monogramLogo },
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
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
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
      <body className="bg-wedding-page font-sans text-wedding-inkSoft antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldScrollToNavbar = useRef(false);

  function scrollNavbarToTop() {
    document.getElementById("site-navbar")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleInternalLinkClick(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const anchor = target.closest<HTMLAnchorElement>("a[href]");

    if (
      !anchor ||
      anchor.target === "_blank" ||
      anchor.hasAttribute("download")
    ) {
      return;
    }

    const url = new URL(anchor.href, window.location.href);

    if (url.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    shouldScrollToNavbar.current = true;

    const destination = `${url.pathname}${url.search}${url.hash}`;
    const current = `${location.pathname}${location.search}${location.hash}`;

    if (destination === current) {
      shouldScrollToNavbar.current = false;
      scrollNavbarToTop();
      return;
    }

    navigate(destination, { preventScrollReset: true });
  }

  useEffect(() => {
    if (!shouldScrollToNavbar.current) {
      return;
    }

    shouldScrollToNavbar.current = false;
    window.requestAnimationFrame(scrollNavbarToTop);
  }, [location.key]);

  return (
    <>
      <div className="min-h-screen" onClickCapture={handleInternalLinkClick}>
        <SiteHeader />

        <main className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage: "url('/flowerbg.png')",
              backgroundPosition: "top center",
              backgroundRepeat: "repeat",
              backgroundSize: "640px auto",
            }}
          />
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
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
      <p className="mt-4 text-wedding-bodyMuted">{details}</p>
      {stack && (
        <pre className="mt-6 overflow-x-auto rounded border border-wedding-borderPage bg-wedding-surface p-4 text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
