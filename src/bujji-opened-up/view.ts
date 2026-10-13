import { iso, type Flat, type Point3, type Projection, type Plan } from "../anatomy-kit/iso-kit";

// Framing dimensions calibrated for 16:9 social media showcase (Twitter/X & LinkedIn)
export const WIDTH = 1000;
export const HEIGHT = 580;
export const PAD = 44;
export const AZIMUTH = 42;
export const ELEVATION = 30;

// Signature architectural grayish-white palette & Bujji movie-accurate livery
export const PALETTE = {
  // Studio base
  bg: "#f4f5f7",
  card: "#ffffff",
  border: "#d5dae1",
  textStrong: "#0f172a",
  textMuted: "#64748b",
  plinthTop: "#e9edf2",
  plinthBevel: "#dde2e8",
  plinthSide: "#cfd5dc",

  // Bujji exterior (painted automotive hull)
  orangeHi: "#ff7d3b",
  orangeMid: "#f26419",
  orangeLo: "#c74e0d",
  orangeDark: "#853100",

  // Cantilever suspension arm & hazard graphics
  yellowHi: "#ffd633",
  yellowMid: "#f5bf00",
  yellowLo: "#c29500",

  // Electrical powertrain (47 kWh solid-state spine & electron conduits)
  cyanGlow: "#06b6d4",
  cyanBright: "#22d3ee",
  cyanCore: "#a5f3fc",

  // Mechanical running gear
  tireDark: "#26292e",
  tireMid: "#40444c",
  tireLugs: "#1b1d22",
  chrome: "#f8fafc",
  steel: "#94a3b8",
  darkSteel: "#334155",
  copperCoil: "#d97706",
};

// Calibrated bounding points from version 3.2 v1.obj CAD bodies:
// Hull (Body22): 804.3 x 436.4 x 237.6
// Plinth footprint: X: -380 to +520, Y: -180 to +180, Z: -20 to 180
const BOUNDING_CORNERS: Point3[] = [
  [-210, -160, -17],
  [190, -160, -17],
  [-210, 160, -17],
  [190, 160, -17],
  [120, 115, 52],
  [120, -115, 52],
  [0, 0, 95],
  [150, 0, 42],
  [-170, 0, 52],
];

function fitProjection(points: Point3[]): Projection {
  const unit: Projection = { origin: [0, 0], scale: 1, azimuth: AZIMUTH, elevation: ELEVATION };
  const flat = points.map((pt) => iso(pt, unit));
  const xs = flat.map(([x]) => x);
  const ys = flat.map(([, y]) => y);
  const left = Math.min(...xs);
  const right = Math.max(...xs);
  const up = Math.min(...ys);
  const down = Math.max(...ys);
  const scale = Math.min((WIDTH - PAD * 2) / (right - left), (HEIGHT - PAD * 2) / (down - up));
  return {
    origin: [WIDTH / 2 - ((left + right) / 2) * scale, HEIGHT / 2 - ((up + down) / 2) * scale + 15],
    scale,
    azimuth: AZIMUTH,
    elevation: ELEVATION,
  };
}

export const P: Projection = fitProjection(BOUNDING_CORNERS);

export const at = (point: Point3): Flat => iso(point, P);

const ORIGIN = at([0, 0, 0]);
const minus = (a: Flat, b: Flat): Flat => [a[0] - b[0], a[1] - b[1]];

export const EX: Flat = minus(at([1, 0, 0]), ORIGIN);
export const EY: Flat = minus(at([0, 1, 0]), ORIGIN);
export const EZ: Flat = minus(at([0, 0, 1]), ORIGIN);

const round2 = (n: number) => Math.round(n * 100) / 100;
export const shift = (x: number, y = 0, z = 0) =>
  `translate(${round2(EX[0] * x + EY[0] * y + EZ[0] * z)} ${round2(EX[1] * x + EY[1] * y + EZ[1] * z)})`;
