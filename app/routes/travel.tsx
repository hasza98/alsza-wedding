import { useMemo, useState } from "react";

const venueName = "Wein&Speiz Fogadó";
const venueAddress = "Györköny, Petőfi Sandor u. 386";
const churchName = "Nagydorogi Szent István király templom";
const churchAddress = "Nagydorog, Kossuth Lajos utca";
const publicTransportPointName = "Nagydorog vasútállomás";
const publicTransportPointAddress = "Nagydorog, vasútállomás";

const telecarSheetUrl = "https://docs.google.com/spreadsheets/";

type TravelMethod = "car" | "publicTransport" | "telecar";
type DestinationChoice = "venue" | "church";

type Destination = {
  name: string;
  address: string;
};

function getDestination(
  travelMethod: TravelMethod,
  destinationChoice: DestinationChoice,
): Destination {
  if (travelMethod === "publicTransport") {
    return {
      name: publicTransportPointName,
      address: publicTransportPointAddress,
    };
  }

  if (destinationChoice === "church") {
    return {
      name: churchName,
      address: churchAddress,
    };
  }

  return {
    name: venueName,
    address: venueAddress,
  };
}

function buildMapsUrl(
  origin: string,
  destination: Destination,
  travelMethod: TravelMethod,
) {
  const params = new URLSearchParams({
    output: "embed",
    daddr: destination.address,
    dirflg: travelMethod === "publicTransport" ? "r" : "d",
  });

  if (origin.trim()) {
    params.set("saddr", origin.trim());
  } else {
    params.set("q", destination.address);
  }

  return `https://www.google.com/maps?${params.toString()}`;
}

function buildExternalDirectionsUrl(
  origin: string,
  destination: Destination,
  travelMethod: TravelMethod,
) {
  const params = new URLSearchParams({
    api: "1",
    destination: destination.address,
    travelmode: travelMethod === "publicTransport" ? "transit" : "driving",
  });

  if (origin.trim()) {
    params.set("origin", origin.trim());
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function buildPlaceMapsUrl(destination: Destination) {
  const params = new URLSearchParams({
    api: "1",
    destination: destination.address,
  });

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export default function Travel() {
  const [originInput, setOriginInput] = useState("");
  const [routeOrigin, setRouteOrigin] = useState("");
  const [travelMethod, setTravelMethod] = useState<TravelMethod>("car");
  const [destinationChoice, setDestinationChoice] =
    useState<DestinationChoice>("venue");
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const destination = useMemo(
    () => getDestination(travelMethod, destinationChoice),
    [destinationChoice, travelMethod],
  );
  const mapUrl = useMemo(
    () => buildMapsUrl(routeOrigin, destination, travelMethod),
    [destination, routeOrigin, travelMethod],
  );
  const directionsUrl = useMemo(
    () => buildExternalDirectionsUrl(routeOrigin, destination, travelMethod),
    [destination, routeOrigin, travelMethod],
  );
  const keyLocations = [
    {
      ...getDestination("car", "venue"),
      icon: "fa-champagne-glasses",
      label: "Helyszín & Szállás",
    },
    {
      ...getDestination("car", "church"),
      icon: "fa-church",
      label: "Templom",
    },
  ];
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = `${position.coords.latitude},${position.coords.longitude}`;
        setOriginInput(currentLocation);
        setRouteOrigin(currentLocation);
        setLocationStatus("idle");
      },
      () => setLocationStatus("error"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="font-sans text-sm uppercase tracking-[0.35em] text-wedding-labelWarm">
          Travel
        </p>
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Route Planner
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          Enter where you are starting from and choose how you are travelling.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {keyLocations.map((location) => (
          <div
            key={location.label}
            className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-5 shadow-wedding-card"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surfaceWarm text-wedding-muted">
                <i
                  className={`fa-solid ${location.icon} text-base`}
                  aria-hidden="true"
                ></i>
              </span>
              <div className="min-w-0">
                <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-wedding-labelWarm">
                  {location.label}
                </p>
                <h2 className="mt-2 font-display text-2xl text-wedding-ink">
                  {location.name}
                </h2>
                <p className="mt-1 font-sans text-sm leading-6 text-wedding-bodySoft">
                  {location.address}
                </p>
                <a
                  href={buildPlaceMapsUrl(location)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-sans text-sm font-medium text-wedding-muted underline decoration-wedding-accentWarm underline-offset-4 transition hover:text-wedding-ink"
                >
                  Open route in Maps
                  <i
                    className="fa-solid fa-arrow-up-right-from-square text-xs"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-6 shadow-wedding-card">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setRouteOrigin(originInput);
            }}
          >
            <div>
              <label
                htmlFor="travelMethod"
                className="mb-2 block font-sans text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted"
              >
                Travel method
              </label>
              <select
                id="travelMethod"
                name="travelMethod"
                value={travelMethod}
                onChange={(event) =>
                  setTravelMethod(event.target.value as TravelMethod)
                }
                className="w-full appearance-none rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3 text-base text-wedding-ink outline-none transition focus:border-wedding-accent focus:ring-2 focus:ring-wedding-accentSoft"
              >
                <option value="car">Car</option>
                <option value="telecar">Tele-Car / carsharing</option>
                <option value="publicTransport">Public transport</option>
              </select>
            </div>

            {travelMethod !== "publicTransport" && (
              <fieldset>
                <legend className="mb-2 block font-sans text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted">
                  Destination
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-3 font-sans text-sm font-medium uppercase tracking-[0.18em] transition ${
                      destinationChoice === "venue"
                        ? "border-wedding-accent bg-wedding-panelSelected text-wedding-ink shadow-wedding-radio"
                        : "border-wedding-border bg-wedding-surfaceWarm text-wedding-muted hover:border-wedding-accentWarm hover:bg-wedding-panelHover hover:text-wedding-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="destinationChoice"
                      value="venue"
                      checked={destinationChoice === "venue"}
                      onChange={() => setDestinationChoice("venue")}
                      className="sr-only"
                    />
                    Venue
                  </label>
                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-3 font-sans text-sm font-medium uppercase tracking-[0.18em] transition ${
                      destinationChoice === "church"
                        ? "border-wedding-accent bg-wedding-panelSelected text-wedding-ink shadow-wedding-radio"
                        : "border-wedding-border bg-wedding-surfaceWarm text-wedding-muted hover:border-wedding-accentWarm hover:bg-wedding-panelHover hover:text-wedding-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="destinationChoice"
                      value="church"
                      checked={destinationChoice === "church"}
                      onChange={() => setDestinationChoice("church")}
                      className="sr-only"
                    />
                    Church
                  </label>
                </div>
              </fieldset>
            )}

            <div>
              <label
                htmlFor="routeOrigin"
                className="mb-2 block font-sans text-sm font-medium uppercase tracking-[0.2em] text-wedding-muted"
              >
                Starting point
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3 transition focus-within:border-wedding-accent focus-within:ring-2 focus-within:ring-wedding-accentSoft">
                <input
                  id="routeOrigin"
                  name="routeOrigin"
                  type="text"
                  value={originInput}
                  onChange={(event) => setOriginInput(event.target.value)}
                  placeholder="Your address, city, or hotel"
                  className="min-w-0 flex-1 bg-transparent text-base text-wedding-ink outline-none placeholder:text-wedding-placeholder"
                />
                <button
                  type="button"
                  onClick={useCurrentLocation}
                  aria-label="Use current location"
                  title="Use current location"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surface text-wedding-muted transition hover:border-wedding-accentWarm hover:bg-wedding-panelHover hover:text-wedding-ink"
                >
                  <i
                    className={`fa-solid ${
                      locationStatus === "loading"
                        ? "fa-spinner animate-spin"
                        : "fa-location-crosshairs"
                    } text-sm`}
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
              {locationStatus === "error" && (
                <p className="mt-2 text-sm font-medium text-wedding-errorText">
                  We could not access your current location. Please type your
                  starting point instead.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-wedding-border bg-wedding-surfaceWarm px-4 py-3">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-wedding-muted">
                Destination
              </p>
              <p className="mt-2 font-sans text-base text-wedding-ink">
                {destination.name}
              </p>
              <p className="mt-1 font-sans text-sm leading-6 text-wedding-bodySoft">
                {destination.address}
              </p>
              {travelMethod === "publicTransport" && (
                <p className="mt-2 font-sans text-sm leading-6 text-wedding-muted">
                  Public transport routes lead to this nearby point of interest
                  instead of the venue driveway. We will organize transport from
                  the station to the venue.
                </p>
              )}
              {travelMethod === "telecar" && (
                <p className="mt-2 font-sans text-sm leading-6 text-wedding-muted">
                  We will organize shared cars in{" "}
                  <a
                    href={telecarSheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-wedding-muted underline decoration-wedding-accentWarm underline-offset-4 transition hover:text-wedding-ink"
                  >
                    this Tele-Car sheet
                  </a>
                  .
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-wedding-ink px-6 py-4 font-sans text-sm font-medium uppercase leading-none tracking-[0.25em] text-wedding-onInk transition hover:bg-wedding-buttonHover"
            >
              <i
                className="fa-solid fa-route inline-flex h-[1em] w-[1em] items-center justify-center text-[1em] leading-none"
                aria-hidden="true"
              ></i>
              Plan Route
            </button>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-wedding-border px-6 py-3 font-sans text-sm font-medium uppercase tracking-[0.18em] text-wedding-muted transition hover:border-wedding-accentWarm hover:bg-wedding-panelHover hover:text-wedding-ink"
            >
              Open in Google Maps
            </a>
          </form>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-wedding-borderWarm bg-wedding-panel shadow-wedding-card">
          <iframe
            key={mapUrl}
            title="Route planner to the wedding destination"
            src={mapUrl}
            className="h-[28rem] w-full border-0 lg:h-full lg:min-h-[36rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
