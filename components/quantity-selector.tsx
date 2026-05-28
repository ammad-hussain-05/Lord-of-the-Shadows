"use client"

import { Minus, Plus } from "lucide-react"

type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className = "",
}: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const increase = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div
      className={`inline-flex items-center overflow-hidden rounded-full border border-white/15 bg-black/40 backdrop-blur-md ${className}`}
    >
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className="flex h-10 w-10 items-center justify-center text-white/80 transition hover:bg-white/10 hover:text-[#d47828] disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>

      <div className="flex h-10 min-w-12 items-center justify-center border-x border-white/10 px-3 text-sm font-semibold text-white">
        {value}
      </div>

      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className="flex h-10 w-10 items-center justify-center text-white/80 transition hover:bg-white/10 hover:text-[#d47828] disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}