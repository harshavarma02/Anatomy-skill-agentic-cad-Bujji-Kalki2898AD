import React from "react";
import { at, PALETTE, P } from "../view";

export function RearSteeringHydraulicsView() {
  const pumpCenter = at([-132, -22, 18]);
  const gerotorCenter = at([-160, 0, 26]);
  const coilPortTop = at([-175, -18, 36]);
  const coilPortBottom = at([-175, -18, 22]);
  const coilSBTop = at([-175, 18, 36]);
  const coilSBBottom = at([-175, 18, 22]);

  return (
    <g className="bujji-rear-steering-hydraulics" id="rear-steering-hydraulics">
      {/* 1. Electro-Hydraulic High-Pressure Steering Pump */}
      <g id="electro-hydraulic-pump">
        {/* Pump Motor Canister */}
        <ellipse cx={pumpCenter[0]} cy={pumpCenter[1]} rx="7" ry="4" fill="#1e2533" stroke="#0f141d" strokeWidth="1" />
        <ellipse cx={at([-132, -22, 23])[0]} cy={at([-132, -22, 23])[1]} rx="6" ry="3.4" fill="#333f52" stroke="#64748b" strokeWidth="0.8" />
        {/* Fluid Reservoir Tank */}
        <rect
          x={pumpCenter[0] - 8}
          y={pumpCenter[1] - 4}
          width="6"
          height="8"
          rx="1.5"
          fill="#141924"
          stroke="#475569"
          strokeWidth="0.8"
        />
        {/* Pressure Gauge */}
        <circle cx={pumpCenter[0] + 5} cy={pumpCenter[1] - 2} r="1.8" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.6" />
        <circle cx={pumpCenter[0] + 5} cy={pumpCenter[1] - 2} r="0.6" fill="#ef4444" />
      </g>

      {/* 2. Gerotor-Type Orbital Hydraulic Steering Motor (Mounted on Pivot Trunnion) */}
      <g id="gerotor-hydraulic-motor">
        {/* Heavy Cast Iron Gerotor Casing */}
        <ellipse cx={gerotorCenter[0]} cy={gerotorCenter[1]} rx="8.5" ry="5" fill="#1e293b" stroke="#0f172a" strokeWidth="1.2" />
        <ellipse cx={at([-160, 0, 31])[0]} cy={at([-160, 0, 31])[1]} rx="7" ry="4" fill="#475569" stroke="#64748b" strokeWidth="0.8" />
        {/* Gerotor Stator Core Lobes */}
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <ellipse
              key={`gerotor-lobe-${deg}`}
              cx={gerotorCenter[0] + 4.5 * Math.cos(rad)}
              cy={gerotorCenter[1] + 2.6 * Math.sin(rad)}
              rx="1.8"
              ry="1.1"
              fill="#94a3b8"
            />
          );
        })}
        {/* Drive Spindle Output Shaft */}
        <circle cx={at([-160, 0, 31])[0]} cy={at([-160, 0, 31])[1]} r="2.2" fill="#0f172a" stroke="#64748b" strokeWidth="0.6" />
      </g>

      {/* 3. Dual High-Pressure Braided Steel Hydraulic Lines with Anodized Banjo Fittings */}
      <g id="hydraulic-lines" strokeLinecap="round">
        {/* Line A (Pressure Feed - Blue Anodized Fitting) */}
        <path
          d={`M${pumpCenter[0]},${pumpCenter[1] - 2} ` +
             `Q${(pumpCenter[0] + gerotorCenter[0]) / 2 + 6},${(pumpCenter[1] + gerotorCenter[1]) / 2 - 8} ` +
             `${gerotorCenter[0] + 4},${gerotorCenter[1] - 2}`}
          fill="none"
          stroke="#0284c7"
          strokeWidth="2.2"
        />
        {/* Line B (Return Circuit - Red Anodized Fitting) */}
        <path
          d={`M${pumpCenter[0] - 2},${pumpCenter[1] + 2} ` +
             `Q${(pumpCenter[0] + gerotorCenter[0]) / 2 - 4},${(pumpCenter[1] + gerotorCenter[1]) / 2 + 6} ` +
             `${gerotorCenter[0] - 4},${gerotorCenter[1] + 2}`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.8"
        />
        {/* Anodized Banjo Fittings */}
        <circle cx={pumpCenter[0]} cy={pumpCenter[1] - 2} r="1.8" fill="#38bdf8" />
        <circle cx={gerotorCenter[0] + 4} cy={gerotorCenter[1] - 2} r="1.8" fill="#38bdf8" />
        <circle cx={pumpCenter[0] - 2} cy={pumpCenter[1] + 2} r="1.6" fill="#f87171" />
        <circle cx={gerotorCenter[0] - 4} cy={gerotorCenter[1] + 2} r="1.6" fill="#f87171" />
      </g>

      {/* 4. Dual Heavy Performance Coilover Suspension Struts (Supporting 3-Tonne Rear Assembly) */}
      <g id="rear-coilovers" strokeLinecap="round">
        {/* Port Coilover (Background) */}
        <g id="port-coilover">
          {/* Chrome Damper Shaft */}
          <line
            x1={coilPortTop[0]}
            y1={coilPortTop[1]}
            x2={coilPortBottom[0]}
            y2={coilPortBottom[1]}
            stroke={PALETTE.chrome}
            strokeWidth="3.2"
          />
          {/* Helical Wound Spring Coils */}
          {[0.2, 0.4, 0.6, 0.8].map((t, idx) => {
            const x = coilPortTop[0] + (coilPortBottom[0] - coilPortTop[0]) * t;
            const y = coilPortTop[1] + (coilPortBottom[1] - coilPortTop[1]) * t;
            return (
              <ellipse
                key={`port-spring-${idx}`}
                cx={x}
                cy={y}
                rx="4.5"
                ry="2.4"
                fill="none"
                stroke="#d97706"
                strokeWidth="2.2"
              />
            );
          })}
        </g>

        {/* Starboard Coilover (Foreground) */}
        <g id="starboard-coilover">
          {/* Chrome Damper Shaft */}
          <line
            x1={coilSBTop[0]}
            y1={coilSBTop[1]}
            x2={coilSBBottom[0]}
            y2={coilSBBottom[1]}
            stroke={PALETTE.chrome}
            strokeWidth="3.5"
          />
          {/* Helical Wound Spring Coils */}
          {[0.2, 0.4, 0.6, 0.8].map((t, idx) => {
            const x = coilSBTop[0] + (coilSBBottom[0] - coilSBTop[0]) * t;
            const y = coilSBTop[1] + (coilSBBottom[1] - coilSBTop[1]) * t;
            return (
              <ellipse
                key={`sb-spring-${idx}`}
                cx={x}
                cy={y}
                rx="5"
                ry="2.6"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.4"
              />
            );
          })}
        </g>
      </g>
    </g>
  );
}
