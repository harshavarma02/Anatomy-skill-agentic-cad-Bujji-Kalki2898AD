import React from "react";
import { at, PALETTE } from "../view";
import {
  NOSE_TOP_PATH,
  FRONT_CHIN_PATH,
  SB_SHOULDER_PATH,
  PORT_SHOULDER_PATH,
  MID_DECK_SB_PATH,
  MID_DECK_PORT_PATH,
  FRONT_TRANSITION_SB_PATH,
  FRONT_TRANSITION_PORT_PATH,
  COCKPIT_BASIN_PATH,
  CANOPY_PATH,
  CANOPY_RIM_PATH,
  REAR_COWL_PATH,
  REAR_QUARTER_SB_PATH,
  REAR_QUARTER_PORT_PATH,
  SB_ROCKER_UNDERBODY_PATH,
  YELLOW_POD_PATH,
} from "../geometry/bujjiAnatomy";

export function FinishedHullCrafted() {
  const chinCenter = at([140, 0, 22]);

  return (
    <g className="bujji-finished-hull" id="finished-hull-crafted">
      {/* 1. Port Shoulder Flank (Background Perspective Shadow) */}
      <path
        d={PORT_SHOULDER_PATH}
        fill="#9a3412"
        stroke="#7c2d12"
        strokeWidth="1"
        opacity="0.9"
        strokeLinejoin="round"
      />

      {/* 1b. Port Rear Quarter Shelf (Closes gap between port cowl and port outer fin) */}
      <path
        d={REAR_QUARTER_PORT_PATH}
        fill="#8a2c0a"
        stroke="#7c2d12"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* 2. Port Mid-Deck Shoulder Surface */}
      <path
        d={MID_DECK_PORT_PATH}
        fill="#b4430e"
        stroke="#7c2d12"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* 2b. Port Front Transition Deck (Background shadow closure) */}
      <path
        d={FRONT_TRANSITION_PORT_PATH}
        fill="#9a3412"
        stroke="#7c2d12"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* 3. Rear Cowl & Engine Deck (Behind Canopy) */}
      <path
        d={REAR_COWL_PATH}
        fill="#c74e0d"
        stroke="#7c2d12"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 3b. Starboard Rear Quarter Shelf (Watertight closure between rear cowl and outer fin) */}
      <path
        d={REAR_QUARTER_SB_PATH}
        fill="#b4430e"
        stroke="#7c2d12"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Rear Quarter Radiator Strakes */}
      <g stroke="#7c2d12" strokeWidth="1" strokeLinecap="round">
        <line x1={at([-135, 42, 52])[0]} y1={at([-135, 42, 52])[1]} x2={at([-115, 42, 52])[0]} y2={at([-115, 42, 52])[1]} />
        <line x1={at([-105, 48, 54])[0]} y1={at([-105, 48, 54])[1]} x2={at([-85, 48, 54])[0]} y2={at([-85, 48, 54])[1]} />
      </g>
      {/* Rear Cowl Cooling Louvers */}
      <g stroke="#7c2d12" strokeWidth="1" strokeLinecap="round">
        <line x1="334" y1="104" x2="358" y2="116" />
        <line x1="342" y1="110" x2="366" y2="122" />
        <line x1="350" y1="116" x2="374" y2="128" />
      </g>

      {/* 4. Sloping Front Nose / Hood Deck (Facing Upward to Light) */}
      <path
        d={NOSE_TOP_PATH}
        fill={PALETTE.orangeHi}
        stroke="#c74e0d"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Hood Centerline Crease */}
      <line
        x1={at([45, 0, 48])[0]}
        y1={at([45, 0, 48])[1]}
        x2={at([140, 0, 24])[0]}
        y2={at([140, 0, 24])[1]}
        stroke="#ffaa70"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Hood Aerodynamic Air Intake Gills */}
      <g stroke="#9a3412" strokeWidth="1.2" strokeLinecap="round">
        <line x1={at([75, 12, 38])[0]} y1={at([75, 12, 38])[1]} x2={at([95, 12, 34])[0]} y2={at([95, 12, 34])[1]} />
        <line x1={at([75, -12, 38])[0]} y1={at([75, -12, 38])[1]} x2={at([95, -12, 34])[0]} y2={at([95, -12, 34])[1]} />
      </g>

      {/* 5. Front Chin Vertical Grille Fascia & Splitter */}
      <path
        d={FRONT_CHIN_PATH}
        fill="#14171d"
        stroke="#0b0d12"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Radiator Cooling Louvers */}
      <g stroke="#334155" strokeWidth="1.2" strokeLinecap="round">
        <line x1={chinCenter[0] - 18} y1={chinCenter[1] + 8} x2={chinCenter[0] + 12} y2={chinCenter[1] - 4} />
        <line x1={chinCenter[0] - 14} y1={chinCenter[1] + 13} x2={chinCenter[0] + 16} y2={chinCenter[1] + 1} />
      </g>
      {/* Dual High-Intensity LED Headlights */}
      <circle cx={chinCenter[0] - 22} cy={chinCenter[1] + 6} r="3" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" />
      <circle cx={chinCenter[0] + 20} cy={chinCenter[1] - 8} r="3" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" />

      {/* 6. Starboard Shoulder Flank (Muscular Foreground Outer Hull) */}
      <path
        d={SB_SHOULDER_PATH}
        fill={PALETTE.orangeMid}
        stroke={PALETTE.orangeDark}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 6b. Starboard Front Transition Deck (Closes triangular deck between nose hood and shoulder crest) */}
      <path
        d={FRONT_TRANSITION_SB_PATH}
        fill={PALETTE.orangeMid}
        stroke={PALETTE.orangeDark}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 7. Starboard Mid-Deck Shoulder Surface (Bridges Canopy to Outer Shoulder) */}
      <path
        d={MID_DECK_SB_PATH}
        fill={PALETTE.orangeMid}
        stroke={PALETTE.orangeDark}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Mid-Deck Panel Shutline Seams */}
      <g stroke="#853100" strokeWidth="1" strokeLinecap="round">
        <line x1={at([-60, 66, 56])[0]} y1={at([-60, 66, 56])[1]} x2={at([-60, 56, 16])[0]} y2={at([-60, 56, 16])[1]} />
        <line x1={at([30, 64, 50])[0]} y1={at([30, 64, 50])[1]} x2={at([30, 56, 16])[0]} y2={at([30, 56, 16])[1]} />
        <line x1={at([45, 34, 48])[0]} y1={at([45, 34, 48])[1]} x2={at([45, 26, 49])[0]} y2={at([45, 26, 49])[1]} />
        <line x1={at([45, 34, 48])[0]} y1={at([45, 34, 48])[1]} x2={at([125, 34, 28])[0]} y2={at([125, 34, 28])[1]} />
      </g>

      {/* 8. Dark Cockpit Interior Basin Underneath Canopy */}
      <path
        d={COCKPIT_BASIN_PATH}
        fill="#0b0e17"
        stroke="#1e293b"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* 9. Aerodynamic Teardrop Cockpit Canopy Visor */}
      <g id="canopy-visor">
        {/* Dark Smoke Glass Bubble */}
        <path
          d={CANOPY_PATH}
          fill="#0a0f1d"
          stroke="#1e293b"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Signature Movie Blue/Cyan Frame Ring */}
        <path
          d={CANOPY_RIM_PATH}
          fill="none"
          stroke="#0284c7"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d={CANOPY_RIM_PATH}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Specular Curved Reflection Streak */}
        <path
          d="M490,192 C516,210 542,234 560,262"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      {/* 9b. Dark Underbody Chassis Rocker Flange (Ground belly return under yellow sponson) */}
      <path
        d={SB_ROCKER_UNDERBODY_PATH}
        fill="#14171d"
        stroke="#0b0e14"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* 10. Yellow Aerodynamic Side Pod Sponson (Starboard) */}
      <g id="side-pod-sponson">
        <path
          d={YELLOW_POD_PATH}
          fill={PALETTE.yellowMid}
          stroke="#a16207"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Cooling Intake Scoop */}
        <path
          d="M382,238 L428,260 L420,270 L374,248 Z"
          fill="#14171d"
          stroke="#854d0e"
          strokeWidth="0.8"
        />
        {/* Hazard Chevrons */}
        <g fill="#14171d">
          <path d="M442,272 L448,268 L444,282 L438,286 Z" />
          <path d="M452,278 L458,274 L454,288 L448,292 Z" />
          <path d="M462,284 L468,280 L464,294 L458,298 Z" />
        </g>
        {/* Movie Micro Typography */}
        <text
          x="396"
          y="276"
          fill="#854d0e"
          fontSize="4.2"
          fontWeight="700"
          fontFamily="var(--anatomy-mono)"
          letterSpacing="0.4"
        >
          KALKI 2898 AD
        </text>
      </g>

      {/* 11. Twin Rear Cylindrical Thrusters (At Tail) */}
      <g id="rear-thrusters" stroke="#0f172a" strokeWidth="0.8">
        <ellipse cx="320" cy="120" rx="9" ry="5.5" fill="#334155" />
        <ellipse cx="320" cy="120" rx="6" ry="3.8" fill="#d97706" />
        <ellipse cx="360" cy="142" rx="9" ry="5.5" fill="#334155" />
        <ellipse cx="360" cy="142" rx="6" ry="3.8" fill="#d97706" />
      </g>
    </g>
  );
}
