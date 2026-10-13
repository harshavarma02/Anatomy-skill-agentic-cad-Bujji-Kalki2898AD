import {
  circleRing,
  extrude,
  insetPlan,
  onTop,
  pathOf,
  planOutline,
  slabOf,
  type Plan,
  type Plane,
  type Point3,
  type SolidPaths,
} from "../../anatomy-kit/iso-kit";
import { P, at } from "../view";

export const BASE_PLAN: Plan = { x: -210, y: -160, w: 400, d: 320, r: 16 };
export const BASE_H = 12;
export const FOOT_H = 5;

const solid = (plan: Plan, z: number, h: number, steps = 8, bevel = 0): SolidPaths =>
  slabOf(plan, z, h, P, steps, bevel);

const cylinder = (cx: number, cy: number, r: number, z: number, h: number, steps = 24): SolidPaths =>
  extrude(circleRing(cx, cy, r, steps), z, h, P, { convex: true });

const ring = (cx: number, cy: number, r: number, z: number, steps = 20): string =>
  onTop(circleRing(cx, cy, r, steps), z, P, true);

const segment = (a: Point3, b: Point3): string => pathOf([at(a), at(b)]);

const FEET_POSITIONS: Plane[] = [
  [BASE_PLAN.x + 24, BASE_PLAN.y + 24],
  [BASE_PLAN.x + BASE_PLAN.w - 24, BASE_PLAN.y + 24],
  [BASE_PLAN.x + 24, BASE_PLAN.y + BASE_PLAN.d - 24],
  [BASE_PLAN.x + BASE_PLAN.w - 24, BASE_PLAN.y + BASE_PLAN.d - 24],
];

const SCREW_POSITIONS: Plane[] = [
  [BASE_PLAN.x + 14, BASE_PLAN.y + 14],
  [BASE_PLAN.x + BASE_PLAN.w - 14, BASE_PLAN.y + 14],
  [BASE_PLAN.x + 14, BASE_PLAN.y + BASE_PLAN.d - 14],
  [BASE_PLAN.x + BASE_PLAN.w - 14, BASE_PLAN.y + BASE_PLAN.d - 14],
];

function buildRulerTicks() {
  const minor: string[] = [];
  const major: string[] = [];
  const edgeY = BASE_PLAN.y + BASE_PLAN.d; // front-facing bevel edge
  const xStart = BASE_PLAN.x + 30;
  const xEnd = BASE_PLAN.x + BASE_PLAN.w - 30;

  for (let x = xStart; x <= xEnd; x += 10) {
    const isMajor = (x - xStart) % 40 === 0;
    const len = isMajor ? 4.5 : 2.5;
    (isMajor ? major : minor).push(segment([x, edgeY, -1], [x, edgeY, -1 - len]));
  }
  return { minor: minor.join(""), major: major.join("") };
}

const RULER = buildRulerTicks();

export const SPEC_PLATE_PLAN: Plan = {
  x: BASE_PLAN.x + 24,
  y: BASE_PLAN.y + BASE_PLAN.d - 54,
  w: 96,
  d: 38,
  r: 3,
};

export const PLINTH_GEOMETRY = {
  halo: solid(BASE_PLAN, -BASE_H - FOOT_H, BASE_H).fill,
  feet: FEET_POSITIONS.map(([x, y]) => ({
    pad: cylinder(x, y, 9, -BASE_H - FOOT_H, 2),
    stem: cylinder(x, y, 6, -BASE_H - FOOT_H + 2, FOOT_H - 2),
  })),
  slab: solid(BASE_PLAN, -BASE_H, BASE_H, 8, 2),
  groove: planOutline(insetPlan(BASE_PLAN, 7), 0, P),
  screws: SCREW_POSITIONS.map(([x, y]) => at([x, y, 0])),
  screwRings: SCREW_POSITIONS.map(([x, y]) => ring(x, y, 2.8, 0)).join(""),
  ruler: RULER,
  plate: solid(SPEC_PLATE_PLAN, 0, 0.8, 4),
  plateGroove: planOutline(insetPlan(SPEC_PLATE_PLAN, 2), 0.8, P),
  plateRivets: [
    at([SPEC_PLATE_PLAN.x + 4, SPEC_PLATE_PLAN.y + 4, 0.8]),
    at([SPEC_PLATE_PLAN.x + SPEC_PLATE_PLAN.w - 4, SPEC_PLATE_PLAN.y + 4, 0.8]),
    at([SPEC_PLATE_PLAN.x + 4, SPEC_PLATE_PLAN.y + SPEC_PLATE_PLAN.d - 4, 0.8]),
    at([SPEC_PLATE_PLAN.x + SPEC_PLATE_PLAN.w - 4, SPEC_PLATE_PLAN.y + SPEC_PLATE_PLAN.d - 4, 0.8]),
  ],
};
