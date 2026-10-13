import React from "react";
import {
  WHEEL_STARBOARD_CENTER,
  WHEEL_PORT_CENTER,
  TIRE_RADIUS,
  RIM_RADIUS,
  BORE_RADIUS,
  TIRE_HALF_WIDTH,
  getWheelTransform,
  buildTreadBarrel,
  CHEVRON_LUGS,
} from "../geometry/hubMotor";
import { PALETTE } from "../view";

export function HubMotorFinished() {
  const sbTransform = getWheelTransform(WHEEL_STARBOARD_CENTER, false);
  const sbBarrelPath = buildTreadBarrel(WHEEL_STARBOARD_CENTER, TIRE_HALF_WIDTH, false);

  const portTransform = getWheelTransform(WHEEL_PORT_CENTER, true);
  const portBarrelPath = buildTreadBarrel(WHEEL_PORT_CENTER, TIRE_HALF_WIDTH, true);

  return (
    <g className="bujji-hub-motor-finished" id="hub-motor-finished">
      {/* 1. Port Front Wheel (Far side, visible through stance) */}
      <g id="port-wheel-finished" opacity="0.95">
        <path d={portBarrelPath} fill="#24272e" stroke="#101216" strokeWidth="0.8" />
        <g transform={portTransform}>
          <circle r={TIRE_RADIUS} fill="#3a3e46" stroke="#111317" strokeWidth="1" />
          <g fill="#25282f" opacity="0.9">
            {CHEVRON_LUGS.map((d, i) => (
              <path key={`port-finished-lug-${i}`} d={d} />
            ))}
          </g>
          <circle r={RIM_RADIUS} fill="#64748b" stroke="#334155" strokeWidth="0.8" />
          <circle r={BORE_RADIUS} fill={PALETTE.bg} stroke="#475569" strokeWidth="0.8" />
        </g>
      </g>

      {/* 2. Starboard Front 34" Wheel Tread Barrel (Foreground 3D volume) */}
      <path d={sbBarrelPath} fill="#2d3138" stroke="#1a1c20" strokeWidth="1" />

      {/* 3. Starboard Finished Wheel Face */}
      <g transform={sbTransform}>
        {/* Rubber Tire */}
        <circle r={TIRE_RADIUS} fill="#3a3e46" stroke="#1a1c20" strokeWidth="1.2" />

        {/* Chevron Off-Road Lugs */}
        <g fill="#25282f" opacity="0.95">
          {CHEVRON_LUGS.map((d, i) => (
            <path key={`sb-finished-lug-${i}`} d={d} />
          ))}
        </g>

        {/* Machined Titanium Outer Rim */}
        <circle r={RIM_RADIUS} fill="#94a3b8" stroke="#64748b" strokeWidth="1.2" />
        <circle r="35" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />

        {/* Perimeter Fastener Bolts */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={`bolt-${deg}`}
              cx={34 * Math.cos(rad)}
              cy={34 * Math.sin(rad)}
              r="1"
              fill={PALETTE.chrome}
              stroke="#475569"
              strokeWidth="0.3"
            />
          );
        })}

        {/* Inner Ring Recess */}
        <circle r={BORE_RADIUS} fill="#1e293b" stroke="#0f172a" strokeWidth="1" />

        {/* Signature Kalki 3-Spoke Star Carrier Bracket (Rotating with Rim) */}
        <g className="anim-spin" id="spinning-spoke-star">
          {[0, 120, 240].map((deg) => (
            <g key={`spoke-${deg}`} transform={`rotate(${deg})`}>
              <path
                d="M-5,14 L-4,32 L4,32 L5,14 Z"
                fill="#cbd5e1"
                stroke="#64748b"
                strokeWidth="0.8"
              />
              <circle cx="0" cy="24" r="2.5" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
              <line x1="0" y1="15" x2="0" y2="30" stroke={PALETTE.chrome} strokeWidth="0.5" />
            </g>
          ))}
        </g>

        {/* True Hubless Hollow Bore */}
        <circle r="16" fill={PALETTE.bg} stroke="#475569" strokeWidth="0.8" />

        {/* Finished Outer Caliper Cover with Hazard Yellow Accent */}
        <g id="finished-caliper" fill="#0f172a">
          <path d="M-16,-34 L16,-34 L19,-42 L-19,-42 Z" stroke="#334155" strokeWidth="0.8" />
          <line x1="-12" y1="-38" x2="12" y2="-38" stroke={PALETTE.yellowMid} strokeWidth="1.5" />
          <path d="M-16,34 L16,34 L19,42 L-19,42 Z" stroke="#334155" strokeWidth="0.8" />
          <circle cx="0" cy="38" r="1.8" fill={PALETTE.yellowMid} />
        </g>
      </g>
    </g>
  );
}
