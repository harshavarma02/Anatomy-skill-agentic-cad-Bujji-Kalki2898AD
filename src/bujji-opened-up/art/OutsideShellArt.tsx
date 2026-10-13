import React from "react";
import { PlinthView } from "../components/PlinthView";
import { OmniSphereCrafted } from "../components/OmniSphereCrafted";
import { PortRunningGear } from "../components/PortRunningGear";
import { FinishedHullCrafted } from "../components/FinishedHullCrafted";
import { StarboardSuspension } from "../components/StarboardSuspension";
import { StarboardWheelCrafted } from "../components/StarboardWheelCrafted";

export function OutsideShellArt() {
  return (
    <g className="outside-shell-art" id="outside-shell-art">
      {/* 1. Precision Machined Test-Bench Plinth with Shadow Halo */}
      <PlinthView />

      {/* 2. Rear Spherical Omni-Drive (Depth ~ -115) */}
      <OmniSphereCrafted />

      {/* 3. Port Front Wheel & Outrigger (Far Side Running Gear, Depth ~ 76) */}
      <PortRunningGear />

      {/* 4. Finished Automotive Monocoque Hull & Visor (Depth ~ 30 to 85) */}
      <FinishedHullCrafted />

      {/* 5. Starboard Cantilever Suspension & Hydraulic Ram (Depth ~ 120) */}
      <StarboardSuspension />

      {/* 6. Starboard 34" Foreground Hero Wheel (Depth ~ 155) */}
      <StarboardWheelCrafted />

      {/* Engineering Callout Label */}
      <text
        x="964"
        y="42"
        textAnchor="end"
        fill="var(--anatomy-text)"
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--anatomy-mono)"
        letterSpacing="1"
      >
        OUTSIDE // FINISHED VEHICLE
      </text>
    </g>
  );
}
