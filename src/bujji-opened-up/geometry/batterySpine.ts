import { iso, pathOf, slabOf, type Plan, type Point3, type SolidPaths } from "../../anatomy-kit/iso-kit";
import { P } from "../view";

export interface CellModuleGeometry {
  paths: SolidPaths;
  terminalA: Point3;
  terminalB: Point3;
}

export function buildBatteryModules(): CellModuleGeometry[] {
  const modules: CellModuleGeometry[] = [];
  const startX = -130;
  const moduleW = 24;
  const gap = 5;
  const depth = 34;
  const height = 14;
  const z0 = 10;

  for (let i = 0; i < 5; i++) {
    const x = startX + i * (moduleW + gap);
    const plan: Plan = { x, y: -depth / 2, w: moduleW, d: depth, r: 2 };
    modules.push({
      paths: slabOf(plan, z0, height, P, 4, 1.2),
      terminalA: [x + 6, -8, z0 + height],
      terminalB: [x + 6, 8, z0 + height],
    });
  }
  return modules;
}

// Control Brain (Bujji AI Core)
export const BRAIN_PLAN: Plan = { x: -30, y: -18, w: 38, d: 36, r: 3 };
export const BRAIN_Z = 24;
export const BRAIN_H = 16;
export const BRAIN_SOLID = slabOf(BRAIN_PLAN, BRAIN_Z, BRAIN_H, P, 6, 1.2);

export function buildCablePaths(): { power: string; returnBus: string; coolant: string } {
  // Power cable from battery junction box to front starboard hub motor
  const pPts: Point3[] = [
    [20, 14, 20],
    [45, 30, 32],
    [75, 55, 42],
    [112, 88, 48],
  ];
  // Secondary sensory/ground bus
  const rPts: Point3[] = [
    [22, 8, 18],
    [47, 24, 30],
    [77, 49, 40],
    [114, 82, 46],
  ];
  // Cryogenic coolant twin line
  const cPts: Point3[] = [
    [-125, 0, 24],
    [-65, 0, 24],
    [-5, 0, 24],
    [20, 0, 24],
  ];

  return {
    power: pathOf(pPts.map((p) => iso(p, P))),
    returnBus: pathOf(rPts.map((p) => iso(p, P))),
    coolant: pathOf(cPts.map((p) => iso(p, P))),
  };
}

export const CELL_MODULES = buildBatteryModules();
export const CABLE_PATHS = buildCablePaths();
export const BRAIN_CORE_POINT = iso([-11, 0, BRAIN_Z + BRAIN_H], P);
