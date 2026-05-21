type RsvpPhotoCardProps = {
  src?: string;
  alt?: string;
};

export function RsvpPhotoCard({
  src = "/couple.jpg",
  alt = "The couple",
}: RsvpPhotoCardProps) {
  return (
    <div className="min-h-80 flex-1 overflow-hidden rounded-[2rem] border border-[#e6ddd2] bg-[#f4ede4] shadow-[0_24px_70px_rgba(80,56,38,0.08)] lg:min-h-0">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
