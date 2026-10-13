import React from "react";
import { at, PALETTE, P } from "../view";
import { slabOf, type Plan } from "../../anatomy-kit/iso-kit";
import {
  HYDRAULIC_RAM_SB,
} from "../geometry/bujjiAnatomy";

export function StarboardSuspension() {
  const ramStart = at(HYDRAULIC_RAM_SB.mountA);
  const ramEnd = at(HYDRAULIC_RAM_SB.mountB);
  const rodMid = at(HYDRAULIC_RAM_SB.rodStart);

  // Volumetric Starboard Outrigger Nacelle Box Beam
  const nacellePlan: Plan = { x: 35, y: 52, w: 115, d: 22, r: 4 };
  const nacelle = slabOf(nacellePlan, 14, 18, P, 4, 1.2);

  return (
    <g className="bujji-starboard-suspension" id="starboard-suspension">
      {/* 1. Volumetric Structural Outrigger Nacelle (Box Girder) */}
      <g id="starboard-outrigger-nacelle">
        <path d={nacelle.fill} fill="#1e2533" stroke="#0f141d" strokeWidth="1.2" />
        {nacelle.shades.map((d, s) => (
          <path key={`sb-nacelle-shade-${s}`} d={d} fill={s === 0 ? "#141924" : s === 1 ? "#1c2230" : "#283245"} />
        ))}
        <path d={nacelle.top} fill="#475569" stroke="#64748b" strokeWidth="0.8" />
        {nacelle.crease ? <path d={nacelle.crease} fill="none" stroke="#94a3b8" strokeWidth="0.6" /> : null}
      </g>

      {/* 2. Cantilever Wishbone Suspension Arm (Industrial Yellow) */}
      <g id="yellow-wishbone-arm">
        <path
          d={`M${ramStart[0] - 12},${ramStart[1] + 6} ` +
             `L${rodMid[0] + 8},${rodMid[1] + 8} ` +
             `L${rodMid[0] + 4},${rodMid[1] + 16} ` +
             `L${ramStart[0] - 16},${ramStart[1] + 14} Z`}
          fill={PALETTE.yellowMid}
          stroke="#ca8a04"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Lightening Weight-Reduction Holes */}
        <circle cx={ramStart[0] + 6} cy={ramStart[1] + 8} r="2.4" fill="#1e2430" stroke="#ca8a04" strokeWidth="0.5" />
        <circle cx={ramStart[0] + 24} cy={ramStart[1] + 11} r="2.4" fill="#1e2430" stroke="#ca8a04" strokeWidth="0.5" />
      </g>

      {/* 3. Chrome Hydraulic Lift / Steering Actuator Ram */}
      <g id="starboard-hydraulic-ram" strokeLinecap="round">
        {/* Heavy Cylinder Barrel */}
        <line
          x1={ramStart[0]}
          y1={ramStart[1]}
          x2={rodMid[0]}
          y2={rodMid[1]}
          stroke="#334155"
          strokeWidth="5.5"
        />
        {/* Polished Chrome Cylinder Sheen */}
        <line
          x1={ramStart[0]}
          y1={ramStart[1]}
          x2={rodMid[0]}
          y2={rodMid[1]}
          stroke="#94a3b8"
          strokeWidth="2.8"
        />
        {/* Hard Chrome Piston Rod */}
        <line
          x1={rodMid[0]}
          y1={rodMid[1]}
          x2={ramEnd[0]}
          y2={ramEnd[1]}
          stroke={PALETTE.chrome}
          strokeWidth="2.8"
        />
        {/* Wiper Seal Collar */}
        <circle cx={rodMid[0]} cy={rodMid[1]} r="3.2" fill="#0f172a" stroke="#64748b" strokeWidth="0.8" />
        {/* End Clevis Joint */}
        <circle cx={ramEnd[0]} cy={ramEnd[1]} r="3" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
      </g>

      {/* 4. High-Pressure Hydraulic Fluid Hose with Banjo Fitting */}
      <path
        d={`M${ramStart[0] - 6},${ramStart[1] - 4} ` +
           `Q${ramStart[0] + 10},${ramStart[1] - 14} ${rodMid[0] - 4},${rodMid[1] - 8}`}
        fill="none"
        stroke="#0f172a"
        strokeWidth="2"
      />
    </g>
  );
}
