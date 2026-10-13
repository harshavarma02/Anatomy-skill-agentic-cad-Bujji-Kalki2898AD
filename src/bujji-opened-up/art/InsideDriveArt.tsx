import React from "react";
import { PlinthView } from "../components/PlinthView";
import { OmniSphereCrafted } from "../components/OmniSphereCrafted";
import { PortRunningGear } from "../components/PortRunningGear";
import { PowertrainCrafted } from "../components/PowertrainCrafted";
import { StarboardSuspension } from "../components/StarboardSuspension";
import { HublessWheelUnwrappedView } from "../components/HublessWheelUnwrappedView";

export function InsideDriveArt() {
  return (
    <g className="inside-drive-art" id="inside-drive-art">
      {/* 1. Precision Machined Test-Bench Plinth with Shadow Halo */}
      <PlinthView />

      {/* 2. Rear Spherical Omni-Drive (Depth ~ -115) */}
      <OmniSphereCrafted />

      {/* 3. Port Front Wheel & Outrigger (Far Side Running Gear, Depth ~ 76) */}
      <PortRunningGear mode="unwrapped" />

      {/* 4. Internal Powertrain: Spaceframe Tub, 47 kWh Battery, Dual Motors, Cockpit (Depth ~ 0 to 40) */}
      <PowertrainCrafted />

      {/* 5. Starboard Cantilever Suspension & Hydraulic Ram (Depth ~ 120) */}
      <StarboardSuspension />

      {/* 6. Starboard 34.5" Hubless Hero Wheel (Unwrapped Mechanics, Depth ~ 155) */}
      <HublessWheelUnwrappedView />

      {/* Engineering Callout Label */}
      <text
        x="36"
        y="42"
        fill="var(--anatomy-text)"
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--anatomy-mono)"
        letterSpacing="1"
      >
        INSIDE // UNWRAPPED POWERTRAIN
      </text>
    </g>
  );
}
