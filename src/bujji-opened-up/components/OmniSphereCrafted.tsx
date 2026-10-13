import React from "react";
import { at } from "../view";
import {
  REAR_SPHERE_CENTER,
  REAR_CRADLE_PATH,
} from "../geometry/bujjiAnatomy";

export function OmniSphereCrafted() {
  const center = at(REAR_SPHERE_CENTER);
  const cx = center[0];
  const cy = center[1];
  const r = 26; // Projected sphere radius

  return (
    <g className="bujji-omni-sphere" id="rear-omni-drive">
      {/* 1. Ground Contact Shadow */}
      <ellipse
        cx={cx}
        cy={cy + r + 2}
        rx={r * 1.1}
        ry={r * 0.35}
        fill="#05070a"
        opacity="0.6"
      />

      {/* 2. Cast Suspension Swingarm Cradle Fork */}
      <path
        d={REAR_CRADLE_PATH}
        fill="none"
        stroke="#1e293b"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={REAR_CRADLE_PATH}
        fill="none"
        stroke="#475569"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={cx - 14} cy={cy - 6} r="3" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />

      {/* 3. Base Spherical Omni-Wheel Body (Deep Carbon Rubber) */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#14171d"
        stroke="#0f172a"
        strokeWidth="1.2"
      />

      {/* 4. Equatorial Omni-Drive Cross-Roller Bands (Latitude rings) */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={r - 1}
        ry={r * 0.42}
        fill="none"
        stroke="#272d38"
        strokeWidth="3.5"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx={r - 3}
        ry={(r - 3) * 0.42}
        fill="none"
        stroke="#0f172a"
        strokeWidth="1"
      />
      <ellipse
        cx={cx}
        cy={cy + 7}
        rx={r - 5}
        ry={(r - 5) * 0.42}
        fill="none"
        stroke="#1e2430"
        strokeWidth="2.2"
      />
      <ellipse
        cx={cx}
        cy={cy - 7}
        rx={r - 5}
        ry={(r - 5) * 0.42}
        fill="none"
        stroke="#333b49"
        strokeWidth="2.2"
      />

      {/* 5. Directional Specular Light Highlight (Lit from top-left) */}
      <ellipse
        cx={cx - r * 0.32}
        cy={cy - r * 0.32}
        rx={r * 0.48}
        ry={r * 0.35}
        fill="#475569"
        opacity="0.35"
      />
      <ellipse
        cx={cx - r * 0.38}
        cy={cy - r * 0.38}
        rx={r * 0.22}
        ry={r * 0.16}
        fill="#f8fafc"
        opacity="0.6"
      />

      {/* 6. Swingarm Monoshock Damper Coil */}
      <g id="rear-damper" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round">
        <line x1={cx + 12} y1={cy - 12} x2={cx + 28} y2={cy - 24} stroke="#f8fafc" strokeWidth="2.5" />
        <path
          d={`M${cx + 14},${cy - 14} Q${cx + 16},${cy - 18} ${cx + 20},${cy - 16} ` +
             `Q${cx + 22},${cy - 20} ${cx + 26},${cy - 18}`}
          fill="none"
          stroke="#f5bf00"
          strokeWidth="2"
        />
      </g>
    </g>
  );
}
