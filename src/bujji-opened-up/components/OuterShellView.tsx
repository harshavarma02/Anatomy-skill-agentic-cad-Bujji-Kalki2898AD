import React from "react";
import {
  HOOD_PATH,
  SB_FLANK_PATH,
  PORT_FLANK_PATH,
  FRONT_CHIN_PATH,
  VISOR_PATH,
  SIDE_POD_PATH,
  PANEL_SHUTLINES,
  REAR_SPHERE_CENTER,
} from "../geometry/outerShell";
import { PALETTE } from "../view";

export function OuterShellView() {
  return (
    <g className="bujji-outer-shell" id="outer-shell">
      {/* 1. Rear Omni-Wheel Sphere (Under tail) */}
      <g id="rear-omni-sphere">
        <circle cx={REAR_SPHERE_CENTER[0]} cy={REAR_SPHERE_CENTER[1]} r="24" fill="#181a1f" stroke="#334155" strokeWidth="1" />
        <circle cx={REAR_SPHERE_CENTER[0]} cy={REAR_SPHERE_CENTER[1]} r="16" fill="#2d3139" stroke="#475569" strokeWidth="0.8" />
      </g>

      {/* 2. Port Flank (Far side bodywork in perspective shadow) */}
      <path
        d={PORT_FLANK_PATH}
        fill="#9a3412"
        stroke="#7c2d12"
        strokeWidth="1"
        opacity="0.85"
      />

      {/* 3. Hood Top Deck (Facing upward to overhead light) */}
      <path
        d={HOOD_PATH}
        fill={PALETTE.orangeHi}
        stroke="#c74e0d"
        strokeWidth="1"
      />

      {/* 4. Front Chin Vertical Grille Fascia (Between the wheels) */}
      <path
        d={FRONT_CHIN_PATH}
        fill="#181b20"
        stroke="#0f172a"
        strokeWidth="1.2"
      />
      {/* Front Radiator Cooling Louvers */}
      <g stroke="#334155" strokeWidth="1.2">
        <line x1="620" y1="316" x2="648" y2="330" />
        <line x1="624" y1="322" x2="652" y2="336" />
      </g>
      {/* Dual High-Intensity LED Headlights */}
      <circle cx="606" cy="318" r="2.8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" />
      <circle cx="658" cy="292" r="2.8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" />

      {/* 5. Starboard Flank (Facing camera in foreground) */}
      <path
        d={SB_FLANK_PATH}
        fill={PALETTE.orangeMid}
        stroke={PALETTE.orangeDark}
        strokeWidth="1.2"
      />

      {/* 6. Aerodynamic Body Panel Shutlines */}
      {PANEL_SHUTLINES.map((d, i) => (
        <path
          key={`shutline-${i}`}
          d={d}
          fill="none"
          stroke="#7a2c00"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ))}

      {/* 7. Tinted Dark Smoke Canopy Visor */}
      <g id="canopy-visor">
        <path
          d={VISOR_PATH}
          fill="#0a0f1d"
          stroke="#1e293b"
          strokeWidth="1.2"
        />
        {/* Specular Curved Light Reflection Sweep */}
        <path
          d="M480,210 C510,225 535,248 555,272"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M480,210 C510,225 535,248 555,272"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.85"
        />
      </g>

      {/* 8. Yellow Aerodynamic Side Pod Sponson */}
      <g id="side-pod">
        <path
          d={SIDE_POD_PATH}
          fill={PALETTE.yellowMid}
          stroke="#a16207"
          strokeWidth="1.2"
        />
        {/* Cooling Intake Scoop */}
        <path
          d="M380,240 L425,262 L418,272 L373,250 Z"
          fill="#181a1f"
          stroke="#854d0e"
          strokeWidth="0.8"
        />
        {/* Livery Hazard Chevrons */}
        <g fill="#181a1b">
          <path d="M440,274 L446,270 L442,284 L436,288 Z" />
          <path d="M450,280 L456,276 L452,290 L446,294 Z" />
          <path d="M460,286 L466,282 L462,296 L456,300 Z" />
        </g>
        {/* Micro Movie Insignia */}
        <text
          x="395"
          y="282"
          fill="#854d0e"
          fontSize="4"
          fontWeight="700"
          fontFamily="var(--font-mono)"
          letterSpacing="0.4"
        >
          KALKI 2898 AD
        </text>
      </g>
    </g>
  );
}
