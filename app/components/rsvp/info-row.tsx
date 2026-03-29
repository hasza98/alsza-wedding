type InfoRowProps = {
  label: string;
  value: string;
};

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#dfd2c5] pb-3 last:border-b-0 last:pb-0">
      <span
        className="text-xs uppercase tracking-[0.28em] text-[#8b6f60]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {label}
      </span>
      <span
        className="text-right text-sm leading-6 text-[#4f433d]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {value}
      </span>
    </div>
  );
}
