import { useEffect, useRef, useState } from "react";

const photoModules = import.meta.glob("../../assets/photos/*.{jpg,jpeg,png,webp,avif,heic}", {
  eager: true,
  query: "?url",
  import: "default",
});

const photoCaptions: Record<string, string> = {
  "IMG_0147.jpg": "Add a short memory for this photo.",
  "IMG_0576.jpg": "Add a short memory for this photo.",
  "IMG_0588.jpg": "Add a short memory for this photo.",
  "IMG_1388.jpg": "Add a short memory for this photo.",
  "IMG_1504.jpg": "Add a short memory for this photo.",
  "IMG_1751.jpg": "Add a short memory for this photo.",
  "IMG_2310.jpg": "Add a short memory for this photo.",
  "IMG_2346.jpg": "Add a short memory for this photo.",
  "IMG_2442.jpg": "Add a short memory for this photo.",
  "IMG_2710.jpg": "Add a short memory for this photo.",
  "att.FBsN3C7nGJ13wrrj2HjviJLCjVKYhN5ombrxTjfO0Qk.jpg":
    "Add a short memory for this photo.",
  "att.M8grU4WNj5e9TIZhdPMkyDrG9ehXIXxOd2HPmmZ8Dt4.jpg":
    "Add a short memory for this photo.",
  "att.gWgvAbjgxrQDtyZnYGhOGeYL2ORq0V95uudSwr1TDNg.jpg":
    "Add a short memory for this photo.",
  "att.wmXUvA4mExxIFH99y2vL5C3oef30NL4jzXUV-gsUN_c.jpg":
    "Add a short memory for this photo.",
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
