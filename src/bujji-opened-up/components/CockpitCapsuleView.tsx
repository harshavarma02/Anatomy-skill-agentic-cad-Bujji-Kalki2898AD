import React from "react";
import { at, PALETTE, P } from "../view";
import { slabOf, type Plan } from "../../anatomy-kit/iso-kit";

export function CockpitCapsuleView() {
  // 1. Contoured Pilot Racing Bucket Seat Base Cushion
  const seatBasePlan: Plan = { x: -16, y: -11, w: 22, d: 22, r: 4 };
  const seatBase = slabOf(seatBasePlan, 15, 6, P, 1.5, 0.8);

  // 2. High-Tech Cockpit Dashboard Shelf
  const dashPlan: Plan = { x: 20, y: -20, w: 10, d: 40, r: 3 };
  const dash = slabOf(dashPlan, 28, 6, P, 1.5, 0.8);

  // Steering yoke center & AI eye center
  const yokePivot = at([8, 0, 36]);
  const aiEyeCenter = at([24, 0, 38]);

  return (
    <g className="bujji-cockpit-capsule" id="cockpit-capsule">
      {/* --- Footwell Billet Pedals (Drive & Brake) --- */}
      <g id="footwell-pedals">
        <line
          x1={at([38, -6, 14])[0]}
          y1={at([38, -6, 14])[1]}
          x2={at([34, -6, 20])[0]}
          y2={at([34, -6, 20])[1]}
          stroke="#94a3b8"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1={at([38, 4, 14])[0]}
          y1={at([38, 4, 14])[1]}
          x2={at([34, 4, 21])[0]}
          y2={at([34, 4, 21])[1]}
          stroke="#cbd5e1"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Anti-Slip Pedal Pads */}
        <circle cx={at([34, -6, 20])[0]} cy={at([34, -6, 20])[1]} r="2" fill="#0f172a" />
        <circle cx={at([34, 4, 21])[0]} cy={at([34, 4, 21])[1]} r="2.4" fill="#0f172a" />
      </g>

      {/* --- Contoured Pilot Racing Bucket Seat --- */}
      <g id="pilot-bucket-seat">
        {/* Volumetric Cushion Base */}
        <path d={seatBase.fill} fill="#141722" stroke="#090b10" strokeWidth="1" />
        {seatBase.shades.map((d, s) => (
          <path key={`seat-shade-${s}`} d={d} fill={s === 0 ? "#0e111a" : s === 1 ? "#171c28" : "#242c3d"} />
        ))}
        <path d={seatBase.top} fill="#1e2433" stroke="#334155" strokeWidth="0.8" />
        {seatBase.crease && <path d={seatBase.crease} fill="none" stroke="#475569" strokeWidth="0.6" />}

        {/* Seat Cushion Embossed Lateral Bolster Ridges */}
        <g stroke="#334155" strokeWidth="1" strokeLinecap="round">
          <line x1={at([-10, -8, 21.2])[0]} y1={at([-10, -8, 21.2])[1]} x2={at([2, -8, 21.2])[0]} y2={at([2, -8, 21.2])[1]} />
          <line x1={at([-10, 0, 21.2])[0]} y1={at([-10, 0, 21.2])[1]} x2={at([2, 0, 21.2])[0]} y2={at([2, 0, 21.2])[1]} />
          <line x1={at([-10, 8, 21.2])[0]} y1={at([-10, 8, 21.2])[1]} x2={at([2, 8, 21.2])[0]} y2={at([2, 8, 21.2])[1]} />
        </g>

        {/* Reclined Ergonomic Backrest Shell */}
        <polygon
          points={`
            ${at([-16, -10, 21])[0]},${at([-16, -10, 21])[1]}
            ${at([-16, 10, 21])[0]},${at([-16, 10, 21])[1]}
            ${at([-30, 9, 50])[0]},${at([-30, 9, 50])[1]}
            ${at([-30, -9, 50])[0]},${at([-30, -9, 50])[1]}
          `}
          fill="#1c2230"
          stroke="#0f141d"
          strokeWidth="1.2"
        />
        {/* Backrest Padded Inner Cushion */}
        <polygon
          points={`
            ${at([-16, -7, 22])[0]},${at([-16, -7, 22])[1]}
            ${at([-16, 7, 22])[0]},${at([-16, 7, 22])[1]}
            ${at([-28, 6, 48])[0]},${at([-28, 6, 48])[1]}
            ${at([-28, -6, 48])[0]},${at([-28, -6, 48])[1]}
          `}
          fill="#273142"
          stroke="#38455a"
          strokeWidth="0.8"
        />

        {/* High-Back Headrest & Cervical Support */}
        <polygon
          points={`
            ${at([-29, -6, 50])[0]},${at([-29, -6, 50])[1]}
            ${at([-29, 6, 50])[0]},${at([-29, 6, 50])[1]}
            ${at([-33, 5, 58])[0]},${at([-33, 5, 58])[1]}
            ${at([-33, -5, 58])[0]},${at([-33, -5, 58])[1]}
          `}
          fill="#1e2533"
          stroke="#334155"
          strokeWidth="1"
        />
        {/* Headrest Cushion Pad */}
        <circle cx={at([-31, 0, 54])[0]} cy={at([-31, 0, 54])[1]} r="3" fill="#333f52" stroke="#475569" strokeWidth="0.6" />
      </g>

      {/* --- 4-Point Competition Racing Harness (Safety Yellow Straps) --- */}
      <g id="pilot-racing-harness">
        {/* Left Shoulder Strap */}
        <line
          x1={at([-31, -4, 52])[0]}
          y1={at([-31, -4, 52])[1]}
          x2={at([-6, -2, 23])[0]}
          y2={at([-6, -2, 23])[1]}
          stroke="#eab308"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Right Shoulder Strap */}
        <line
          x1={at([-31, 4, 52])[0]}
          y1={at([-31, 4, 52])[1]}
          x2={at([-6, 2, 23])[0]}
          y2={at([-6, 2, 23])[1]}
          stroke="#eab308"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Strap Outer Stitching Accents */}
        <line
          x1={at([-31, -4, 52])[0]}
          y1={at([-31, -4, 52])[1]}
          x2={at([-6, -2, 23])[0]}
          y2={at([-6, -2, 23])[1]}
          stroke="#a16207"
          strokeWidth="0.6"
          strokeDasharray="2 3"
        />
        <line
          x1={at([-31, 4, 52])[0]}
          y1={at([-31, 4, 52])[1]}
          x2={at([-6, 2, 23])[0]}
          y2={at([-6, 2, 23])[1]}
          stroke="#a16207"
          strokeWidth="0.6"
          strokeDasharray="2 3"
        />
        {/* Central Anodized Camlock Release Buckle */}
        <circle cx={at([-6, 0, 23])[0]} cy={at([-6, 0, 23])[1]} r="2.2" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
        <circle cx={at([-6, 0, 23])[0]} cy={at([-6, 0, 23])[1]} r="0.9" fill="#ef4444" />
      </g>

      {/* --- High-Tech Dashboard Fascia Shelf --- */}
      <g id="cockpit-dashboard">
        <path d={dash.fill} fill="#141923" stroke="#090b10" strokeWidth="1" />
        {dash.shades.map((d, s) => (
          <path key={`dash-shade-${s}`} d={d} fill={s === 0 ? "#0f121a" : s === 1 ? "#1b2230" : "#2a354a"} />
        ))}
        <path d={dash.top} fill="#333f52" stroke="#475569" strokeWidth="0.8" />
        {dash.crease && <path d={dash.crease} fill="none" stroke="#64748b" strokeWidth="0.6" />}

        {/* Dual High-Resolution HUD Telemetry Displays */}
        {/* Port HUD Display (Battery & Velocity) */}
        <polygon
          points={`
            ${at([22, -14, 34.5])[0]},${at([22, -14, 34.5])[1]}
            ${at([22, -4, 34.5])[0]},${at([22, -4, 34.5])[1]}
            ${at([26, -4, 34.5])[0]},${at([26, -4, 34.5])[1]}
            ${at([26, -14, 34.5])[0]},${at([26, -14, 34.5])[1]}
          `}
          fill="#091422"
          stroke="#0284c7"
          strokeWidth="0.8"
        />
        <line
          x1={at([23, -12, 34.6])[0]}
          y1={at([23, -12, 34.6])[1]}
          x2={at([23, -6, 34.6])[0]}
          y2={at([23, -6, 34.6])[1]}
          stroke="#38bdf8"
          strokeWidth="1.2"
        />

        {/* Starboard HUD Display (Torque & Motor Status) */}
        <polygon
          points={`
            ${at([22, 4, 34.5])[0]},${at([22, 4, 34.5])[1]}
            ${at([22, 14, 34.5])[0]},${at([22, 14, 34.5])[1]}
            ${at([26, 14, 34.5])[0]},${at([26, 14, 34.5])[1]}
            ${at([26, 4, 34.5])[0]},${at([26, 4, 34.5])[1]}
          `}
          fill="#091422"
          stroke="#0284c7"
          strokeWidth="0.8"
        />
        <line
          x1={at([23, 6, 34.6])[0]}
          y1={at([23, 6, 34.6])[1]}
          x2={at([23, 12, 34.6])[0]}
          y2={at([23, 12, 34.6])[1]}
          stroke="#38bdf8"
          strokeWidth="1.2"
        />
      </g>

      {/* --- Central AI Neural Eye ("Bujji's Eye") --- */}
      <g id="bujji-ai-eye">
        {/* Outer Gimbal Mounting Turret */}
        <circle cx={aiEyeCenter[0]} cy={aiEyeCenter[1]} r="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
        {/* Dark Obsidian Spherical Eye Body */}
        <circle cx={aiEyeCenter[0]} cy={aiEyeCenter[1]} r="4.6" fill="#090d16" stroke="#0284c7" strokeWidth="0.8" />
        {/* Luminous Movie Cyan Optic Iris Ring */}
        <circle
          cx={aiEyeCenter[0]}
          cy={aiEyeCenter[1]}
          r="3"
          fill="none"
          stroke={PALETTE.cyanBright}
          strokeWidth="1.2"
          className="anim-glow"
        />
        <circle cx={aiEyeCenter[0]} cy={aiEyeCenter[1]} r="1.5" fill="#38bdf8" />
        {/* Specular Optic Glint Reflection */}
        <circle cx={aiEyeCenter[0] - 1.2} cy={aiEyeCenter[1] - 1.2} r="0.7" fill="#ffffff" />
      </g>

      {/* --- Articulated Folding Steering Yoke (Autocar-Documented Swing Mechanism) --- */}
      <g id="folding-steering-yoke">
        {/* Steering Column Stalk */}
        <line
          x1={at([18, 0, 18])[0]}
          y1={at([18, 0, 18])[1]}
          x2={yokePivot[0]}
          y2={yokePivot[1]}
          stroke="#475569"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Quick-Release Knurled Folding Hinge Collar */}
        <ellipse
          cx={yokePivot[0]}
          cy={yokePivot[1]}
          rx="3.2"
          ry="2"
          fill="#f59e0b"
          stroke="#b45309"
          strokeWidth="0.6"
        />

        {/* Yoke Butterfly Crossbar */}
        <line
          x1={at([8, -10, 36])[0]}
          y1={at([8, -10, 36])[1]}
          x2={at([8, 10, 36])[0]}
          y2={at([8, 10, 36])[1]}
          stroke="#1e293b"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Port Handgrip (Contoured Ergonomic Grip) */}
        <line
          x1={at([8, -10, 33])[0]}
          y1={at([8, -10, 33])[1]}
          x2={at([8, -10, 39])[0]}
          y2={at([8, -10, 39])[1]}
          stroke="#334155"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Port Thumb Control Roller */}
        <circle cx={at([8, -8, 38])[0]} cy={at([8, -8, 38])[1]} r="1.2" fill="#0284c7" />

        {/* Starboard Handgrip (Contoured Ergonomic Grip) */}
        <line
          x1={at([8, 10, 33])[0]}
          y1={at([8, 10, 33])[1]}
          x2={at([8, 10, 39])[0]}
          y2={at([8, 10, 39])[1]}
          stroke="#334155"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Starboard Thumb Control Roller */}
        <circle cx={at([8, 8, 38])[0]} cy={at([8, 8, 38])[1]} r="1.2" fill="#f59e0b" />

        {/* Central Yoke Boss & Bujji Emblem Plate */}
        <circle cx={yokePivot[0]} cy={yokePivot[1]} r="2.8" fill="#0f172a" stroke="#64748b" strokeWidth="0.8" />
        <circle cx={yokePivot[0]} cy={yokePivot[1]} r="1.2" fill="#38bdf8" />
      </g>
    </g>
  );
}
