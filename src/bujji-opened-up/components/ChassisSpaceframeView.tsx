import React from "react";
import { at, P } from "../view";
import { slabOf, type Plan } from "../../anatomy-kit/iso-kit";

export function ChassisSpaceframeView() {
  // 1. Dual Heavy Longitudinal Box Girders (Engineered for 6-Tonne Bending & Torsional Loads)
  // Port Rail (Background, Depth ~ 40)
  const portRailPlan: Plan = { x: -160, y: -34, w: 225, d: 8, r: 2 };
  const portRail = slabOf(portRailPlan, 12, 8, P, 1.5, 0.8);

  // Starboard Rail (Foreground, Depth ~ 96)
  const sbRailPlan: Plan = { x: -160, y: 26, w: 225, d: 8, r: 2 };
  const sbRail = slabOf(sbRailPlan, 12, 8, P, 1.5, 0.8);

  // 2. Cantilever Torque Outrigger Bridge Spars (Connecting Chassis Backbone to Wheel Nacelles)
  // Port Outrigger Bridge Spar (Bridges Y = -34 chassis to Y = -52 port nacelle)
  const portOutriggerPlan: Plan = { x: 30, y: -52, w: 35, d: 18, r: 2 };
  const portOutrigger = slabOf(portOutriggerPlan, 13, 8, P, 1.5, 0.8);

  // Starboard Outrigger Bridge Spar (Bridges Y = 34 chassis to Y = 52 starboard nacelle)
  const sbOutriggerPlan: Plan = { x: 30, y: 34, w: 35, d: 18, r: 2 };
  const sbOutrigger = slabOf(sbOutriggerPlan, 13, 8, P, 1.5, 0.8);

  // 3. Four Heavy Structural Crossmembers (Torsional Resistance & Component Mounting)
  // Crossmember 1: Tail / Rear Steering Pivot Mount
  const cm1Plan: Plan = { x: -156, y: -26, w: 10, d: 52, r: 1.5 };
  const cm1 = slabOf(cm1Plan, 13, 7, P, 1, 0.8);

  // Crossmember 2: Mid Battery & Motor Firewall Mount
  const cm2Plan: Plan = { x: -80, y: -26, w: 8, d: 52, r: 1.5 };
  const cm2 = slabOf(cm2Plan, 13, 6, P, 1, 0.8);

  // Crossmember 3: Cockpit Seat Base & Subframe Mount
  const cm3Plan: Plan = { x: -10, y: -26, w: 8, d: 52, r: 1.5 };
  const cm3 = slabOf(cm3Plan, 13, 6, P, 1, 0.8);

  // Crossmember 4: Front Outrigger Cantilever Torque Box
  const cm4Plan: Plan = { x: 45, y: -26, w: 12, d: 52, r: 2 };
  const cm4 = slabOf(cm4Plan, 13, 7, P, 1, 0.8);

  // Lightening holes along starboard rail top plate
  const sbPortHoles = [-130, -95, -60, -25, 10, 45];

  return (
    <g className="bujji-chassis-spaceframe" id="chassis-spaceframe">
      {/* --- Belly Pan Titanium Skid Floor with Stamped Corrugations --- */}
      <g id="corrugated-belly-pan">
        {/* Floor Plate Base */}
        <polygon
          points={`
            ${at([-160, -36, 12])[0]},${at([-160, -36, 12])[1]}
            ${at([65, -36, 12])[0]},${at([65, -36, 12])[1]}
            ${at([65, 36, 12])[0]},${at([65, 36, 12])[1]}
            ${at([-160, 36, 12])[0]},${at([-160, 36, 12])[1]}
          `}
          fill="#0c0f17"
          stroke="#1e2533"
          strokeWidth="1.2"
        />

        {/* Longitudinal Stamped Stiffener Ribs */}
        {[-24, -12, 0, 12, 24].map((y) => (
          <line
            key={`stiffener-rib-${y}`}
            x1={at([-150, y, 12.2])[0]}
            y1={at([-150, y, 12.2])[1]}
            x2={at([55, y, 12.2])[0]}
            y2={at([55, y, 12.2])[1]}
            stroke="#1c2436"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* --- Port Front Outrigger Bridge Spar (Solid Cantilever Arm to Left Wheel) --- */}
      <g id="port-outrigger-bridge-spar">
        <path d={portOutrigger.fill} fill="#141924" stroke="#0b0e14" strokeWidth="1" />
        {portOutrigger.shades.map((d, s) => (
          <path key={`port-outrigger-shade-${s}`} d={d} fill={s === 0 ? "#0f131a" : s === 1 ? "#181d28" : "#242c3d"} />
        ))}
        <path d={portOutrigger.top} fill="#333f52" stroke="#475569" strokeWidth="0.8" />
        {portOutrigger.crease && <path d={portOutrigger.crease} fill="none" stroke="#64748b" strokeWidth="0.6" />}

        {/* Reinforcement Weight-Reduction Port Hole on Outrigger Bridge Top Plate */}
        <ellipse
          cx={at([48, -43, 21.2])[0]}
          cy={at([48, -43, 21.2])[1]}
          rx="2.6"
          ry="1.5"
          fill="#0f141d"
          stroke="#475569"
          strokeWidth="0.5"
        />

        {/* Diagonal Triangular Stiffener Gusset Web */}
        <polygon
          points={`
            ${at([12, -34, 18.5])[0]},${at([12, -34, 18.5])[1]}
            ${at([35, -52, 18.5])[0]},${at([35, -52, 18.5])[1]}
            ${at([35, -34, 18.5])[0]},${at([35, -34, 18.5])[1]}
          `}
          fill="#1c2434"
          stroke="#0f141d"
          strokeWidth="0.8"
        />

        {/* High-Strength Flange Mounting Bolts Connecting Spar to Chassis */}
        {[36, 48, 60].map((bx) => (
          <circle
            key={`port-spar-bolt-${bx}`}
            cx={at([bx, -34, 21.4])[0]}
            cy={at([bx, -34, 21.4])[1]}
            r="1"
            fill="#94a3b8"
            stroke="#1e293b"
            strokeWidth="0.3"
          />
        ))}
      </g>

      {/* --- Port Longitudinal Box Girder (Background) --- */}
      <g id="port-chassis-girder">
        <path d={portRail.fill} fill="#141924" stroke="#0b0e14" strokeWidth="1" />
        {portRail.shades.map((d, s) => (
          <path key={`port-rail-shade-${s}`} d={d} fill={s === 0 ? "#0f131a" : s === 1 ? "#181d28" : "#242c3d"} />
        ))}
        <path d={portRail.top} fill="#333f52" stroke="#475569" strokeWidth="0.8" />
        {portRail.crease && <path d={portRail.crease} fill="none" stroke="#64748b" strokeWidth="0.6" />}
      </g>

      {/* --- Four Heavy Structural Crossmembers --- */}
      {[cm1, cm2, cm3, cm4].map((cm, idx) => (
        <g key={`crossmember-${idx}`} id={`crossmember-${idx + 1}`}>
          <path d={cm.fill} fill="#181d28" stroke="#0f131a" strokeWidth="1" />
          {cm.shades.map((d, s) => (
            <path key={`cm-${idx}-shade-${s}`} d={d} fill={s === 0 ? "#12161f" : s === 1 ? "#1e2533" : "#2c3649"} />
          ))}
          <path d={cm.top} fill="#3b485d" stroke="#475569" strokeWidth="0.8" />
          {cm.crease && <path d={cm.crease} fill="none" stroke="#64748b" strokeWidth="0.6" />}
        </g>
      ))}

      {/* --- Starboard Longitudinal Box Girder (Foreground Hero Rail) --- */}
      <g id="starboard-chassis-girder">
        <path d={sbRail.fill} fill="#1c2230" stroke="#0f131a" strokeWidth="1" />
        {sbRail.shades.map((d, s) => (
          <path key={`sb-rail-shade-${s}`} d={d} fill={s === 0 ? "#141924" : s === 1 ? "#1e2533" : "#283245"} />
        ))}
        <path d={sbRail.top} fill="#475569" stroke="#64748b" strokeWidth="0.8" />
        {sbRail.crease && <path d={sbRail.crease} fill="none" stroke="#94a3b8" strokeWidth="0.6" />}

        {/* Machined Weight-Reduction & Inspection Port Holes */}
        {sbPortHoles.map((x) => (
          <ellipse
            key={`sb-rail-hole-${x}`}
            cx={at([x, 30, 20.2])[0]}
            cy={at([x, 30, 20.2])[1]}
            rx="2.8"
            ry="1.6"
            fill="#141924"
            stroke="#64748b"
            strokeWidth="0.6"
          />
        ))}
      </g>

      {/* --- Starboard Front Outrigger Bridge Spar (Solid Cantilever Arm to Right Wheel) --- */}
      <g id="starboard-outrigger-bridge-spar">
        <path d={sbOutrigger.fill} fill="#1c2230" stroke="#0f131a" strokeWidth="1" />
        {sbOutrigger.shades.map((d, s) => (
          <path key={`sb-outrigger-shade-${s}`} d={d} fill={s === 0 ? "#141924" : s === 1 ? "#1e2533" : "#283245"} />
        ))}
        <path d={sbOutrigger.top} fill="#475569" stroke="#64748b" strokeWidth="0.8" />
        {sbOutrigger.crease && <path d={sbOutrigger.crease} fill="none" stroke="#94a3b8" strokeWidth="0.6" />}

        {/* Reinforcement Weight-Reduction Port Hole on Outrigger Bridge Top Plate */}
        <ellipse
          cx={at([48, 43, 21.2])[0]}
          cy={at([48, 43, 21.2])[1]}
          rx="2.6"
          ry="1.5"
          fill="#141924"
          stroke="#64748b"
          strokeWidth="0.5"
        />

        {/* Diagonal Triangular Stiffener Gusset Web */}
        <polygon
          points={`
            ${at([12, 34, 18.5])[0]},${at([12, 34, 18.5])[1]}
            ${at([35, 52, 18.5])[0]},${at([35, 52, 18.5])[1]}
            ${at([35, 34, 18.5])[0]},${at([35, 34, 18.5])[1]}
          `}
          fill="#242c3d"
          stroke="#141924"
          strokeWidth="0.8"
        />

        {/* High-Strength Flange Mounting Bolts */}
        {[36, 48, 60].map((bx) => (
          <circle
            key={`sb-spar-bolt-${bx}`}
            cx={at([bx, 34, 21.4])[0]}
            cy={at([bx, 34, 21.4])[1]}
            r="1"
            fill="#cbd5e1"
            stroke="#1e293b"
            strokeWidth="0.3"
          />
        ))}
      </g>

      {/* --- Torsional Triangular Corner Gusset Brackets --- */}
      <g id="torsional-gussets" fill="#2d3748" stroke="#1a202c" strokeWidth="0.8">
        {/* Front Right Gusset */}
        <polygon
          points={`
            ${at([45, 26, 19.5])[0]},${at([45, 26, 19.5])[1]}
            ${at([35, 26, 19.5])[0]},${at([35, 26, 19.5])[1]}
            ${at([45, 18, 19.5])[0]},${at([45, 18, 19.5])[1]}
          `}
        />
        {/* Front Left Gusset */}
        <polygon
          points={`
            ${at([45, -26, 19.5])[0]},${at([45, -26, 19.5])[1]}
            ${at([35, -26, 19.5])[0]},${at([35, -26, 19.5])[1]}
            ${at([45, -18, 19.5])[0]},${at([45, -18, 19.5])[1]}
          `}
        />
        {/* Rear Steering Trunnion Mounting Tabs */}
        <polygon
          points={`
            ${at([-156, 14, 19.5])[0]},${at([-156, 14, 19.5])[1]}
            ${at([-146, 0, 19.5])[0]},${at([-146, 0, 19.5])[1]}
            ${at([-156, -14, 19.5])[0]},${at([-156, -14, 19.5])[1]}
          `}
          fill="#334155"
          stroke="#1e293b"
        />
      </g>

      {/* --- Rear Steering Heavy Kingpin Pivot Trunnion (Handles 3-Tonne Rear Axle) --- */}
      <g id="rear-steering-trunnion">
        <ellipse
          cx={at([-156, 0, 20])[0]}
          cy={at([-156, 0, 20])[1]}
          rx="6"
          ry="3.5"
          fill="#475569"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <ellipse
          cx={at([-156, 0, 24])[0]}
          cy={at([-156, 0, 24])[1]}
          rx="4.5"
          ry="2.6"
          fill="#64748b"
          stroke="#334155"
          strokeWidth="0.8"
        />
        <circle
          cx={at([-156, 0, 24])[0]}
          cy={at([-156, 0, 24])[1]}
          r="1.8"
          fill="#94a3b8"
          stroke="#0f172a"
          strokeWidth="0.5"
        />
      </g>
    </g>
  );
}
