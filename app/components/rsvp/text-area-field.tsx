type TextAreaFieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
};

export function TextAreaField({
  id,
  label,
  name,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-sm font-medium uppercase tracking-[0.2em] text-[#5f524c]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {label}
      </span>
      <textarea
        id={id}
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#e2d6ca] bg-[#fcfaf7] px-4 py-3 text-base text-[#2f2421] outline-none transition placeholder:text-[#a29185] focus:border-[#9f7f6d] focus:ring-2 focus:ring-[#d9c1b1]"
      />
    </label>
  );
}
