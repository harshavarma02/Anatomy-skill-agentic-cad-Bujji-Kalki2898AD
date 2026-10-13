import React from "react";
import { at, PALETTE, P } from "../view";
import { slabOf, type Plan } from "../../anatomy-kit/iso-kit";
import {
  WHEEL_PORT_CENTER,
  TIRE_R,
  RIM_R,
  BORE_R,
  TIRE_HALF_W,
  buildTreadBarrel,
  getWheelSideTransform,
  CHEVRON_LUGS,
  STATOR_COILS,
  GEAR_RING_TEETH,
} from "../geometry/bujjiAnatomy";

interface PortRunningGearProps {
  mode?: "finished" | "unwrapped";
}

export function PortRunningGear({ mode = "finished" }: PortRunningGearProps) {
  const barrel = buildTreadBarrel(WHEEL_PORT_CENTER, TIRE_HALF_W, true);
  const sideTransform = getWheelSideTransform(WHEEL_PORT_CENTER, true);

  // Cantilever Torque Box Bridge (Bridges chassis rail Y = -34 to nacelle Y = -54)
  const bridgePlan: Plan = { x: 32, y: -54, w: 34, d: 20, r: 2 };
  const bridge = slabOf(bridgePlan, 14, 18, P, 2, 1);

  // Volumetric Outrigger Nacelle Box Beam (Y = -74 to -52, Z = 14 to 32)
  const nacellePlan: Plan = { x: 35, y: -74, w: 115, d: 22, r: 4 };
  const nacelle = slabOf(nacellePlan, 14, 18, P, 4, 1.2);

  // Hydraulic Steering Actuator Ram Positions (Mounted firmly on outrigger bridge)
  const ramStart = at([34, -48, 27]);
  const rodMid = at([78, -53, 30]);
  const ramEnd = at([125, -58, 32]);

  // Cantilever Wishbone Suspension 3D Points
  const rootA = at([35, -50, 28]);
  const tipA = at([115, -60, 30]);
  const tipB = at([115, -60, 20]);
  const rootB = at([35, -50, 18]);
  const hole1 = at([60, -53, 25]);
  const hole2 = at([90, -57, 26]);

  const rollerCount = 20;
  const bearingR = 25.5;

  return (
    <g className="bujji-port-running-gear" id="port-running-gear">
      {/* 1. Volumetric Structural Outrigger Bridge & Nacelle (Seamless 6-Tonne Cantilever Spar) */}
      <g id="port-outrigger-bridge">
        <path d={bridge.fill} fill="#181d28" stroke="#0f141d" strokeWidth="1.2" />
        {bridge.shades.map((d, s) => (
          <path key={`port-bridge-shade-${s}`} d={d} fill={s === 0 ? "#12161f" : s === 1 ? "#1a202c" : "#283245"} />
        ))}
        <path d={bridge.top} fill="#3b485d" stroke="#475569" strokeWidth="0.8" />
        {bridge.crease ? <path d={bridge.crease} fill="none" stroke="#64748b" strokeWidth="0.6" /> : null}
      </g>

      <g id="port-outrigger-nacelle">
        <path d={nacelle.fill} fill="#1a202c" stroke="#0f141d" strokeWidth="1.2" />
        {nacelle.shades.map((d, s) => (
          <path key={`port-nacelle-shade-${s}`} d={d} fill={s === 0 ? "#12161f" : s === 1 ? "#181d28" : "#242c3d"} />
        ))}
        <path d={nacelle.top} fill="#333f52" stroke="#475569" strokeWidth="0.8" />
        {nacelle.crease ? <path d={nacelle.crease} fill="none" stroke="#64748b" strokeWidth="0.6" /> : null}
      </g>

      {/* 2. Cantilever Wishbone Suspension Arm (Industrial Yellow) */}
      <g id="port-yellow-wishbone-arm">
        <path
          d={`M${rootA[0]},${rootA[1]} L${tipA[0]},${tipA[1]} L${tipB[0]},${tipB[1]} L${rootB[0]},${rootB[1]} Z`}
          fill={PALETTE.yellowMid}
          stroke="#ca8a04"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Lightening Weight-Reduction Holes */}
        <circle cx={hole1[0]} cy={hole1[1]} r="2.4" fill="#1e2430" stroke="#ca8a04" strokeWidth="0.5" />
        <circle cx={hole2[0]} cy={hole2[1]} r="2.4" fill="#1e2430" stroke="#ca8a04" strokeWidth="0.5" />
      </g>

      {/* 3. Chrome Hydraulic Steering Actuator Ram */}
      <g id="port-hydraulic-ram" strokeLinecap="round">
        {/* Cylinder Barrel */}
        <line
          x1={ramStart[0]}
          y1={ramStart[1]}
          x2={rodMid[0]}
          y2={rodMid[1]}
          stroke="#334155"
          strokeWidth="4.8"
        />
        {/* Polished Chrome Cylinder Sheen */}
        <line
          x1={ramStart[0]}
          y1={ramStart[1]}
          x2={rodMid[0]}
          y2={rodMid[1]}
          stroke="#94a3b8"
          strokeWidth="2.4"
        />
        {/* Hard Chrome Piston Rod */}
        <line
          x1={rodMid[0]}
          y1={rodMid[1]}
          x2={ramEnd[0]}
          y2={ramEnd[1]}
          stroke={PALETTE.chrome}
          strokeWidth="2.4"
        />
        {/* Wiper Seal Collar & End Clevis Joint */}
        <circle cx={rodMid[0]} cy={rodMid[1]} r="2.8" fill="#0f172a" stroke="#64748b" strokeWidth="0.6" />
        <circle cx={ramEnd[0]} cy={ramEnd[1]} r="2.6" fill="#94a3b8" stroke="#334155" strokeWidth="0.6" />
      </g>

      {/* 4. High-Pressure Hydraulic Fluid Hose */}
      <path
        d={`M${ramStart[0] - 4},${ramStart[1] - 4} ` +
           `Q${ramStart[0] + 12},${ramStart[1] - 12} ${rodMid[0] - 4},${rodMid[1] - 6}`}
        fill="none"
        stroke="#0f172a"
        strokeWidth="1.8"
      />

      {/* 5. Port 34.5" Tire Cylindrical Tread Barrel (3D Volume) */}
      <path
        d={barrel.barrel}
        fill="#1e2229"
        stroke="#0f172a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Top Directional Highlight on Tread */}
      <path
        d={barrel.topHighlight}
        fill="#333a47"
        stroke="none"
        opacity="0.85"
      />

      {/* 6. Port Wheel Face (Finished vs Unwrapped) */}
      {mode === "finished" ? (
        /* --- Finished 34.5" Hubless Hero Wheel Face --- */
        <g transform={sideTransform} id="port-finished-wheel-face">
          {/* Rubber Tire Outer Wall */}
          <circle r={TIRE_R} fill="#2f343e" stroke="#111317" strokeWidth="1.2" />

          {/* 18 Chevron Off-Road Lugs */}
          <g fill="#181a20" opacity="0.95">
            {CHEVRON_LUGS.map((d, i) => (
              <path key={`port-finished-lug-${i}`} d={d} />
            ))}
          </g>

          {/* Machined Titanium Outer Rim */}
          <circle r={RIM_R} fill="#94a3b8" stroke="#475569" strokeWidth="1.2" />
          <circle r="21" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />

          {/* 12 Perimeter Fastener Bolts */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={`port-bolt-${deg}`}
                cx={20.5 * Math.cos(rad)}
                cy={20.5 * Math.sin(rad)}
                r="0.9"
                fill={PALETTE.chrome}
                stroke="#334155"
                strokeWidth="0.3"
              />
            );
          })}

          {/* Inner Ring Recess */}
          <circle r={BORE_R} fill="#1e293b" stroke="#0f172a" strokeWidth="1" />

          {/* Signature Kalki 3-Spoke Star Carrier Bracket (Rotating with Rim) */}
          <g className="anim-spin" id="port-spinning-spoke-star">
            {[0, 120, 240].map((deg) => (
              <g key={`port-spoke-${deg}`} transform={`rotate(${deg})`}>
                <path
                  d="M-3.5,8 L-2.8,19 L2.8,19 L3.5,8 Z"
                  fill="#cbd5e1"
                  stroke="#64748b"
                  strokeWidth="0.6"
                />
                <circle cx="0" cy="14" r="1.6" fill="#1e293b" stroke="#475569" strokeWidth="0.4" />
                <line x1="0" y1="9" x2="0" y2="18" stroke={PALETTE.chrome} strokeWidth="0.4" />
              </g>
            ))}
          </g>

          {/* True Hubless Hollow Bore */}
          <circle r="9" fill={PALETTE.bg} stroke="#475569" strokeWidth="0.8" />

          {/* Finished Outer Caliper Cover with Hazard Yellow Accent */}
          <g id="port-finished-caliper" fill="#0f172a">
            <path d="M-11,-22 L11,-22 L13,-27 L-13,-27 Z" stroke="#334155" strokeWidth="0.6" />
            <line x1="-8" y1="-24.5" x2="8" y2="-24.5" stroke={PALETTE.yellowMid} strokeWidth="1.2" />
            <path d="M-11,22 L11,22 L13,27 L-13,27 Z" stroke="#334155" strokeWidth="0.6" />
            <circle cx="0" cy="24.5" r="1.2" fill={PALETTE.yellowMid} />
          </g>
        </g>
      ) : (
        /* --- Unwrapped 34.5" Hubless Mechanics Face --- */
        <g transform={sideTransform} id="port-unwrapped-wheel-face">
          {/* Carbon-Ceramic Brake Rotor Track */}
          <circle r={TIRE_R} fill="#141722" stroke="#090c12" strokeWidth="1.4" />
          <circle r="29" fill="#1e2533" stroke="#334155" strokeWidth="1" />

          {/* Ventilated Brake Rotor Drilled Holes */}
          {[...Array(16)].map((_, i) => {
            const rad = (i / 16) * Math.PI * 2;
            return (
              <circle
                key={`port-rotor-hole-${i}`}
                cx={28.5 * Math.cos(rad)}
                cy={28.5 * Math.sin(rad)}
                r="0.8"
                fill="#090d16"
              />
            );
          })}

          {/* Perimeter Taper Roller Bearing Race (Carries 1-Tonne Wheel Load) */}
          <circle r={bearingR} fill="none" stroke="#64748b" strokeWidth="2.8" />
          <circle r={bearingR} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="1.5 2.5" />

          {/* Visible Taper Roller Pins */}
          {[...Array(rollerCount)].map((_, i) => {
            const rad = (i / rollerCount) * Math.PI * 2;
            const x = bearingR * Math.cos(rad);
            const y = bearingR * Math.sin(rad);
            return (
              <circle
                key={`port-taper-roller-${i}`}
                cx={x}
                cy={y}
                r="1"
                fill="#f8fafc"
                stroke="#475569"
                strokeWidth="0.4"
              />
            );
          })}

          {/* Inner Hub Stator Casing */}
          <circle r="22.5" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" />

          {/* Radial Copper Stator Induction Coils */}
          <g id="port-stator-induction-coils" fill="#d97706" stroke="#b45309" strokeWidth="0.5">
            {STATOR_COILS.map(({ d }, i) => (
              <path key={`port-hub-coil-${i}`} d={d} />
            ))}
          </g>

          {/* Spinning Planetary Reduction Gear System */}
          <g className="anim-spin" id="port-planetary-gears">
            <path d={GEAR_RING_TEETH} fill="#f5bf00" stroke="#b45309" strokeWidth="0.4" />
            <circle r="13" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
            {[0, 120, 240].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <circle
                  key={`port-hub-pinion-${deg}`}
                  cx={9 * Math.cos(rad)}
                  cy={9 * Math.sin(rad)}
                  r="2.5"
                  fill="#94a3b8"
                  stroke="#475569"
                  strokeWidth="0.5"
                />
              );
            })}
          </g>

          {/* Hollow Hub Center (The Signature Hubless Void) */}
          <circle r="6" fill={PALETTE.bg} stroke="#475569" strokeWidth="1" />

          {/* Dual Opposed Performance Brake Calipers (Upper & Lower) */}
          <g id="port-caliper-a" transform="rotate(-45)">
            <rect
              x="24"
              y="-6.5"
              width="8.5"
              height="13"
              rx="2"
              fill="#d97706"
              stroke="#78350f"
              strokeWidth="0.8"
            />
            <circle cx="28" cy="-3" r="1.8" fill="#f8fafc" stroke="#451a03" strokeWidth="0.5" />
            <circle cx="28" cy="3" r="1.8" fill="#f8fafc" stroke="#451a03" strokeWidth="0.5" />
            <rect x="31" y="-1" width="2" height="2" fill="#94a3b8" />
          </g>

          <g id="port-caliper-b" transform="rotate(135)">
            <rect
              x="24"
              y="-6.5"
              width="8.5"
              height="13"
              rx="2"
              fill="#d97706"
              stroke="#78350f"
              strokeWidth="0.8"
            />
            <circle cx="28" cy="-3" r="1.8" fill="#f8fafc" stroke="#451a03" strokeWidth="0.5" />
            <circle cx="28" cy="3" r="1.8" fill="#f8fafc" stroke="#451a03" strokeWidth="0.5" />
            <rect x="31" y="-1" width="2" height="2" fill="#94a3b8" />
          </g>
        </g>
      )}
    </g>
  );
}
