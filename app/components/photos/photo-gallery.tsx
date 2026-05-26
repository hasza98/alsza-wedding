const photoModules = import.meta.glob("../../assets/photos/*.{jpg,jpeg,png,webp,avif,heic}", {
  eager: true,
  query: "?url",
  import: "default",
});

const photos = Object.entries(photoModules)
  .map(([path, src]) => ({
    src: src as string,
    alt: path
      .split("/")
      .pop()
      ?.replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ") ?? "Wedding photo",
  }))
  .sort((a, b) => a.alt.localeCompare(b.alt));

export function PhotoGallery() {
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
        <figure
          key={photo.src}
          className="group overflow-hidden rounded-2xl border border-wedding-borderSoft bg-wedding-surface shadow-wedding-card"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </figure>
      ))}
    </div>
  );
}
