import React from "react";
import { at, PALETTE } from "../view";
import { ROLL_CAGE_STRUTS } from "../geometry/bujjiAnatomy";
import { ChassisSpaceframeView } from "./ChassisSpaceframeView";
import { RearSteeringHydraulicsView } from "./RearSteeringHydraulicsView";
import { DualInductionMotorsView } from "./DualInductionMotorsView";
import { BatteryPackDetailedView } from "./BatteryPackDetailedView";
import { CockpitCapsuleView } from "./CockpitCapsuleView";

export function PowertrainCrafted() {
  return (
    <g className="bujji-powertrain-crafted" id="powertrain-crafted">
      {/* 1. Phase 1: 6-Tonne Spaceframe Ladder Chassis Backbone (Z=10..22) */}
      <ChassisSpaceframeView />

      {/* 2. Phase 5: Electro-Hydraulic Rear Steering & Dual Coilovers (X=-175..-130) */}
      <RearSteeringHydraulicsView />

      {/* 3. Phase 4: Dual Kirloskar Induction Motors & 9,800 Nm Gearbox (X=-156..-130) */}
      <DualInductionMotorsView />

      {/* 4. Phase 3: 47 kWh Modular Battery Spine & Master BMS Unit (X=-125..-20) */}
      <BatteryPackDetailedView />

      {/* 5. Phase 2: Pilot Capsule & Folding Steering Yoke (X=-20..+45) */}
      <CockpitCapsuleView />

      {/* 6. Live Glowing Cyan Electrical Conduits (High-Voltage Flow from Battery to Motors/Hubs) */}
      <g id="cyan-power-conduits">
        <path
          d={`M${at([-140, 0, 26])[0]},${at([-140, 0, 26])[1]} ` +
             `L${at([-55, 0, 26])[0]},${at([-55, 0, 26])[1]} ` +
             `L${at([22, 0, 28])[0]},${at([22, 0, 28])[1]} ` +
             `L${at([75, 28, 26])[0]},${at([75, 28, 26])[1]} ` +
             `L${at([140, 56, 31])[0]},${at([140, 56, 31])[1]}`}
          fill="none"
          stroke={PALETTE.cyanGlow}
          strokeWidth="4"
          opacity="0.5"
          strokeLinecap="round"
        />
        <path
          className="anim-electron-flow"
          d={`M${at([-140, 0, 26])[0]},${at([-140, 0, 26])[1]} ` +
             `L${at([-55, 0, 26])[0]},${at([-55, 0, 26])[1]} ` +
             `L${at([22, 0, 28])[0]},${at([22, 0, 28])[1]} ` +
             `L${at([75, 28, 26])[0]},${at([75, 28, 26])[1]} ` +
             `L${at([140, 56, 31])[0]},${at([140, 56, 31])[1]}`}
          fill="none"
          stroke={PALETTE.cyanBright}
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      </g>

      {/* 7. Cockpit Roll Cage Tubular Framework (Z=24..42) */}
      <g id="roll-cage" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round">
        {ROLL_CAGE_STRUTS.map(([p0, p1], i) => {
          const a = at(p0);
          const b = at(p1);
          return <line key={`strut-${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
        })}
      </g>
    </g>
  );
}
