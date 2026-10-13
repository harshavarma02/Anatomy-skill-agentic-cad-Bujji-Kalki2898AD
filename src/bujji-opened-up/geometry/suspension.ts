import { iso, pathOf, sideMatrix, type Flat, type Point3 } from "../../anatomy-kit/iso-kit";
import { P } from "../view";

export const PIVOT_CENTER: Point3 = [-20, 80, 58];
export const PIVOT_RADIUS = 16;

export const ARM_Y_OUTER = 88;
export const ARM_Y_INNER = 72;

// Cantilever Arm outer flank profile (Starboard)
const ARM_PROFILE_OUTER: Point3[] = [
  [-20, ARM_Y_OUTER, 68], // Top rear at pivot
  [45, ARM_Y_OUTER, 64],  // Top mid
  [115, ARM_Y_OUTER, 58], // Top front at wheel hub
  [115, ARM_Y_OUTER, 44], // Bottom front
  [45, ARM_Y_OUTER, 46],  // Bottom mid
  [-20, ARM_Y_OUTER, 48], // Bottom rear
];

const ARM_PROFILE_INNER: Point3[] = [
  [-20, ARM_Y_INNER, 68],
  [45, ARM_Y_INNER, 64],
  [115, ARM_Y_INNER, 58],
];

// Port side arm profile (visible across vehicle)
const PORT_ARM_OUTER: Point3[] = [
  [-20, -78, 68],
  [45, -84, 64],
  [115, -96, 58],
  [115, -96, 44],
  [45, -84, 46],
  [-20, -78, 48],
];

export function buildArmOuterPath(): string {
  return pathOf(ARM_PROFILE_OUTER.map((pt) => iso(pt, P)), true);
}

export function buildArmTopPath(): string {
  const outerTop = [ARM_PROFILE_OUTER[0], ARM_PROFILE_OUTER[1], ARM_PROFILE_OUTER[2]].map((pt) => iso(pt, P));
  const innerTop = [ARM_PROFILE_INNER[2], ARM_PROFILE_INNER[1], ARM_PROFILE_INNER[0]].map((pt) => iso(pt, P));
  return pathOf([...outerTop, ...innerTop], true);
}

export function buildPortArmPath(): string {
  return pathOf(PORT_ARM_OUTER.map((pt) => iso(pt, P)), true);
}

// Lightening cutouts along starboard arm
export function buildLighteningCutouts(): string[] {
  const cut1: Point3[] = [
    [-5, ARM_Y_OUTER, 63],
    [35, ARM_Y_OUTER, 60],
    [32, ARM_Y_OUTER, 50],
    [-8, ARM_Y_OUTER, 53],
  ];
  const cut2: Point3[] = [
    [52, ARM_Y_OUTER, 58],
    [98, ARM_Y_OUTER, 55],
    [95, ARM_Y_OUTER, 47],
    [50, ARM_Y_OUTER, 50],
  ];
  return [pathOf(cut1.map((p) => iso(p, P)), true), pathOf(cut2.map((p) => iso(p, P)), true)];
}

// Pivot Hinge 8-bolt circle
export function buildPivotBolts(): Flat[] {
  const bolts: Flat[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const pt: Point3 = [
      PIVOT_CENTER[0] + 10 * Math.cos(a),
      PIVOT_CENTER[1],
      PIVOT_CENTER[2] + 10 * Math.sin(a),
    ];
    bolts.push(iso(pt, P));
  }
  return bolts;
}

// Hydraulic Actuator endpoints
export const RAM_GEOMETRY = {
  barrelStart: iso([5, 74, 48], P),
  barrelEnd: iso([70, 80, 48], P),
  pistonEnd: iso([108, 88, 48], P),
  mountRear: iso([0, 72, 48], P),
  mountFront: iso([112, 90, 48], P),
};

export const ARM_OUTER_PATH = buildArmOuterPath();
export const ARM_TOP_PATH = buildArmTopPath();
export const PORT_ARM_PATH = buildPortArmPath();
export const ARM_CUTOUTS = buildLighteningCutouts();
export const PIVOT_BOLTS = buildPivotBolts();
export const PIVOT_TRANSFORM = sideMatrix([PIVOT_CENTER[0], PIVOT_CENTER[1]], PIVOT_CENTER[2], P, "left");
