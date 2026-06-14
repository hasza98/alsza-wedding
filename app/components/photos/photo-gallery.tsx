import { useEffect, useRef, useState } from "react";

const photoModules = import.meta.glob("../../assets/photos/*.{jpg,jpeg,png,webp,avif,heic}", {
  eager: true,
  query: "?url",
  import: "default",
});

type PhotoPosition =
  | "object-center"
  | "object-top"
  | "object-bottom"
  | "object-left"
  | "object-left-top"
  | "object-left-bottom"
  | "object-right"
  | "object-right-top"
  | "object-right-bottom";

type PhotoMetadata = {
  caption: string;
  position: PhotoPosition;
};

const photoMetadata: Record<string, PhotoMetadata> = {
  "20221112_145907.jpg": { caption: "A prágai Lennon fal", position: "object-center" },
  "20230324_033606.jpg": { caption: "D Lift", position: "object-right-top" },
  "20230324_052702.jpg": { caption: "Repcsizünk Bariba", position: "object-top" },
  "20230326_165456.jpg": { caption: "Alberobello és a Trullik", position: "object-left" },
  "20240106_123323.jpg": { caption: "Éves városligeti korizás '24", position: "object-center" },
  "20240502_194912.jpg": { caption: "Az Őrségi Patakparti Alpaka panzió", position: "object-center" },
  "20240525_161100.jpg": { caption: "Kata & Frici - csokor elkapva ✅", position: "object-center" },
  "20240627_012045.jpg": { caption: "BP Park HabParty után", position: "object-center" },
  "20241205_191637.jpg": { caption: "Garden of Lights '24", position: "object-center" },
  "20241228_144909.jpg": { caption: "Tihanyi apátság cukija", position: "object-center" },
  "20250105_141141.jpg": { caption: "Alpe d'Huez '25 Kezdet", position: "object-center" },
  "20250110_145848.jpg": { caption: "Alpe d'Huez '25 Vég", position: "object-top" },
  "20250222_125520.jpg": { caption: "Éves városligeti korizás '25", position: "object-center" },
  "20250418_171009.jpg": { caption: "Nagydorogi húsvéti dekorációban", position: "object-center" },
  "20250517_084122.jpg": { caption: "Indul az olasz meló", position: "object-center" },
  "20250531_121911.jpg": { caption: "Civitá - A Ponta Del Diavolo", position: "object-center" },
  "20250531_150148.jpg": { caption: "Civitá - a mosolygós házak városa", position: "object-top" },
  "20250531_172749.jpg": { caption: "Grotta del Saraceno - A fizetős insta strand", position: "object-center" },
  "20250913_173912.jpg": { caption: "Trixi & Tuti", position: "object-center" },
  "20250920_174753.jpg": { caption: "Jól sikerült családi vitorlázás", position: "object-center" },
  "20251104_101233.jpg": { caption: "Felejthetetlen hely - az ujját nézzétek", position: "object-center" },
  "20251105_170919.jpg": { caption: "Futóbolondok novmeberben...", position: "object-center" },
  "20260117_175607.jpg": { caption: "Garden of Lights '26", position: "object-center" },
  "20260419_222225.jpg": { caption: "Aliz szülinapja (és a szomszédok) túlélve ✅", position: "object-center" },
  "Aliz-Szatya-snowboardosnapok.jpg": { caption: "Chopok és Liptovszki Mikulás", position: "object-center" },
  "att.FBsN3C7nGJ13wrrj2HjviJLCjVKYhN5ombrxTjfO0Qk.jpg": { caption: "Jegyes fotózás a Margit-szigeten", position: "object-center" },
  "att.gWgvAbjgxrQDtyZnYGhOGeYL2ORq0V95uudSwr1TDNg.jpg": { caption: "Limoncello Spritz Tropeában", position: "object-center" },
  "att.io1uPMN2vlxGJLAsTsPpFki_H7vV_IetKHw7KE97L0w.jpg": { caption: "Jegyes fotózás, de itt már nagyon fáztunk", position: "object-center" },
  "att.M8grU4WNj5e9TIZhdPMkyDrG9ehXIXxOd2HPmmZ8Dt4.jpg": { caption: "A Sila-i óriásfenyők", position: "object-center" },
  "att.tE2gYN4DrH7N4BIayS6H9XN4Jx_tJ9eGfcWneurAKCk.jpg": { caption: "A legcukibb jegyesfotónk", position: "object-center" },
  "att.wmXUvA4mExxIFH99y2vL5C3oef30NL4jzXUV-gsUN_c.jpg": { caption: "Jegyefotó 3", position: "object-center" },
  "att.zlJXcxRnND3lTq5ytC3uRbkV1cavRCsaLFNIdPecsIU.jpg": { caption: "Aki ilyeneket szeretne, keresse Evelint! :)", position: "object-center" },
  "IMG_0147.jpg": { caption: "Badacsonyi Bortúra", position: "object-center" },
  "IMG_0576.jpg": { caption: "Garden of Lights '25", position: "object-center" },
  "IMG_0588.jpg": { caption: "Bécsi karácsonyi vásár", position: "object-center" },
  "IMG_1388.jpg": { caption: "A kedvenc Budaörsi IKEA", position: "object-center" },
  "IMG_1504.jpg": { caption: "Alpe d'huez '25", position: "object-center" },
  "IMG_1751.jpg": { caption: "Matera - a bírságok városa", position: "object-center" },
  "IMG_20220816_204240_654.jpg": { caption: "Badacsonyi 2. évforduló", position: "object-center" },
  "IMG_20220816_204240_681.jpg": { caption: "KZT '22", position: "object-center" },
  "IMG_20220816_204240_698.jpg": { caption: "Sziszi & Erik", position: "object-center" },
  "IMG_2310.jpg": { caption: "Az első esküvői helyszín amit megnéztünk - nem ez lett", position: "object-center" },
  "IMG_2346.jpg": { caption: "Józsefvárosi Mikulásfutás", position: "object-center" },
  "IMG_2442.jpg": { caption: "Dunai naplementés SUPozás", position: "object-center" },
  "IMG_2710.jpg": { caption: "Túléltük Papa Sean koncertjét", position: "object-center" },
  "received_651554755571652.jpeg": { caption: "Itt még nem tudtuk...", position: "object-center" },
};

const photos = Object.entries(photoModules)
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? "";
    const metadata = photoMetadata[fileName];

    return {
      src: src as string,
      alt:
        fileName.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") ??
        "Wedding photo",
      caption: metadata?.caption ?? "",
      position: metadata?.position ?? "object-center",
    };
  })
  .sort((a, b) => a.alt.localeCompare(b.alt));

type Photo = (typeof photos)[number];

function shufflePhotos(items: Photo[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export function PhotoGallery() {
  const [activeMobileCaption, setActiveMobileCaption] = useState<string | null>(
    null,
  );
  const [orderedPhotos, setOrderedPhotos] = useState(photos);

  useEffect(() => {
    setOrderedPhotos(shufflePhotos(photos));
  }, []);

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
      {orderedPhotos.map((photo) => (
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
        className={["aspect-square w-full object-cover", photo.position].join(
          " ",
        )}
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
