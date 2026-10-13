import React from "react";
import { at, PALETTE, P } from "../view";
import { slabOf, type Plan } from "../../anatomy-kit/iso-kit";
import { getBatteryCellPlans } from "../geometry/bujjiAnatomy";

export function BatteryPackDetailedView() {
  const cellPlans = getBatteryCellPlans();

  // Master Battery Management System (BMS) Controller
  const bmsPlan: Plan = { x: -26, y: -14, w: 14, d: 28, r: 2 };
  const bms = slabOf(bmsPlan, 14, 8, P, 1.2, 0.8);

  return (
    <g className="bujji-battery-pack-detailed" id="battery-pack-detailed">
      {/* 1. Six Modular 47 kWh Heavy-Duty Battery Packs */}
      <g id="finned-battery-modules">
        {cellPlans.map((plan, i) => {
          const slab = slabOf(plan, 13, 11, P, 2, 0.8);
          return (
            <g key={`battery-module-${i}`}>
              {/* Dark Graphite Cell Enclosure */}
              <path d={slab.fill} fill="#1a202c" stroke="#0f141d" strokeWidth="1" />
              {/* Directional Shading on Vertical Flanks */}
              {slab.shades.map((d, s) => (
                <path
                  key={`cell-shade-${s}`}
                  d={d}
                  fill={s === 0 ? "#121620" : s === 1 ? "#181d28" : "#263042"}
                />
              ))}
              {/* Anodized Aluminum Top Heatsink Plate */}
              <path d={slab.top} fill="#475569" stroke="#64748b" strokeWidth="0.8" />
              {slab.crease && <path d={slab.crease} fill="none" stroke="#94a3b8" strokeWidth="0.6" />}

              {/* Laser-Etched Module Cell Separation Grooves */}
              <g stroke="#334155" strokeWidth="0.8" strokeLinecap="round">
                <line
                  x1={at([plan.x + 10, plan.y + 4, 24.2])[0]}
                  y1={at([plan.x + 10, plan.y + 4, 24.2])[1]}
                  x2={at([plan.x + 10, plan.y + 16, 24.2])[0]}
                  y2={at([plan.x + 10, plan.y + 16, 24.2])[1]}
                />
                <line
                  x1={at([plan.x + 21, plan.y + 4, 24.2])[0]}
                  y1={at([plan.x + 21, plan.y + 4, 24.2])[1]}
                  x2={at([plan.x + 21, plan.y + 16, 24.2])[0]}
                  y2={at([plan.x + 21, plan.y + 16, 24.2])[1]}
                />
              </g>

              {/* Gold/Copper High-Current Terminal Studs */}
              <circle
                cx={at([plan.x + 5, plan.y + 5, 24.6])[0]}
                cy={at([plan.x + 5, plan.y + 5, 24.6])[1]}
                r="1.8"
                fill="#f59e0b"
                stroke="#b45309"
                strokeWidth="0.5"
              />
              <circle
                cx={at([plan.x + plan.w - 5, plan.y + 5, 24.6])[0]}
                cy={at([plan.x + plan.w - 5, plan.y + 5, 24.6])[1]}
                r="1.8"
                fill="#f59e0b"
                stroke="#b45309"
                strokeWidth="0.5"
              />
            </g>
          );
        })}
      </g>

      {/* 2. Laser-Welded Solid Copper High-Current Busbars */}
      <g id="solid-copper-busbars" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round">
        <line
          x1={at([-120, -19, 25])[0]}
          y1={at([-120, -19, 25])[1]}
          x2={at([-28, -19, 25])[0]}
          y2={at([-28, -19, 25])[1]}
        />
        <line
          x1={at([-120, 9, 25])[0]}
          y1={at([-120, 9, 25])[1]}
          x2={at([-28, 9, 25])[0]}
          y2={at([-28, 9, 25])[1]}
        />
        {/* Inter-Module Cross Link Straps */}
        <line
          x1={at([-85, -19, 25])[0]}
          y1={at([-85, -19, 25])[1]}
          x2={at([-85, 9, 25])[0]}
          y2={at([-85, 9, 25])[1]}
        />
      </g>

      {/* 3. Master Battery Management System (BMS) Microprocessor Unit */}
      <g id="master-bms-unit">
        <path d={bms.fill} fill="#141923" stroke="#0a0d13" strokeWidth="1" />
        {bms.shades.map((d, s) => (
          <path key={`bms-shade-${s}`} d={d} fill={s === 0 ? "#0f121a" : s === 1 ? "#1b2230" : "#2a354a"} />
        ))}
        <path d={bms.top} fill="#333f52" stroke="#475569" strokeWidth="0.8" />
        {bms.crease && <path d={bms.crease} fill="none" stroke="#64748b" strokeWidth="0.6" />}

        {/* Heat Dissipation Micro-Strakes */}
        <g stroke="#64748b" strokeWidth="0.8" strokeLinecap="round">
          <line x1={at([-24, -10, 22.2])[0]} y1={at([-24, -10, 22.2])[1]} x2={at([-14, -10, 22.2])[0]} y2={at([-14, -10, 22.2])[1]} />
          <line x1={at([-24, 0, 22.2])[0]} y1={at([-24, 0, 22.2])[1]} x2={at([-14, 0, 22.2])[0]} y2={at([-14, 0, 22.2])[1]} />
          <line x1={at([-24, 10, 22.2])[0]} y1={at([-24, 10, 22.2])[1]} x2={at([-14, 10, 22.2])[0]} y2={at([-14, 10, 22.2])[1]} />
        </g>

        {/* Status Diagnostic LEDs */}
        <circle cx={at([-18, -6, 22.4])[0]} cy={at([-18, -6, 22.4])[1]} r="1.3" fill="#22c55e" />
        <circle cx={at([-18, 0, 22.4])[0]} cy={at([-18, 0, 22.4])[1]} r="1.3" fill="#38bdf8" />
        <circle cx={at([-18, 6, 22.4])[0]} cy={at([-18, 6, 22.4])[1]} r="1.3" fill="#f59e0b" />
      </g>

      {/* 4. Automotive Safety-Orange High-Voltage Heavy Cables */}
      <g id="hv-orange-cabling" strokeLinecap="round">
        {/* Main HV Positive Cable */}
        <path
          d={`M${at([-28, 9, 25])[0]},${at([-28, 9, 25])[1]} ` +
             `L${at([-20, 6, 23])[0]},${at([-20, 6, 23])[1]} ` +
             `L${at([-14, 6, 20])[0]},${at([-14, 6, 20])[1]}`}
          fill="none"
          stroke="#ea580c"
          strokeWidth="3.2"
        />
        {/* Main HV Negative Cable */}
        <path
          d={`M${at([-28, -19, 25])[0]},${at([-28, -19, 25])[1]} ` +
             `L${at([-20, -10, 23])[0]},${at([-20, -10, 23])[1]} ` +
             `L${at([-14, -10, 20])[0]},${at([-14, -10, 20])[1]}`}
          fill="none"
          stroke="#c2410c"
          strokeWidth="3.2"
        />
        {/* Ceramic High-Voltage Safety Contactors */}
        <circle cx={at([-20, 6, 23])[0]} cy={at([-20, 6, 23])[1]} r="2.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
        <circle cx={at([-20, -10, 23])[0]} cy={at([-20, -10, 23])[1]} r="2.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
      </g>
    </g>
  );
}
