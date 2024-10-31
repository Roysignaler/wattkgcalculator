// WattToKgCalculator.tsx
"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomSlider from "./CustomSlider";
import CustomToggleGroup from "./CustomToggleGroup";

interface WattToKgCalculatorProps {
  isWarmTheme: boolean;
  result: string;
  setResult: Dispatch<SetStateAction<string>>;
  watts: string;
  setWatts: Dispatch<SetStateAction<string>>;
  kg: string;
  setKg: Dispatch<SetStateAction<string>>;
  gender: "male" | "female"; // Updated to only accept "male" or "female"
  setGender: Dispatch<SetStateAction<"male" | "female">>; // Updated to accept only "male" or "female"
}

export default function WattToKgCalculator({
  isWarmTheme,
  result,
  setResult,
  watts,
  setWatts,
  kg,
  setKg,
  gender,
  setGender,
}: WattToKgCalculatorProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check window width to determine if device is mobile
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSliderChangeWatts = (value: number) => setWatts(value.toString());
  const handleSliderChangeKg = (value: number) => setKg(value.toString());

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2
        className={`${
          isWarmTheme ? "text-[#F94807]" : "text-[#0A1833]"
        } text-lg font-semibold`}
      >
        Watt to KG Calculator
      </h2>

      {/* Watts Input */}
      <div className="relative w-full max-w-xs">
        <input
          type="number"
          value={watts}
          onChange={(e) => setWatts(e.target.value)}
          placeholder="Enter power"
          className={`border-2 px-2 py-1 rounded w-full ${
            isWarmTheme
              ? "border-warm-border text-[#F94807]"
              : "border-cool-border text-[#0A1833]"
          }`}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm opacity-70 pointer-events-none">
          watt
        </span>
      </div>
      <CustomSlider
        value={[Number(watts)]}
        onValueChange={(value) => handleSliderChangeWatts(value[0])}
        max={750}
        step={1}
        defaultValue={160}
        isWarmTheme={isWarmTheme}
      />

      {/* Kg Input */}
      <div className="relative w-full max-w-xs">
        <input
          type="number"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
          placeholder="Enter weight"
          className={`border-2 px-2 py-1 rounded w-full ${
            isWarmTheme
              ? "border-warm-border text-[#F94807]"
              : "border-cool-border text-[#0A1833]"
          }`}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm opacity-70 pointer-events-none">
          kilogram
        </span>
      </div>
      <CustomSlider
        value={[Number(kg)]}
        onValueChange={(value) => handleSliderChangeKg(value[0])}
        max={200}
        step={1}
        defaultValue={90}
        isWarmTheme={isWarmTheme}
      />

      {/* Gender Toggle Group */}
      <CustomToggleGroup
        value={gender}
        onValueChange={setGender}
        isWarmTheme={isWarmTheme}
      />

      {/* Result displayed here on mobile */}
      {result && (
        <>
          <p
            className={`${
              isWarmTheme ? "text-[#F94807]" : "text-[#0A1833]"
            } text-lg font-semibold`}
          >
            {result}
          </p>
        </>
      )}
    </div>
  );
}
