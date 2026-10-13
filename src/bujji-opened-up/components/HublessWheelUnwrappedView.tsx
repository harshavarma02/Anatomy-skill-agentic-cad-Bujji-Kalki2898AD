import React from "react";
import { PALETTE } from "../view";
import {
  WHEEL_SB_CENTER,
  getWheelSideTransform,
  STATOR_COILS,
  GEAR_RING_TEETH,
  TIRE_R,
  TIRE_HALF_W,
  buildTreadBarrel,
} from "../geometry/bujjiAnatomy";

export function HublessWheelUnwrappedView() {
  const barrel = buildTreadBarrel(WHEEL_SB_CENTER, TIRE_HALF_W, false);
  const sbTransform = getWheelSideTransform(WHEEL_SB_CENTER, false);

  // 20 Taper Roller Bearing Pins around perimeter
  const rollerCount = 20;
  const bearingR = 25.5;

  return (
    <g className="bujji-hubless-wheel-unwrapped" id="hubless-wheel-unwrapped">
      {/* 1. Starboard 34.5" Tire Cylindrical Tread Barrel (3D Volume) */}
      <path
        d={barrel.barrel}
        fill="#1e2229"
        stroke="#0c0e12"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d={barrel.topHighlight}
        fill="#333a47"
        stroke="none"
        opacity="0.8"
      />

      {/* 2. Unwrapped Hubless Wheel Mechanics Face */}
      <g transform={sbTransform}>
        {/* 34.5" Outer Wheel Ring & Carbon-Ceramic Brake Rotor Track */}
        <circle r={TIRE_R} fill="#141722" stroke="#090c12" strokeWidth="1.4" />
        <circle r="29" fill="#1e2533" stroke="#334155" strokeWidth="1" />

      {/* Ventilated Brake Rotor Drilled Holes */}
      {[...Array(16)].map((_, i) => {
        const rad = (i / 16) * Math.PI * 2;
        return (
          <circle
            key={`rotor-hole-${i}`}
            cx={28.5 * Math.cos(rad)}
            cy={28.5 * Math.sin(rad)}
            r="0.8"
            fill="#090d16"
          />
        );
      })}

      {/* 2. Perimeter Taper Roller Bearing Race (Carries 1-Tonne Wheel Load) */}
      <circle r={bearingR} fill="none" stroke="#64748b" strokeWidth="2.8" />
      <circle r={bearingR} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="1.5 2.5" />

      {/* Visible Taper Roller Pins */}
      {[...Array(rollerCount)].map((_, i) => {
        const rad = (i / rollerCount) * Math.PI * 2;
        const x = bearingR * Math.cos(rad);
        const y = bearingR * Math.sin(rad);
        return (
          <circle
            key={`taper-roller-${i}`}
            cx={x}
            cy={y}
            r="1"
            fill="#f8fafc"
            stroke="#475569"
            strokeWidth="0.4"
          />
        );
      })}

      {/* Inner Hub Stator Casing */}
      <circle r="22.5" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" />

      {/* 3. Radial Copper Stator Induction Coils */}
      <g id="stator-induction-coils" fill="#d97706" stroke="#b45309" strokeWidth="0.5">
        {STATOR_COILS.map(({ d }, i) => (
          <path key={`hub-coil-${i}`} d={d} />
        ))}
      </g>

      {/* 4. Spinning Planetary Reduction Gear System */}
      <g className="anim-spin" id="planetary-gears">
        <path d={GEAR_RING_TEETH} fill="#f5bf00" stroke="#b45309" strokeWidth="0.4" />
        <circle r="13" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
        {[0, 120, 240].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={`hub-pinion-${deg}`}
              cx={9 * Math.cos(rad)}
              cy={9 * Math.sin(rad)}
              r="2.5"
              fill="#94a3b8"
              stroke="#475569"
              strokeWidth="0.5"
            />
          );
        })}
      </g>

      {/* Hollow Hub Center (The Signature Hubless Void) */}
      <circle r="6" fill={PALETTE.bg} stroke="#475569" strokeWidth="1" />

      {/* 5. Dual Opposed Performance Brake Calipers (Autocar-Reported to halt 6 Tonnes) */}
      {/* Caliper A: Upper-Forward Caliper (at ~ -45 degrees) */}
      <g id="caliper-a" transform="rotate(-45)">
        <rect
          x="24"
          y="-6.5"
          width="8.5"
          height="13"
          rx="2"
          fill="#d97706"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        {/* Twin Hydraulic Pistons */}
        <circle cx="28" cy="-3" r="1.8" fill="#f8fafc" stroke="#451a03" strokeWidth="0.5" />
        <circle cx="28" cy="3" r="1.8" fill="#f8fafc" stroke="#451a03" strokeWidth="0.5" />
        {/* Caliper Bleeder Nipple */}
        <rect x="31" y="-1" width="2" height="2" fill="#94a3b8" />
      </g>

      {/* Caliper B: Lower-Rear Caliper (at ~ 135 degrees) */}
      <g id="caliper-b" transform="rotate(135)">
        <rect
          x="24"
          y="-6.5"
          width="8.5"
          height="13"
          rx="2"
          fill="#d97706"
          stroke="#78350f"
          strokeWidth="0.8"
        />
        {/* Twin Hydraulic Pistons */}
        <circle cx="28" cy="-3" r="1.8" fill="#f8fafc" stroke="#451a03" strokeWidth="0.5" />
        <circle cx="28" cy="3" r="1.8" fill="#f8fafc" stroke="#451a03" strokeWidth="0.5" />
        {/* Caliper Bleeder Nipple */}
        <rect x="31" y="-1" width="2" height="2" fill="#94a3b8" />
      </g>
    </g>
  </g>
  );
}
