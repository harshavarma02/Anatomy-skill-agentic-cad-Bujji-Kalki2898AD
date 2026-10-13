import React from "react";
import { at, PALETTE, P } from "../view";
import { slabOf, type Plan } from "../../anatomy-kit/iso-kit";

export function DualInductionMotorsView() {
  // 1. Variable-Frequency Dual Inverter Drive Controller (VFDs)
  const inverterPlan: Plan = { x: -146, y: -10, w: 16, d: 20, r: 2 };
  const inverter = slabOf(inverterPlan, 22, 6, P, 1.2, 0.8);

  // 2. 9,800 Nm Heavy Reduction Gearbox Transfer Case (Between the two motors)
  const gearboxPlan: Plan = { x: -156, y: -8, w: 12, d: 16, r: 2 };
  const gearbox = slabOf(gearboxPlan, 14, 10, P, 1.5, 0.8);

  // Motor Centers (Air-cooled Kirloskar Induction Motors, 94 kW combined)
  const motorPort = at([-140, -16, 18]);
  const motorSB = at([-140, 16, 18]);

  return (
    <g className="bujji-dual-induction-motors" id="dual-induction-motors">
      {/* --- Dual Kirloskar Induction Motors (Left & Right) --- */}
      {/* Port Motor Body (Cylindrical Stator with Radial Cooling Fins) */}
      <g id="kirloskar-motor-port">
        {/* Motor Cylinder Base */}
        <ellipse cx={motorPort[0]} cy={motorPort[1]} rx="9" ry="5.2" fill="#1e2533" stroke="#0f141d" strokeWidth="1" />
        {/* Radial Air-Cooling Fins */}
        {[-3, 0, 3].map((dz) => {
          const pt = at([-140, -16, 18 + dz]);
          return (
            <ellipse
              key={`port-motor-fin-${dz}`}
              cx={pt[0]}
              cy={pt[1]}
              rx="9.5"
              ry="5.5"
              fill="none"
              stroke="#475569"
              strokeWidth="0.8"
            />
          );
        })}
        {/* Top Rotor Endbell Cap */}
        <ellipse cx={at([-140, -16, 23])[0]} cy={at([-140, -16, 23])[1]} rx="8" ry="4.5" fill="#333f52" stroke="#64748b" strokeWidth="0.8" />
        {/* High-Voltage Motor Terminal Box */}
        <rect
          x={motorPort[0] - 3.5}
          y={motorPort[1] - 8}
          width="7"
          height="4.5"
          rx="1"
          fill="#0f172a"
          stroke="#ea580c"
          strokeWidth="0.8"
        />
      </g>

      {/* Starboard Motor Body (Foreground Hero Motor) */}
      <g id="kirloskar-motor-starboard">
        {/* Motor Cylinder Base */}
        <ellipse cx={motorSB[0]} cy={motorSB[1]} rx="9" ry="5.2" fill="#242c3d" stroke="#0f141d" strokeWidth="1" />
        {/* Radial Air-Cooling Fins */}
        {[-3, 0, 3].map((dz) => {
          const pt = at([-140, 16, 18 + dz]);
          return (
            <ellipse
              key={`sb-motor-fin-${dz}`}
              cx={pt[0]}
              cy={pt[1]}
              rx="9.5"
              ry="5.5"
              fill="none"
              stroke="#64748b"
              strokeWidth="0.8"
            />
          );
        })}
        {/* Top Rotor Endbell Cap */}
        <ellipse cx={at([-140, 16, 23])[0]} cy={at([-140, 16, 23])[1]} rx="8" ry="4.5" fill="#475569" stroke="#94a3b8" strokeWidth="0.8" />
        {/* High-Voltage Motor Terminal Box */}
        <rect
          x={motorSB[0] - 3.5}
          y={motorSB[1] - 8}
          width="7"
          height="4.5"
          rx="1"
          fill="#0f172a"
          stroke="#ea580c"
          strokeWidth="0.8"
        />
      </g>

      {/* --- 9,800 Nm Planetary Reduction Gearbox Transfer Case --- */}
      <g id="reduction-gearbox-case">
        <path d={gearbox.fill} fill="#1a202c" stroke="#0a0e14" strokeWidth="1" />
        {gearbox.shades.map((d, s) => (
          <path key={`gb-shade-${s}`} d={d} fill={s === 0 ? "#121620" : s === 1 ? "#1e2533" : "#2d3748"} />
        ))}
        <path d={gearbox.top} fill="#3b485d" stroke="#475569" strokeWidth="0.8" />
        {gearbox.crease && <path d={gearbox.crease} fill="none" stroke="#64748b" strokeWidth="0.6" />}

        {/* Circular Inspection Flange & Perimeter Fastener Bolts */}
        <ellipse
          cx={at([-150, 0, 24.2])[0]}
          cy={at([-150, 0, 24.2])[1]}
          rx="5"
          ry="3"
          fill="#273142"
          stroke="#64748b"
          strokeWidth="0.8"
        />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={`gb-bolt-${deg}`}
              cx={at([-150, 0, 24.2])[0] + 4 * Math.cos(rad)}
              cy={at([-150, 0, 24.2])[1] + 2.4 * Math.sin(rad)}
              r="0.6"
              fill="#cbd5e1"
            />
          );
        })}
      </g>

      {/* --- Dual Variable-Frequency Inverter Drive (VFDs) --- */}
      <g id="inverter-vfd-controllers">
        <path d={inverter.fill} fill="#141923" stroke="#0a0d13" strokeWidth="1" />
        {inverter.shades.map((d, s) => (
          <path key={`inv-shade-${s}`} d={d} fill={s === 0 ? "#0f121a" : s === 1 ? "#1b2230" : "#2a354a"} />
        ))}
        <path d={inverter.top} fill="#475569" stroke="#64748b" strokeWidth="0.8" />
        {inverter.crease && <path d={inverter.crease} fill="none" stroke="#94a3b8" strokeWidth="0.6" />}

        {/* Inverter Extruded Heatsink Cooling Strakes */}
        <g stroke="#94a3b8" strokeWidth="0.8" strokeLinecap="round">
          <line x1={at([-144, -7, 28.2])[0]} y1={at([-144, -7, 28.2])[1]} x2={at([-132, -7, 28.2])[0]} y2={at([-132, -7, 28.2])[1]} />
          <line x1={at([-144, 0, 28.2])[0]} y1={at([-144, 0, 28.2])[1]} x2={at([-132, 0, 28.2])[0]} y2={at([-132, 0, 28.2])[1]} />
          <line x1={at([-144, 7, 28.2])[0]} y1={at([-144, 7, 28.2])[1]} x2={at([-132, 7, 28.2])[0]} y2={at([-132, 7, 28.2])[1]} />
        </g>
        {/* Drive Phase Status LEDs */}
        <circle cx={at([-134, -4, 28.4])[0]} cy={at([-134, -4, 28.4])[1]} r="1" fill="#22c55e" />
        <circle cx={at([-134, 4, 28.4])[0]} cy={at([-134, 4, 28.4])[1]} r="1" fill="#38bdf8" />
      </g>
    </g>
  );
}
