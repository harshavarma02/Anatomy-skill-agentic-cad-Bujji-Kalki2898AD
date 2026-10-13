import React from "react";
import { PALETTE } from "../view";
import {
  WHEEL_SB_CENTER,
  TIRE_R,
  RIM_R,
  BORE_R,
  TIRE_HALF_W,
  buildTreadBarrel,
  getWheelSideTransform,
  CHEVRON_LUGS,
} from "../geometry/bujjiAnatomy";

export function StarboardWheelCrafted() {
  const barrel = buildTreadBarrel(WHEEL_SB_CENTER, TIRE_HALF_W, false);
  const sideTransform = getWheelSideTransform(WHEEL_SB_CENTER, false);

  return (
    <g className="bujji-starboard-wheel-crafted" id="starboard-hero-wheel">
      {/* 1. Starboard 34" Tire Cylindrical Tread Barrel (3D Volume) */}
      <path
        d={barrel.barrel}
        fill="#262a32"
        stroke="#111317"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Directional Top Highlight Band (Lit from overhead) */}
      <path
        d={barrel.topHighlight}
        fill="#3d4452"
        stroke="none"
        opacity="0.85"
      />

      {/* 2. Starboard Finished Wheel Face */}
      <g transform={sideTransform}>
        {/* Rubber Tire Outer Ring */}
        <circle r={TIRE_R} fill="#2f343e" stroke="#111317" strokeWidth="1.2" />

        {/* 18 Chevron Off-Road Lugs */}
        <g fill="#181a20" opacity="0.95">
          {CHEVRON_LUGS.map((d, i) => (
            <path key={`sb-finished-lug-${i}`} d={d} />
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
              key={`bolt-${deg}`}
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
        <g className="anim-spin" id="spinning-spoke-star">
          {[0, 120, 240].map((deg) => (
            <g key={`spoke-${deg}`} transform={`rotate(${deg})`}>
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
        <g id="finished-caliper" fill="#0f172a">
          <path d="M-11,-22 L11,-22 L13,-27 L-13,-27 Z" stroke="#334155" strokeWidth="0.6" />
          <line x1="-8" y1="-24.5" x2="8" y2="-24.5" stroke={PALETTE.yellowMid} strokeWidth="1.2" />
          <path d="M-11,22 L11,22 L13,27 L-13,27 Z" stroke="#334155" strokeWidth="0.6" />
          <circle cx="0" cy="24.5" r="1.2" fill={PALETTE.yellowMid} />
        </g>
      </g>
    </g>
  );
}
