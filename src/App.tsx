import React from "react";
import { Plate } from "./anatomy-kit/draw";
import { CutawaySlider } from "./bujji-opened-up/components/CutawaySlider";
import { ThrottleControl } from "./bujji-opened-up/components/ThrottleControl";

export default function App() {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const splitParam = params?.get("split");
  const initialSplit = splitParam ? Math.max(10, Math.min(990, Number(splitParam))) : 500;

  return (
    <div
      className="iso min-h-screen bg-[#e9ecef] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8"
      data-theme="light"
    >
      <div className="w-full max-w-[1100px] flex flex-col items-stretch">
        {/* Master Anatomy Plate */}
        <Plate
          fig="FIG. 01"
          title="BUJJI FRONT-DRIVE BENCH // KALKI 2898 AD"
          hint="DRAG DIVIDER TO REVEAL INTERNAL POWERTRAIN"
          readout={<span>47 kWh &bull; 9,800 Nm</span>}
        >
          <CutawaySlider initialSplit={initialSplit} />
        </Plate>

        {/* Minimal Engineering Throttle Control */}
        <div className="w-full mt-2">
          <ThrottleControl />
        </div>

        {/* Technical Provenance Note */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-3 px-1">
          <span>KALKI 2898 AD &bull; BUJJI 1:1 VEHICLE ANATOMY</span>
          <span>AZIMUTH 42&deg; &bull; ELEVATION 30&deg; &bull; PURE ISOMETRIC VECTOR</span>
        </div>
      </div>
    </div>
  );
}
