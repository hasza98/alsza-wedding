type RsvpPhotoCardProps = {
  src?: string;
  alt?: string;
};

export function RsvpPhotoCard({
  src = "/couple.jpg",
  alt = "The couple",
}: RsvpPhotoCardProps) {
  return (
    <div className="min-h-80 flex-1 overflow-hidden rounded-[2rem] border border-wedding-borderWarm bg-wedding-panel shadow-wedding-card lg:min-h-0">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
