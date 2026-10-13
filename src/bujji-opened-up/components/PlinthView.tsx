import React from "react";
import { Solid, Line } from "../../anatomy-kit/draw";
import { topMatrix } from "../../anatomy-kit/iso-kit";
import { P } from "../view";
import { PLINTH_GEOMETRY, SPEC_PLATE_PLAN } from "../geometry/plinth";

export function PlinthView() {
  const plateTransform = topMatrix([SPEC_PLATE_PLAN.x + 8, SPEC_PLATE_PLAN.y + 8], 0.8, P, "x");

  return (
    <g className="bujji-plinth" id="bujji-plinth">
      {/* 1. Soft plinth drop shadow */}
      <path className="iso-halo" d={PLINTH_GEOMETRY.halo} />

      {/* 2. Four rubber anti-vibration damper feet */}
      {PLINTH_GEOMETRY.feet.map((foot, index) => (
        <g key={`foot-${index}`}>
          <Solid paths={foot.pad} tone="mid" crease="none" />
          <Solid paths={foot.stem} tone="hi" crease="faint" />
        </g>
      ))}

      {/* 3. Heavy machined test-bench slab with chamfered bevel */}
      <Solid paths={PLINTH_GEOMETRY.slab} tone="hi" crease="faint" />

      {/* 4. Recessed CNC inner tray channel */}
      <Line d={PLINTH_GEOMETRY.groove} tone="faint" />

      {/* 5. Four corner countersunk hex mounting bolts */}
      <Line d={PLINTH_GEOMETRY.screwRings} tone="mid" />
      {PLINTH_GEOMETRY.screws.map(([x, y], index) => (
        <circle key={`screw-${index}`} cx={x} cy={y} r="1.4" fill="var(--anatomy-mid)" />
      ))}

      {/* 6. Front edge laser-etched millimeter scale ticks */}
      <Line d={PLINTH_GEOMETRY.ruler.minor} tone="lo" />
      <Line d={PLINTH_GEOMETRY.ruler.major} tone="hi" />

      {/* 7. Precision laser-etched chassis specification placard */}
      <Solid paths={PLINTH_GEOMETRY.plate} tone="hi" crease="faint" />
      <Line d={PLINTH_GEOMETRY.plateGroove} tone="faint" />
      {PLINTH_GEOMETRY.plateRivets.map(([rx, ry], index) => (
        <circle key={`rivet-${index}`} cx={rx} cy={ry} r="1.1" fill="var(--anatomy-mid)" />
      ))}

      {/* True 3D planar isometric etched placard text */}
      <g transform={plateTransform} style={{ userSelect: "none" }}>
        <text
          x="2"
          y="8"
          fill="var(--anatomy-strong)"
          fontSize="5"
          fontWeight="700"
          fontFamily="var(--font-mono)"
          letterSpacing="0.4"
        >
          KALKI 2898 AD // BUJJI 1:1
        </text>
        <text
          x="2"
          y="16"
          fill="var(--anatomy-text)"
          fontSize="3.8"
          fontFamily="var(--font-mono)"
          letterSpacing="0.2"
        >
          TORQUE: 9,800 Nm &bull; 47 kWh
        </text>
        <text
          x="2"
          y="23"
          fill="var(--anatomy-muted)"
          fontSize="3.2"
          fontFamily="var(--font-mono)"
          letterSpacing="0.2"
        >
          CHASSIS: DUAL-ARM MONOCOQUE
        </text>
      </g>
    </g>
  );
}
