import React from "react";

interface RangeSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  "aria-label"?: string;
  onChange: (value: number) => void;
}

/** 原生 range 滑块，避免 MUI v4 Slider 的 findDOMNode 警告 */
export default function RangeSlider({
  value,
  min,
  max,
  step = 0.01,
  disabled = false,
  "aria-label": ariaLabel,
  onChange,
}: RangeSliderProps) {
  return (
    <input
      type="range"
      className="w-full h-2 accent-indigo-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      aria-label={ariaLabel}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}
