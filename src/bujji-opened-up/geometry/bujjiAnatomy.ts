import {
  iso,
  pathOf,
  sideMatrix,
  type Flat,
  type Point3,
} from "../../anatomy-kit/iso-kit";
import { P, at } from "../view";

// -------------------------------------------------------------
// 1. VEHICLE LANDMARKS & HUBS (CAD Ground Truth)
// -------------------------------------------------------------
export const WHEEL_SB_CENTER: Point3 = [155, 68, 32];
export const WHEEL_PORT_CENTER: Point3 = [155, -68, 32];
export const REAR_SPHERE_CENTER: Point3 = [-205, 0, 32];

export const TIRE_R = 32;
export const RIM_R = 23;
export const BORE_R = 14;
export const TIRE_HALF_W = 11;
export const SPHERE_R = 26;

// -------------------------------------------------------------
// 2. HORIZONTAL CYLINDRICAL TIRE BARRELS (Clean, seamless quads)
// -------------------------------------------------------------
export function buildTreadBarrel(center: Point3, halfW: number, isPort = false) {
  const yInner = isPort ? center[1] + halfW : center[1] - halfW;
  const yOuter = isPort ? center[1] - halfW : center[1] + halfW;
  
  // Exact isometric tangent angles for az 42, el 30
  const theta0 = -52.1 * (Math.PI / 180);
  const steps = 16;
  const ptsBack: Flat[] = [];
  const ptsFront: Flat[] = [];

  for (let i = 0; i <= steps; i++) {
    const th = theta0 + (i / steps) * Math.PI;
    const x = center[0] + TIRE_R * Math.cos(th);
    const z = center[2] + TIRE_R * Math.sin(th);
    ptsBack.push(iso([x, isPort ? yOuter : yInner, z], P));
    ptsFront.push(iso([x, isPort ? yInner : yOuter, z], P));
  }

  const topBack = ptsBack.slice(4, 12);
  const topFront = ptsFront.slice(4, 12);

  return {
    barrel: pathOf([...ptsBack, ...ptsFront.reverse()], true),
    topHighlight: pathOf([...topBack, ...topFront.reverse()], true),
    frontArc: pathOf(ptsFront),
    backArc: pathOf(ptsBack),
  };
}

export function getWheelSideTransform(center: Point3, isPort = false): string {
  const yFace = isPort ? center[1] + TIRE_HALF_W : center[1] + TIRE_HALF_W;
  return sideMatrix([center[0], yFace], center[2], P, "left");
}

// Chevron Lugs for finished 34" wheels
export function buildChevronLugs(count = 18): string[] {
  const lugs: string[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const r0 = 26.5;
    const r1 = 31.8;
    const w = 1.3;
    const p1 = `${(r0 * cos - w * sin).toFixed(1)},${(r0 * sin + w * cos).toFixed(1)}`;
    const p2 = `${(r1 * cos - (w * 0.4) * sin).toFixed(1)},${(r1 * sin + (w * 0.4) * cos).toFixed(1)}`;
    const p3 = `${(r1 * cos + (w * 0.4) * sin).toFixed(1)},${(r1 * sin - (w * 0.4) * cos).toFixed(1)}`;
    const p4 = `${(r0 * cos + w * sin).toFixed(1)},${(r0 * sin + w * cos).toFixed(1)}`;
    lugs.push(`M${p1}L${p2}L${p3}L${p4}Z`);
  }
  return lugs;
}

// Stator Coils for unwrapped motor
export function buildStatorCoils(count = 16) {
  const coils: { angle: number; d: string }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 360;
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const r0 = 15;
    const r1 = 21.5;
    const w = 1.4;
    const p1 = `${(r0 * cos - w * sin).toFixed(1)},${(r0 * sin - w * cos).toFixed(1)}`;
    const p2 = `${(r1 * cos - w * sin).toFixed(1)},${(r1 * sin + w * cos).toFixed(1)}`;
    const p3 = `${(r1 * cos + w * sin).toFixed(1)},${(r1 * sin + w * cos).toFixed(1)}`;
    const p4 = `${(r0 * cos + w * sin).toFixed(1)},${(r0 * sin - w * cos).toFixed(1)}`;
    coils.push({ angle, d: `M${p1}L${p2}L${p3}L${p4}Z` });
  }
  return coils;
}

// Planetary Ring Gear for unwrapped drive
export function buildGearRing(r = 15, count = 24): string {
  const pts: string[] = [];
  for (let i = 0; i < count; i++) {
    const a0 = (i / count) * Math.PI * 2;
    const a1 = ((i + 0.5) / count) * Math.PI * 2;
    const rIn = r - 1.1;
    const rOut = r + 1.1;
    pts.push(
      `M${(rIn * Math.cos(a0)).toFixed(1)} ${(rIn * Math.sin(a0)).toFixed(1)} ` +
      `L${(rOut * Math.cos(a0)).toFixed(1)} ${(rOut * Math.sin(a0)).toFixed(1)} ` +
      `L${(rOut * Math.cos(a1)).toFixed(1)} ${(rOut * Math.sin(a1)).toFixed(1)} ` +
      `L${(rIn * Math.cos(a1)).toFixed(1)} ${(rIn * Math.sin(a1)).toFixed(1)}Z`
    );
  }
  return pts.join(" ");
}

// -------------------------------------------------------------
// 3. MONOCOQUE HULL BODIES (Crafted Directional Solids)
// -------------------------------------------------------------

// Sloping Nose / Hood Deck (Between the two outriggers)
export const NOSE_TOP_PTS: Point3[] = [
  [45, -34, 48],
  [45, 34, 48],
  [125, 34, 28],
  [140, 0, 24],
  [125, -34, 28],
];

// Front Chin Fascia (Vertical grille at nose tip)
export const FRONT_CHIN_PTS: Point3[] = [
  [125, 34, 28],
  [140, 0, 24],
  [125, -34, 28],
  [125, -34, 14],
  [140, 0, 12],
  [125, 34, 14],
];

// Muscular Starboard Shoulder Flank (Foreground)
export const SB_SHOULDER_PTS: Point3[] = [
  [-170, 36, 42],
  [-150, 48, 54],
  [-60, 66, 56],
  [30, 64, 50],
  [125, 34, 28],
  [125, 34, 16],
  [30, 56, 16],
  [-60, 56, 16],
  [-150, 40, 18],
  [-170, 34, 20],
];

// Muscular Port Shoulder Flank (Background)
export const PORT_SHOULDER_PTS: Point3[] = [
  [-170, -36, 42],
  [-150, -48, 54],
  [-60, -66, 56],
  [30, -64, 50],
  [125, -34, 28],
  [125, -34, 16],
  [30, -56, 16],
  [-60, -56, 16],
  [-150, -40, 18],
  [-170, -34, 20],
];

// Smooth Teardrop Canopy Visor (Dark Smoke Glass Bubble)
export const CANOPY_PTS: Point3[] = [
  [45, -26, 49],
  [45, 26, 49],
  [15, 28, 66],
  [-25, 26, 68],
  [-65, 0, 56],
  [-25, -26, 68],
  [15, -28, 66],
];

// Aerodynamic Canopy Rim Frame (Blue/Cyan Ring)
export const CANOPY_RIM_PTS: Point3[] = [
  [43, -24, 49],
  [43, 24, 49],
  [15, 26, 65],
  [-23, 24, 67],
  [-62, 0, 56],
  [-23, -24, 67],
  [15, -26, 65],
];

// Rear Cowl & Engine Deck (Behind canopy)
export const REAR_COWL_PTS: Point3[] = [
  [-65, 0, 56],
  [-55, 38, 54],
  [-150, 36, 50],
  [-170, 0, 46],
  [-150, -36, 50],
  [-55, -38, 54],
];

// Mid-Deck Shoulder Surfaces (Bridging canopy rim to outer shoulder flank)
export const MID_DECK_STARBOARD_PTS: Point3[] = [
  [-65, 0, 56],
  [-55, 38, 54],
  [-60, 66, 56],
  [30, 64, 50],
  [45, 34, 48],
  [45, 26, 49],
  [15, 28, 66],
  [-25, 26, 68],
  [-65, 0, 56],
];

export const MID_DECK_PORT_PTS: Point3[] = [
  [-65, 0, 56],
  [-55, -38, 54],
  [-60, -66, 56],
  [30, -64, 50],
  [45, -34, 48],
  [45, -26, 49],
  [15, -28, 66],
  [-25, -26, 68],
  [-65, 0, 56],
];

// Dark Cockpit Interior Basin (Underneath canopy dome)
export const COCKPIT_BASIN_PTS: Point3[] = [
  [45, -26, 36],
  [45, 26, 36],
  [15, 28, 42],
  [-25, 26, 44],
  [-65, 0, 38],
  [-25, -26, 44],
  [15, -28, 42],
];

// Starboard Aerodynamic Yellow Sponson Pod (Extended to Z=12 waterline for zero-gap closure)
export const YELLOW_POD_PTS: Point3[] = [
  [-120, 62, 12],
  [-110, 64, 44],
  [10, 62, 42],
  [25, 60, 12],
];

// Dark Underbody Chassis Rocker Flange (Ground belly return under yellow sponson)
export const SB_ROCKER_UNDERBODY_PTS: Point3[] = [
  [-120, 62, 12],
  [25, 60, 12],
  [25, 48, 10],
  [-120, 48, 10],
];

// Starboard Rear Quarter Deck Shelf (Watertight closure between rear cowl and outer fin)
export const REAR_QUARTER_SB_PTS: Point3[] = [
  [-60, 66, 56],
  [-55, 38, 54],
  [-150, 36, 50],
  [-170, 0, 46],
  [-170, 36, 42],
  [-150, 48, 54],
];

// Port Rear Quarter Deck Shelf (Watertight closure between rear cowl and port outer fin)
export const REAR_QUARTER_PORT_PTS: Point3[] = [
  [-60, -66, 56],
  [-150, -48, 54],
  [-170, -36, 42],
  [-170, 0, 46],
  [-150, -36, 50],
  [-55, -38, 54],
];

// Front Shoulder Sponson Transition Decks (Closes triangular skylight between nose and outer shoulder)
export const FRONT_TRANSITION_SB_PTS: Point3[] = [
  [30, 64, 50],
  [45, 34, 48],
  [125, 34, 28],
];

export const FRONT_TRANSITION_PORT_PTS: Point3[] = [
  [30, -64, 50],
  [45, -34, 48],
  [125, -34, 28],
];

// Cantilever Outrigger Nacelle Sponsons (Heavy box girders)
export const SB_NACELLE_PTS: Point3[] = [
  [35, 42, 22],
  [135, 54, 30],
  [155, 57, 32],
  [155, 68, 32],
  [135, 72, 20],
  [35, 52, 16],
];

export const PORT_NACELLE_PTS: Point3[] = [
  [35, -42, 22],
  [135, -54, 30],
  [155, -57, 32],
  [155, -68, 32],
  [135, -72, 20],
  [35, -52, 16],
];

// Hydraulic Actuator Rams (Chrome Rams)
export const HYDRAULIC_RAM_SB = {
  mountA: [30, 46, 26] as Point3,
  mountB: [125, 58, 32] as Point3,
  rodStart: [75, 52, 29] as Point3,
  rodEnd: [125, 58, 32] as Point3,
};

export const HYDRAULIC_RAM_PORT = {
  mountA: [30, -46, 26] as Point3,
  mountB: [125, -58, 32] as Point3,
  rodStart: [75, -52, 29] as Point3,
  rodEnd: [125, -58, 32] as Point3,
};

// Rear Omni-Drive Cradle Fork
export const REAR_CRADLE_FORK: Point3[] = [
  [-160, -28, 26],
  [-195, -32, 32],
  [-215, 0, 32],
  [-195, 32, 32],
  [-160, 28, 26],
];

// -------------------------------------------------------------
// 4. UNWRAPPED INTERNAL POWERTRAIN & SPACEFRAME
// -------------------------------------------------------------

// Spaceframe Titanium Tub
export const TUB_FLOOR_PTS: Point3[] = [
  [-160, -38, 14],
  [-160, 38, 14],
  [65, 38, 14],
  [65, -38, 14],
];

// 6 Modular High-Capacity 47 kWh Battery Packs (Packaged along central/rear chassis spine)
export function getBatteryCellPlans() {
  const cells: { x: number; y: number; w: number; d: number }[] = [];
  const xs = [-125, -90, -55];
  const ys = [-24, 4];
  for (const x of xs) {
    for (const y of ys) {
      cells.push({ x, y, w: 31, d: 20 });
    }
  }
  return cells;
}

// Cockpit Roll Cage Struts (Enclosing pilot capsule and seat)
export const ROLL_CAGE_STRUTS: [Point3, Point3][] = [
  [[-35, -24, 20], [-25, -20, 58]],
  [[-35, 24, 20], [-25, 20, 58]],
  [[25, -24, 20], [12, -20, 58]],
  [[25, 24, 20], [12, 20, 58]],
  [[-25, -20, 58], [12, -20, 58]],
  [[-25, 20, 58], [12, 20, 58]],
  [[-25, -20, 58], [-25, 20, 58]],
  [[12, -20, 58], [12, 20, 58]],
  // Diagonal Torsional Brace
  [[-25, -20, 58], [12, 20, 58]],
];

// Pre-projected SVG Paths
export const NOSE_TOP_PATH = pathOf(NOSE_TOP_PTS.map((p) => at(p)), true);
export const FRONT_CHIN_PATH = pathOf(FRONT_CHIN_PTS.map((p) => at(p)), true);
export const SB_SHOULDER_PATH = pathOf(SB_SHOULDER_PTS.map((p) => at(p)), true);
export const PORT_SHOULDER_PATH = pathOf(PORT_SHOULDER_PTS.map((p) => at(p)), true);
export const CANOPY_PATH = pathOf(CANOPY_PTS.map((p) => at(p)), true);
export const CANOPY_RIM_PATH = pathOf(CANOPY_RIM_PTS.map((p) => at(p)), true);
export const COCKPIT_BASIN_PATH = pathOf(COCKPIT_BASIN_PTS.map((p) => at(p)), true);
export const REAR_COWL_PATH = pathOf(REAR_COWL_PTS.map((p) => at(p)), true);
export const REAR_QUARTER_SB_PATH = pathOf(REAR_QUARTER_SB_PTS.map((p) => at(p)), true);
export const REAR_QUARTER_PORT_PATH = pathOf(REAR_QUARTER_PORT_PTS.map((p) => at(p)), true);
export const FRONT_TRANSITION_SB_PATH = pathOf(FRONT_TRANSITION_SB_PTS.map((p) => at(p)), true);
export const FRONT_TRANSITION_PORT_PATH = pathOf(FRONT_TRANSITION_PORT_PTS.map((p) => at(p)), true);
export const SB_ROCKER_UNDERBODY_PATH = pathOf(SB_ROCKER_UNDERBODY_PTS.map((p) => at(p)), true);
export const MID_DECK_SB_PATH = pathOf(MID_DECK_STARBOARD_PTS.map((p) => at(p)), true);
export const MID_DECK_PORT_PATH = pathOf(MID_DECK_PORT_PTS.map((p) => at(p)), true);
export const YELLOW_POD_PATH = pathOf(YELLOW_POD_PTS.map((p) => at(p)), true);
export const TUB_FLOOR_PATH = pathOf(TUB_FLOOR_PTS.map((p) => at(p)), true);
export const SB_NACELLE_PATH = pathOf(SB_NACELLE_PTS.map((p) => at(p)), true);
export const PORT_NACELLE_PATH = pathOf(PORT_NACELLE_PTS.map((p) => at(p)), true);
export const REAR_CRADLE_PATH = pathOf(REAR_CRADLE_FORK.map((p) => at(p)), true);

export const CHEVRON_LUGS = buildChevronLugs();
export const STATOR_COILS = buildStatorCoils();
export const GEAR_RING_TEETH = buildGearRing();
