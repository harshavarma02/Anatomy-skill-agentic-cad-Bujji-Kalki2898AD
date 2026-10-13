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
  STATOR_COILS,
  GEAR_RING_TEETH,
} from "../geometry/hubMotor";
import { PALETTE } from "../view";

export function HubMotorUnwrapped() {
  const sbTransform = getWheelTransform(WHEEL_STARBOARD_CENTER, false);
  const sbBarrelPath = buildTreadBarrel(WHEEL_STARBOARD_CENTER, TIRE_HALF_WIDTH, false);

  const portTransform = getWheelTransform(WHEEL_PORT_CENTER, true);
  const portBarrelPath = buildTreadBarrel(WHEEL_PORT_CENTER, TIRE_HALF_WIDTH, true);

  return (
    <g className="bujji-hub-motor-unwrapped" id="hub-motor-unwrapped">
      {/* 1. Port Front Wheel (Far side, visible through stance) */}
      <g id="port-wheel-unwrapped" opacity="0.9">
        <path d={portBarrelPath} fill="#1a1c22" stroke="#0e1014" strokeWidth="0.8" />
        <g transform={portTransform}>
          <circle r={TIRE_RADIUS} fill={PALETTE.tireDark} stroke="#111317" strokeWidth="1" />
          <g fill={PALETTE.tireLugs} opacity="0.9">
            {CHEVRON_LUGS.map((d, i) => (
              <path key={`port-lug-${i}`} d={d} />
            ))}
          </g>
          <circle r={RIM_RADIUS} fill="#181a1e" stroke={PALETTE.steel} strokeWidth="0.8" />
          <circle r={BORE_RADIUS} fill={PALETTE.bg} stroke="#334155" strokeWidth="0.8" />
        </g>
      </g>

      {/* 2. Starboard Front 34" Wheel Tread Barrel (Foreground 3D volume) */}
      <path d={sbBarrelPath} fill="#212429" stroke="#131518" strokeWidth="1" />

      {/* 3. Starboard Wheel Face (Transformed into 3D isometric plane) */}
      <g transform={sbTransform}>
        {/* Rubber Tire */}
        <circle r={TIRE_RADIUS} fill={PALETTE.tireDark} stroke="#131518" strokeWidth="1.2" />

        {/* Chevron Off-Road Lugs */}
        <g fill={PALETTE.tireLugs} opacity="0.95">
          {CHEVRON_LUGS.map((d, i) => (
            <path key={`sb-lug-${i}`} d={d} />
          ))}
        </g>

        {/* Rim Shoulder & Stator Ring Track */}
        <circle r={RIM_RADIUS} fill="#1a1d22" stroke={PALETTE.steel} strokeWidth="1.2" />
        <circle r={BORE_RADIUS} fill="#0d0e11" stroke="#334155" strokeWidth="1" />

        {/* Exposed Copper Stator Coils (16 radial windings) */}
        <g id="stator-windings">
          {STATOR_COILS.map((coil, i) => (
            <path
              key={`coil-${i}`}
              d={coil.d}
              fill={PALETTE.copperCoil}
              stroke="#b45309"
              strokeWidth="0.5"
            />
          ))}
          <circle
            r="31"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="0.6"
            strokeDasharray="2 3"
            opacity="0.8"
          />
        </g>

        {/* Animated Yellow Perimeter Ring Gear */}
        <g className="anim-spin" id="spinning-ring-gear">
          <path d={GEAR_RING_TEETH} fill={PALETTE.yellowMid} stroke={PALETTE.yellowLo} strokeWidth="0.4" />
          <circle r="25.5" fill="none" stroke={PALETTE.yellowHi} strokeWidth="0.8" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={`tick-${deg}`}
                x1={20 * Math.cos(rad)}
                y1={20 * Math.sin(rad)}
                x2={25 * Math.cos(rad)}
                y2={25 * Math.sin(rad)}
                stroke={PALETTE.yellowHi}
                strokeWidth="1.2"
              />
            );
          })}
        </g>

        {/* True Hubless Hollow Bore */}
        <circle r="19" fill={PALETTE.bg} stroke="#334155" strokeWidth="0.8" />

        {/* Top Caliper Claw */}
        <g id="caliper-top" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8">
          <path d="M-14,-34 L14,-34 L18,-43 L-18,-43 Z" />
          <circle cx="-8" cy="-38" r="1.4" fill={PALETTE.chrome} />
          <circle cx="8" cy="-38" r="1.4" fill={PALETTE.chrome} />
        </g>

        {/* Bottom Caliper & Pinion Mount */}
        <g id="caliper-bottom" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8">
          <path d="M-14,34 L14,34 L18,43 L-18,43 Z" />
          <circle cx="0" cy="38" r="2.5" fill={PALETTE.yellowMid} stroke="#854d0e" strokeWidth="0.5" />
          <circle cx="-9" cy="38" r="1.2" fill={PALETTE.chrome} />
          <circle cx="9" cy="38" r="1.2" fill={PALETTE.chrome} />
        </g>
      </g>
    </g>
  );
}
