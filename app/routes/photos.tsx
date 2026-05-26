import { PhotoGallery } from "../components/photos/photo-gallery";

export default function Photos() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="font-sans text-sm uppercase tracking-[0.35em] text-wedding-labelWarm">
          Photos
        </p>
        <h1 className="mt-4 font-display text-4xl text-wedding-ink sm:text-5xl">
          Gallery
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-7 text-wedding-muted">
          A collection of photos from our story and the celebration.
        </p>
      </div>

      <PhotoGallery />
    </section>
  );
}
