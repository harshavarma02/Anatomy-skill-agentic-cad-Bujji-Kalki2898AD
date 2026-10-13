import React from "react";
import { Solid } from "../../anatomy-kit/draw";
import { iso } from "../../anatomy-kit/iso-kit";
import { P, PALETTE } from "../view";
import {
  CELL_MODULES,
  BRAIN_SOLID,
  BRAIN_CORE_POINT,
  CABLE_PATHS,
} from "../geometry/batterySpine";

export function BatterySpineView() {
  return (
    <g className="bujji-battery-spine" id="battery-spine">
      {/* 1. Six Prismatic Solid-State Battery Cell Modules */}
      <g id="cell-stacks">
        {CELL_MODULES.map((mod, i) => {
          const ptA = iso(mod.terminalA, P);
          const ptB = iso(mod.terminalB, P);
          return (
            <g key={`cell-mod-${i}`}>
              <Solid paths={mod.paths} tone="mid" crease="faint" />
              {/* Terminal Posts with Safety Orange Caps */}
              <circle cx={ptA[0]} cy={ptA[1]} r="1.6" fill="#f97316" stroke="#9a3412" strokeWidth="0.4" />
              <circle cx={ptB[0]} cy={ptB[1]} r="1.6" fill="#0284c7" stroke="#0369a1" strokeWidth="0.4" />
              {/* Micro Status Indicator LED */}
              <circle cx={ptA[0]} cy={ptA[1] - 3} r="0.8" fill={PALETTE.cyanBright} />
            </g>
          );
        })}
      </g>

      {/* 2. Cryogenic Coolant Distribution Pipe */}
      <path
        d={CABLE_PATHS.coolant}
        fill="none"
        stroke="#2563eb"
        strokeWidth="2.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d={CABLE_PATHS.coolant}
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* 3. Central Control Brain (Bujji AI Core) */}
      <g id="control-brain">
        <Solid paths={BRAIN_SOLID} tone="hi" crease="faint" />
        {/* Pulsing Neural Core Reactor Eye */}
        <circle cx={BRAIN_CORE_POINT[0]} cy={BRAIN_CORE_POINT[1]} r="6" fill="#0e7490" opacity="0.35" />
        <circle cx={BRAIN_CORE_POINT[0]} cy={BRAIN_CORE_POINT[1]} r="4" fill="none" stroke={PALETTE.cyanBright} strokeWidth="1" />
        <circle cx={BRAIN_CORE_POINT[0]} cy={BRAIN_CORE_POINT[1]} r="2" fill={PALETTE.cyanCore} />
      </g>

      {/* 4. High-Voltage Conduits & Animated Cyan Electron Flow Path */}
      <g id="power-conduits">
        {/* Secondary Sensor Cable */}
        <path
          d={CABLE_PATHS.returnBus}
          fill="none"
          stroke="#475569"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Primary High-Voltage Cable Base (Safety Orange) */}
        <path
          d={CABLE_PATHS.power}
          fill="none"
          stroke="#ea580c"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Inner Insulation Core */}
        <path
          d={CABLE_PATHS.power}
          fill="none"
          stroke="#1e293b"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Animated Pulsing Cyan Electron Stream */}
        <path
          className="anim-electron-flow"
          d={CABLE_PATHS.power}
          fill="none"
          stroke={PALETTE.cyanBright}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Specular White Core Highlights */}
        <path
          className="anim-electron-flow"
          d={CABLE_PATHS.power}
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}
