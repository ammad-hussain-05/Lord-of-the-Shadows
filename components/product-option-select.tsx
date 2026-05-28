"use client"

type ProductOptionSelectProps = {
  label: string
  value: string
  options: string[]
  placeholder?: string
  onChange: (value: string) => void
  required?: boolean
  className?: string
}

export default function ProductOptionSelect({
  label,
  value,
  options,
  placeholder = "Select option",
  onChange,
  required = false,
  className = "",
}: ProductOptionSelectProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        <span>{label}</span>
        {required && <span className="text-[#d47828]">*</span>}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-white/10 bg-black/50 px-4 text-sm text-white outline-none backdrop-blur-md transition focus:border-[#d47828]/70 focus:ring-2 focus:ring-[#d47828]/20"
      >
        <option value="" className="bg-black text-white/70">
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option} className="bg-black text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}