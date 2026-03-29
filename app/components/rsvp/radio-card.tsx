type RadioCardProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
};

export function RadioCard({
  id,
  name,
  value,
  label,
  defaultChecked = false,
}: RadioCardProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#e2d6ca] bg-[#fcfaf7] px-4 py-4 text-[#2f2421] transition hover:border-[#b7937f] hover:bg-[#faf3ed]"
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="h-4 w-4 border-[#9f7f6d] text-[#2f2421] focus:ring-[#d9c1b1]"
      />
      <span
        className="text-sm font-medium uppercase tracking-[0.18em]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {label}
      </span>
    </label>
  );
}
