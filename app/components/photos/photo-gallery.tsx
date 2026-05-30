import { useEffect, useRef, useState } from "react";

const photoModules = import.meta.glob("../../assets/photos/*.{jpg,jpeg,png,webp,avif,heic}", {
  eager: true,
  query: "?url",
  import: "default",
});

const photoCaptions: Record<string, string> = {
  "20221112_145907.jpg": "A prágai Lennon fal",
  "20230324_033606.jpg": "D Lift",
  "20230324_052702.jpg": "Repcsizünk Bariba",
  "20230326_165456.jpg": "Alberobello és a Trullik",
  "20240106_123323.jpg": "Éves városligeti korizás '24",
  "20240502_194912.jpg": "Az Őrségi Patakparti Alpaka panzió",
  "20240525_161100.jpg": "Kata & Frici - csokor elkapva ✅",
  "20240627_012045.jpg": "BP Park HabParty után",
  "20241205_191637.jpg": "Garden of Lights '24",
  "20241228_144909.jpg": "Tihanyi apátság cukija",
  "20250105_141141.jpg": "Alpe d'Huez '25 Kezdet",
  "20250110_145848.jpg": "Alpe d'Huez '25 Vég",
  "20250222_125520.jpg": "Éves városligeti korizás '25",
  "20250418_171009.jpg": "Nagydorogi húsvéti dekorációban",
  "20250517_084122.jpg": "Indul az olasz meló",
  "20250531_121911.jpg": "Civitá - A Ponta Del Diavolo",
  "20250531_150148.jpg": "Civitá - a mosolygós házak városa",
  "20250531_172749.jpg": "Grotta del Saraceno - A fizetős insta strand",
  "20250913_173912.jpg": "Trixi & Tuti",
  "20250920_174753.jpg": "Jól sikerült családi vitorlázás",
  "20251104_101233.jpg": "Felejthetetlen hely - az ujját nézzétek",
  "20251105_170919.jpg": "Futóbolondok novmberben...",
  "20260117_175607.jpg": "Garden of Lights '26",
  "20260419_222225.jpg": "Aliz szülinapja (és a szomszédok) túlélve ✅",
  "Aliz-Szatya-snowboardosnapok.jpg": "Chopok és Liptovszki Mikulás",
  "att.FBsN3C7nGJ13wrrj2HjviJLCjVKYhN5ombrxTjfO0Qk.jpg":
    "Jegyes fotózás a Margit-szigeten",
  "att.gWgvAbjgxrQDtyZnYGhOGeYL2ORq0V95uudSwr1TDNg.jpg":
    "Limoncello Spritz Tropeában",
  "att.io1uPMN2vlxGJLAsTsPpFki_H7vV_IetKHw7KE97L0w.jpg":
    "Jegyes fotózás, de itt már nagyon fáztunk",
  "att.M8grU4WNj5e9TIZhdPMkyDrG9ehXIXxOd2HPmmZ8Dt4.jpg":
    "A Sila-i óriásfenyők",
  "att.tE2gYN4DrH7N4BIayS6H9XN4Jx_tJ9eGfcWneurAKCk.jpg":
    "A legcukibb jegyesfotónk",
  "att.wmXUvA4mExxIFH99y2vL5C3oef30NL4jzXUV-gsUN_c.jpg":
    "Jegyefotó 3",
  "att.zlJXcxRnND3lTq5ytC3uRbkV1cavRCsaLFNIdPecsIU.jpg":
    "Aki ilyeneket szeretne, keresse Evelint! :)",
  "IMG_0147.jpg": "Badacsonyi Bortúra",
  "IMG_0576.jpg": "Garden of Lights '25",
  "IMG_0588.jpg": "Bécsi karácsonyi vásár",
  "IMG_1388.jpg": "A kedvenc Budaörsi IKEA",
  "IMG_1504.jpg": "Alpe d'huez '25",
  "IMG_1751.jpg": "Matera - a bírságok városa",
  "IMG_20220816_204240_654.jpg": "Badacsonyi 2. évforduló",
  "IMG_20220816_204240_681.jpg": "KZT '22",
  "IMG_20220816_204240_698.jpg": "Sziszi & Erik",
  "IMG_2310.jpg": "Az első esküvői helyszín amit megnéztünk - nem ez lett",
  "IMG_2346.jpg": "Józsefvárosi Mikulásfutás",
  "IMG_2442.jpg": "Dunai naplementés SUPozás",
  "IMG_2710.jpg": "Túléltük Papa Sean koncertjét",
  "received_651554755571652.jpeg": "Itt még nem tudták...",
};

const photos = Object.entries(photoModules)
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? "";

    return {
      src: src as string,
      alt:
        fileName.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") ??
        "Wedding photo",
      caption: photoCaptions[fileName] ?? "",
    };
  })
  .sort((a, b) => a.alt.localeCompare(b.alt));

type Photo = (typeof photos)[number];

export function PhotoGallery() {
  const [activeMobileCaption, setActiveMobileCaption] = useState<string | null>(
    null,
  );

  if (photos.length === 0) {
    return (
      <div className="rounded-[2rem] border border-wedding-borderSoft bg-wedding-surface p-8 text-center shadow-wedding-card">
        <p className="font-sans text-sm leading-7 text-wedding-muted">
          Add photos to <span className="font-medium">app/assets/photos</span>{" "}
          and they will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.src}
          photo={photo}
          isMobileCaptionActive={activeMobileCaption === photo.src}
          setActiveMobileCaption={setActiveMobileCaption}
        />
      ))}
    </div>
  );
}

function PhotoCard({
  photo,
  isMobileCaptionActive,
  setActiveMobileCaption,
}: {
  photo: Photo;
  isMobileCaptionActive: boolean;
  setActiveMobileCaption: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const figure = figureRef.current;

    if (!figure) {
      return;
    }

    const observedFigure = figure;
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    let observer: IntersectionObserver | undefined;

    function updateObserver() {
      observer?.disconnect();
      setActiveMobileCaption((current) =>
        current === photo.src ? null : current,
      );

      if (!mediaQuery.matches) {
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setActiveMobileCaption((current) => {
            if (entry.isIntersecting) {
              return photo.src;
            }

            return current === photo.src ? null : current;
          });
        },
        {
          rootMargin: "-42% 0px -42% 0px",
          threshold: 0,
        },
      );
      observer.observe(observedFigure);
    }

    updateObserver();
    mediaQuery.addEventListener("change", updateObserver);

    return () => {
      observer?.disconnect();
      mediaQuery.removeEventListener("change", updateObserver);
    };
  }, [photo.src, setActiveMobileCaption]);

  return (
    <figure
      ref={figureRef}
      className="group relative overflow-hidden rounded-2xl border border-wedding-borderSoft bg-wedding-surface shadow-wedding-card"
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="aspect-square w-full object-cover"
      />
      {photo.caption && (
        <figcaption
          className={[
            "absolute inset-x-0 bottom-0 bg-wedding-surface/95 px-4 py-3 text-center font-sans text-sm leading-6 text-wedding-muted shadow-wedding-card transition-transform duration-300 md:translate-y-full md:group-hover:translate-y-0 md:group-focus-within:translate-y-0",
            isMobileCaptionActive ? "translate-y-0" : "translate-y-full",
          ].join(" ")}
        >
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}
