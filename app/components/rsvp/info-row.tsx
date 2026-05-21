type InfoRowProps = {
  label: string;
  value: string;
};

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-wedding-divider pb-3 last:border-b-0 last:pb-0">
      <span
        className="text-xs uppercase tracking-[0.28em] text-wedding-labelWarm"
        
      >
        {label}
      </span>
      <span
        className="text-right text-sm leading-6 text-wedding-value"
        
      >
        {value}
      </span>
    </div>
  );
}
