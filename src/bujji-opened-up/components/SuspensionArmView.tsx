import React from "react";
import {
  ARM_OUTER_PATH,
  ARM_TOP_PATH,
  PORT_ARM_PATH,
  ARM_CUTOUTS,
  PIVOT_BOLTS,
  PIVOT_TRANSFORM,
  PIVOT_RADIUS,
  RAM_GEOMETRY,
} from "../geometry/suspension";
import { PALETTE } from "../view";

export function SuspensionArmView() {
  return (
    <g className="bujji-suspension-arm" id="suspension-arm">
      {/* 1. Port Side Suspension Arm (Connecting across vehicle to port wheel) */}
      <path
        d={PORT_ARM_PATH}
        fill="#b48300"
        stroke="#785500"
        strokeWidth="1"
        opacity="0.85"
      />

      {/* 2. Starboard Chrome Hydraulic Ram Actuator (Underneath arm) */}
      <g id="hydraulic-ram">
        <circle cx={RAM_GEOMETRY.mountRear[0]} cy={RAM_GEOMETRY.mountRear[1]} r="4" fill="#1e293b" />
        <circle cx={RAM_GEOMETRY.mountRear[0]} cy={RAM_GEOMETRY.mountRear[1]} r="1.8" fill={PALETTE.chrome} />

        {/* Cylinder Barrel */}
        <line
          x1={RAM_GEOMETRY.barrelStart[0]}
          y1={RAM_GEOMETRY.barrelStart[1]}
          x2={RAM_GEOMETRY.barrelEnd[0]}
          y2={RAM_GEOMETRY.barrelEnd[1]}
          stroke="#334155"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Specular Barrel Highlight */}
        <line
          x1={RAM_GEOMETRY.barrelStart[0]}
          y1={RAM_GEOMETRY.barrelStart[1] - 1.5}
          x2={RAM_GEOMETRY.barrelEnd[0]}
          y2={RAM_GEOMETRY.barrelEnd[1] - 1.5}
          stroke="#64748b"
          strokeWidth="1.5"
        />
        {/* Chrome Lock Ring */}
        <line
          x1={RAM_GEOMETRY.barrelEnd[0] - 2}
          y1={RAM_GEOMETRY.barrelEnd[1]}
          x2={RAM_GEOMETRY.barrelEnd[0] + 2}
          y2={RAM_GEOMETRY.barrelEnd[1]}
          stroke={PALETTE.chrome}
          strokeWidth="9"
        />

        {/* Polished Chrome Piston Rod */}
        <line
          x1={RAM_GEOMETRY.barrelEnd[0]}
          y1={RAM_GEOMETRY.barrelEnd[1]}
          x2={RAM_GEOMETRY.pistonEnd[0]}
          y2={RAM_GEOMETRY.pistonEnd[1]}
          stroke={PALETTE.chrome}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1={RAM_GEOMETRY.barrelEnd[0]}
          y1={RAM_GEOMETRY.barrelEnd[1] - 0.8}
          x2={RAM_GEOMETRY.pistonEnd[0]}
          y2={RAM_GEOMETRY.pistonEnd[1] - 0.8}
          stroke="#ffffff"
          strokeWidth="1.2"
        />

        <circle cx={RAM_GEOMETRY.mountFront[0]} cy={RAM_GEOMETRY.mountFront[1]} r="3" fill="#1e293b" />
        <circle cx={RAM_GEOMETRY.mountFront[0]} cy={RAM_GEOMETRY.mountFront[1]} r="1.4" fill={PALETTE.chrome} />
      </g>

      {/* 3. Starboard Cantilever Arm 3D Top Bevel (Facing upward to light) */}
      <path d={ARM_TOP_PATH} fill={PALETTE.yellowHi} stroke="#ca8a04" strokeWidth="0.8" />

      {/* 4. Starboard Cantilever Arm Outer Flank (Industrial Yellow) */}
      <path d={ARM_OUTER_PATH} fill={PALETTE.yellowMid} stroke="#a16207" strokeWidth="1" />

      {/* 5. Lightening Cutouts */}
      {ARM_CUTOUTS.map((d, i) => (
        <path key={`cutout-${i}`} d={d} fill="#181a1f" stroke="#854d0e" strokeWidth="0.8" />
      ))}

      {/* 6. Hazard Warning Stripes */}
      <g id="hazard-stripes" fill="#181a1b">
        <path d="M480,314 L485,310 L482,324 L477,328 Z" />
        <path d="M488,320 L493,316 L490,330 L485,334 Z" />
        <path d="M496,326 L501,322 L498,336 L493,340 Z" />
      </g>

      {/* 7. Chassis Pivot Hinge & 8-Bolt Fastener Circle */}
      <g transform={PIVOT_TRANSFORM}>
        <circle r={PIVOT_RADIUS} fill="#1e293b" stroke="#0f172a" strokeWidth="1.2" />
        <circle r="12" fill="#334155" stroke="#475569" strokeWidth="0.8" />
        <circle r="5" fill={PALETTE.yellowMid} stroke="#a16207" strokeWidth="0.8" />
        <circle r="2" fill="#0f172a" />
      </g>
      {PIVOT_BOLTS.map(([bx, by], i) => (
        <circle key={`pivot-bolt-${i}`} cx={bx} cy={by} r="1.2" fill={PALETTE.chrome} stroke="#334155" strokeWidth="0.4" />
      ))}
    </g>
  );
}
