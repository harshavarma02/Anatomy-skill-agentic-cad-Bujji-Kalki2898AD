import { iso, pathOf, type Point3 } from "../../anatomy-kit/iso-kit";
import { P } from "../view";

// 1. Hood Deck Top Surface (sloping forward between the dual 34" front wheels)
const HOOD_PTS: Point3[] = [
  [30, -38, 68],  // windshield base port
  [30, 38, 68],   // windshield base starboard
  [135, 42, 44],  // nose starboard
  [145, 0, 42],   // nose tip
  [135, -42, 44], // nose port
];

// 2. Starboard Flank (Facing camera in foreground)
const SB_FLANK_PTS: Point3[] = [
  [-160, 35, 34], // Tail
  [-150, 48, 54], // Rear cowl
  [-50, 68, 64],  // Mid shoulder rear
  [30, 68, 64],   // Mid shoulder front
  [135, 42, 44],  // Nose starboard
  [135, 42, 22],  // Chin starboard
  [30, 68, 20],   // Rocker front
  [-50, 68, 20],  // Rocker mid
  [-150, 48, 22], // Rocker rear
  [-160, 35, 24], // Tail bottom
];

// 3. Port Flank (Far side framing the vehicle)
const PORT_FLANK_PTS: Point3[] = [
  [-160, -35, 34],
  [-150, -48, 54],
  [-50, -68, 64],
  [30, -68, 64],
  [135, -42, 44],
  [135, -42, 22],
  [30, -68, 20],
  [-50, -68, 20],
  [-150, -48, 22],
  [-160, -35, 24],
];

// 4. Front Chin Fascia (Vertical grille facing down-right between wheels)
const FRONT_CHIN_PTS: Point3[] = [
  [135, 42, 44],
  [145, 0, 42],
  [135, -42, 44],
  [135, -42, 22],
  [145, 0, 20],
  [135, 42, 22],
];

// 5. Cockpit Canopy Visor (Dark smoke aerodynamic dome)
const VISOR_PTS: Point3[] = [
  [28, -32, 69],
  [28, 32, 69],
  [-25, 26, 88],
  [-70, 0, 74],
  [-25, -26, 88],
];

// 6. Yellow Aerodynamic Side Pod Sponson (Starboard)
const SIDE_POD_PTS: Point3[] = [
  [-120, 78, 26],
  [-110, 80, 52],
  [10, 76, 50],
  [25, 74, 25],
];

export function buildPanelShutlines(): string[] {
  const lineA = pathOf([iso([-50, 68, 64], P), iso([-50, 68, 20], P)]);
  const lineB = pathOf([iso([30, 68, 64], P), iso([30, 68, 20], P)]);
  const lineC = pathOf([iso([-50, 68, 64], P), iso([-50, 0, 78], P)]);
  return [lineA, lineB, lineC];
}

export const HOOD_PATH = pathOf(HOOD_PTS.map((p) => iso(p, P)), true);
export const SB_FLANK_PATH = pathOf(SB_FLANK_PTS.map((p) => iso(p, P)), true);
export const PORT_FLANK_PATH = pathOf(PORT_FLANK_PTS.map((p) => iso(p, P)), true);
export const FRONT_CHIN_PATH = pathOf(FRONT_CHIN_PTS.map((p) => iso(p, P)), true);
export const VISOR_PATH = pathOf(VISOR_PTS.map((p) => iso(p, P)), true);
export const SIDE_POD_PATH = pathOf(SIDE_POD_PTS.map((p) => iso(p, P)), true);
export const PANEL_SHUTLINES = buildPanelShutlines();
export const REAR_SPHERE_CENTER = iso([-150, 0, 30], P);
