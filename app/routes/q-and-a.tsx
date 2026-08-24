import { useEffect, useState, type ReactNode } from "react";

import contactPhotoDori from "../assets/contacts/dori.jpg";
import contactPhotoEvelin from "../assets/contacts/evelin.jpg";
import contactPhotoSasa from "../assets/contacts/sasa.jpg";
import contactPhotoBogi from "../assets/contacts/bogi.jpg";
import contactPhotoCarlos from "../assets/contacts/carlos.jpg";
import contactPhotoCinti from "../assets/contacts/cinti.jpg";
import contactPhotoBandi from "../assets/contacts/bandi.jpg";
import contactPhotoTimi from "../assets/contacts/timi.jpg";

type Question = {
  question: string;
  answer: ReactNode;
};

type WeddingDayWeather = {
  condition: string;
  icon: string;
  maxTemperature: number;
  minTemperature: number;
  updatedAt: string;
};

const weddingDay = "2026-09-05";
const gyorkonyCoordinates = {
  latitude: 46.63372,
  longitude: 18.69512,
};

const weatherCodeDetails: Record<number, { condition: string; icon: string }> = {
  0: { condition: "Derült idő", icon: "fa-sun" },
  1: { condition: "Többnyire napos", icon: "fa-cloud-sun" },
  2: { condition: "Részben felhős", icon: "fa-cloud-sun" },
  3: { condition: "Borult", icon: "fa-cloud" },
  45: { condition: "Ködös", icon: "fa-smog" },
  48: { condition: "Zúzmarás köd", icon: "fa-smog" },
  51: { condition: "Gyenge szitálás", icon: "fa-cloud-rain" },
  53: { condition: "Szitálás", icon: "fa-cloud-rain" },
  55: { condition: "Erős szitálás", icon: "fa-cloud-rain" },
  56: { condition: "Ónos szitálás", icon: "fa-cloud-rain" },
  57: { condition: "Erős ónos szitálás", icon: "fa-cloud-rain" },
  61: { condition: "Gyenge eső", icon: "fa-cloud-rain" },
  63: { condition: "Eső", icon: "fa-cloud-showers-heavy" },
  65: { condition: "Erős eső", icon: "fa-cloud-showers-heavy" },
  66: { condition: "Ónos eső", icon: "fa-cloud-rain" },
  67: { condition: "Erős ónos eső", icon: "fa-cloud-rain" },
  71: { condition: "Gyenge havazás", icon: "fa-snowflake" },
  73: { condition: "Havazás", icon: "fa-snowflake" },
  75: { condition: "Erős havazás", icon: "fa-snowflake" },
  77: { condition: "Hódarazápor", icon: "fa-snowflake" },
  80: { condition: "Gyenge zápor", icon: "fa-cloud-sun-rain" },
  81: { condition: "Zápor", icon: "fa-cloud-showers-heavy" },
  82: { condition: "Heves zápor", icon: "fa-cloud-showers-heavy" },
  85: { condition: "Gyenge hózápor", icon: "fa-snowflake" },
  86: { condition: "Erős hózápor", icon: "fa-snowflake" },
  95: { condition: "Zivatar", icon: "fa-cloud-bolt" },
  96: { condition: "Zivatar jégesővel", icon: "fa-cloud-bolt" },
  99: { condition: "Erős zivatar jégesővel", icon: "fa-cloud-bolt" },
};

function getWeatherDetails(weatherCode: number) {
  return (
    weatherCodeDetails[weatherCode] ?? {
      condition: "Változékony idő",
      icon: "fa-cloud-sun",
    }
  );
}

function WeddingDayWeatherCard() {
  const [weather, setWeather] = useState<WeddingDayWeather | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      latitude: String(gyorkonyCoordinates.latitude),
      longitude: String(gyorkonyCoordinates.longitude),
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      temperature_unit: "celsius",
      timezone: "Europe/Budapest",
      start_date: weddingDay,
      end_date: weddingDay,
    });

    async function loadWeather() {
      try {
        setStatus("loading");

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Weather forecast request failed");
        }

        const forecast = (await response.json()) as {
          daily?: {
            time?: string[];
            weather_code?: number[];
            temperature_2m_max?: number[];
            temperature_2m_min?: number[];
          };
        };
        const dayIndex = forecast.daily?.time?.indexOf(weddingDay) ?? -1;
        const weatherCode = forecast.daily?.weather_code?.[dayIndex];
        const maxTemperature =
          forecast.daily?.temperature_2m_max?.[dayIndex];
        const minTemperature =
          forecast.daily?.temperature_2m_min?.[dayIndex];

        if (
          dayIndex < 0 ||
          typeof weatherCode !== "number" ||
          typeof maxTemperature !== "number" ||
          typeof minTemperature !== "number"
        ) {
          throw new Error("Wedding day forecast is unavailable");
        }

        const details = getWeatherDetails(weatherCode);

        setWeather({
          ...details,
          maxTemperature,
          minTemperature,
          updatedAt: new Intl.DateTimeFormat("hu-HU", {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date()),
        });
        setStatus("ready");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setStatus("error");
      }
    }

    void loadWeather();

    return () => controller.abort();
  }, []);

  if (status === "loading") {
    return (
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-wedding-borderSoft bg-wedding-surfaceWarm px-4 py-3 text-wedding-muted">
        <i className="fa-solid fa-cloud-sun text-2xl" aria-hidden="true"></i>
        <span>Friss előrejelzés betöltése Györkönyre...</span>
      </div>
    );
  }

  if (status === "error" || !weather) {
    return (
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-wedding-borderSoft bg-wedding-surfaceWarm px-4 py-3 text-wedding-muted">
        <i className="fa-solid fa-cloud-sun-rain text-2xl" aria-hidden="true"></i>
        <span>
          Most nem sikerült betölteni az aktuális előrejelzést, de később
          automatikusan újra a legfrissebb adatokat kérjük le.
        </span>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-2xl border border-wedding-borderSoft bg-wedding-surfaceWarm px-5 py-4 shadow-wedding-radio">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-wedding-border bg-wedding-surface text-wedding-accent">
            <i
              className={`fa-solid ${weather.icon} text-3xl`}
              aria-hidden="true"
            ></i>
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-wedding-labelWarm">
              Györköny, szeptember 5.
            </p>
            <p className="mt-1 font-display text-2xl leading-tight text-wedding-ink">
              {weather.condition}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center sm:min-w-48">
          <div className="rounded-xl border border-wedding-border bg-wedding-surface px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-wedding-labelSoft">
              Min
            </p>
            <p className="mt-1 text-2xl font-medium text-wedding-ink">
              {Math.round(weather.minTemperature)}&deg;C
            </p>
          </div>
          <div className="rounded-xl border border-wedding-border bg-wedding-surface px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-wedding-labelSoft">
              Max
            </p>
            <p className="mt-1 text-2xl font-medium text-wedding-ink">
              {Math.round(weather.maxTemperature)}&deg;C
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-wedding-mutedSoft">
        Az adat az Open-Meteo napi előrejelzéséből frissül. Utolsó betöltés:{" "}
        {weather.updatedAt}.
      </p>
    </div>
  );
}

type ContactPhotoPosition =
  | "object-center"
  | "object-top"
  | "object-bottom"
  | "object-left"
  | "object-left-top"
  | "object-left-bottom"
  | "object-right"
  | "object-right-top"
  | "object-right-bottom";

const weddingContacts = [
  {
    name: "Dóri",
    title: "A vőlegény tanúja",
    image: contactPhotoDori,
    position: "object-center",
  },
    {
    name: "Bogi",
    title: "A menyasszony 1/2 tanúja, Koszorúslány",
    image: contactPhotoBogi,
    position: "object-center",
  },
    {
    name: "Bandi",
    title: "Koszorúsfiú",
    image: contactPhotoBandi,
    position: "object-center",
  },
  {
    name: "Evelin",
    title: "A menyasszony 1/2 tanúja, Koszorúslány",
    image: contactPhotoEvelin,
    position: "object-top",
  },
  {
    name: "Carlos",
    title: "Koszorúsfiú",
    image: contactPhotoCarlos,
    position: "object-center",
  },
  {
    name: "Cinti",
    title: "Koszorúslány",
    image: contactPhotoCinti,
    position: "object-top",
  },
  {
    name: "Sasa",
    title: "Koszorúsfiú",
    image: contactPhotoSasa,
    position: "object-center",
  },
  {
    name: "Timi",
    title: "CeremóniaMester, Koszorúslány",
    image: contactPhotoTimi,
    position: "object-center",
  },
] satisfies Array<{
  name: string;
  title: string;
  image: string;
  position: ContactPhotoPosition;
}>;

const questions: Question[] = [
  {
    question: "Meddig kell visszajeleznem, hogy megyek-e?",
    answer: (
      <p>
        Kérlek <b>augusztus 15-ig</b> töltsd ki a <a href="/visszajelzes">visszajelző formot</a>, hogy még legyen időnk a
        szállást és a megfelelő étkezést előkészíteni.
      </p>
    ),
  },
  {
    question: "Mit vegyek fel?",
    answer: (
      <p>
        A legfontosabb, hogy amiben jól érzed magad! <br /> Ha minden jól alakul kint leszünk éjszaka is, szóval készülj valamivel, ami kívülről átmelegít (a belső melegítésről mi gondoskodunk 😉). <br /> Cipőből is jó ha van stabilabb, mert a táncparkett térköves lesz. <br /> Ezenkívül a gyakran ismételt kérdés, hogy van-e tabu szín? A fehéret már stoppoltuk, de ezenkívül tárt karokkal várjuk a színeket, legyetek a dekorunk része!
      </p>
    ),
  },
  {
    question: "Milyen idő lesz a nagy napon?",
    answer: (
      <>
        <p>
          Az aktuálisan várható időjárást itt látjátok Györkönyre, szeptember
          5-re. A min és max hőmérséklet automatikusan frissül.
        </p>
        <WeddingDayWeatherCard />
      </>
    ),
  },
  {
    question: "Tudom milyen zenétől futna mindenki a táncparkettre. Tehetek javaslatokat?",
    answer: (
      <p>
        Persze! Nyugodtan adj hozzá zenéket <a href="https://open.spotify.com/playlist/47oB7IGUVLuu0p0rsTl3UU?si=fStv5zkaRb2rc5jX2An8Ng&utm_source=copy-link&pt=18e4441b62d3f4307401cc658a9fce9d&pi=r5YYLaOsRciV3" target="_blank">ehhez a listához</a>, de figyelj, hogy ne csak a te zenéid töltsék ki az egészet, hogy mindenki kívánságát egységesen tudjuk figyelembe venni (igen Gábor és Frici, ez főként nektek szól)
      </p>
    ),
  },
  {
    question: "Le tudok parkolni az esküvő helyszínén?",
    answer: (
      <p>
        Ez egy falu. Ahol helyet találsz megállhatsz.
      </p>
    ),
  },
  {
    question: "Lesz szállás vagy a reggeli első buszig kell táncolnom?",
    answer: (
      <p>
        Természetesen lesz, részletes infókat <a href="/szallas">itt olvashatsz</a> róla.
      </p>
    ),
  },
  {
    question: "Hogyan jutok el az esküvő helyszínére?",
    answer: (
      <p>
        Erről részletes tájékoztatót <a href="/helyszin">itt kaphatsz</a>.
      </p>
    ),
  },
  {
    question: "Reggel, ha felébredtem lépjek is le?",
    answer: (
      <p>
        Ha időd engedi, akkor ne! Készülünk nektek egy kis morzsapartyval másnap reggel 9:30-11:00. Megesszük a maradékot, és felidézzük az előző esti elhomályosodott emlékeket.
      </p>
    ),
  },
  {
    question: "Mit kell vinni ajándékba?",
    answer: (
      <>
      <p className="mb-2">
        Magadon kívül semmit! <br /> 
        Ha mégis meglepnél minket, egy borítékkal nem lehet mellé lőni, de ha maradandó tárgyat adnál <a href="https://docs.google.com/spreadsheets/d/1H9UNWvLfmNZA_EbXMMnsJib3DGjN7p1qvkIdNfiWb5A/edit?usp=sharing" target="_blank">itt egy lista</a>, aminek biztos, hogy meglenne a helye a kis lakásunkban. <br/> 
        Ezeket a <u>polgári esküvő utáni gratuláció során</u> lesz lehetőségetek átadni.
      </p>
      <p>
        Ha szeretnétek megtáncoltatni éjfélkor az ifjú párt, akkor mindenképp készüljetek <b>kaparós sorsjeggyel</b>, hogy meghozzátok a szerencsénk.
      </p>
      </>

    ),
  },
  {
    question: "Kit keressek, ha kérdésem van?",
    answer: (
      <>
        <p>
          Az esküvő előtti napig bátran keress minket, de a nagy napon eléggé
          elfoglaltak leszünk, ezért az alábbi 8 szimpatikus arcot keresd a
          kérdéseiddel. Vagy tudni fogják a választ, vagy tudják, kit kell
          keresni.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {weddingContacts.map((contact, index) => (
            <div
              key={`${contact.name}-${index}`}
              className="flex items-center gap-5"
            >
              <img
                src={contact.image}
                alt={`${contact.name} portréja`}
                className={[
                  "h-32 w-32 shrink-0 rounded-2xl border border-wedding-border object-cover shadow-wedding-radio sm:h-40 sm:w-40",
                  contact.position,
                ].join(" ")}
              />
              <div className="min-w-0">
                <h3 className="font-display text-2xl leading-tight text-wedding-ink">
                  {contact.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-wedding-labelWarm">
                  {contact.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

export default function QAndAPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Hasznos infók
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          Itt remélhetőleg minden felmerülő kérdésre választ kaptok, ha mégsem, akkor az utolsó pontban tudtok további infót szerezni.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((item) => (
          <QuestionItem key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}

function QuestionItem({ item }: { item: Question }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-wedding-borderSoft bg-wedding-surface shadow-wedding-card">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-sans text-base font-medium text-wedding-ink"
      >
        <span>{item.question}</span>
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
              "border-t border-wedding-border px-5 font-sans text-sm leading-7 text-wedding-bodySoft transition-[padding,opacity] duration-300 ease-in-out",
              isOpen ? "pb-5 pt-4 opacity-100" : "pb-0 pt-0 opacity-0",
            ].join(" ")}
          >
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
