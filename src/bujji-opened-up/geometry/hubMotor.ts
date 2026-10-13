import { iso, pathOf, sideMatrix, type Flat, type Point3 } from "../../anatomy-kit/iso-kit";
import { P } from "../view";

export const WHEEL_STARBOARD_CENTER: Point3 = [120, 115, 52];
export const WHEEL_PORT_CENTER: Point3 = [120, -115, 52];

export const TIRE_RADIUS = 52;
export const RIM_RADIUS = 38;
export const BORE_RADIUS = 25;
export const TIRE_HALF_WIDTH = 18;

export function getWheelTransform(center: Point3, isPort = false): string {
  return sideMatrix([center[0], center[1]], center[2], P, isPort ? "right" : "left");
}

export function buildTreadBarrel(center: Point3, halfWidth: number, isPort = false): string {
  const y0 = center[1] - halfWidth;
  const y1 = center[1] + halfWidth;
  const outer: Flat[] = [];
  const inner: Flat[] = [];
  const steps = 18;

  // Sweep the upper visible silhouette arc
  for (let i = 0; i <= steps; i++) {
    const a = Math.PI * (0.75 + (i / steps) * 1.1);
    const x = center[0] + TIRE_RADIUS * Math.cos(a);
    const z = center[2] + TIRE_RADIUS * Math.sin(a);
    outer.push(iso([x, isPort ? y0 : y1, z], P));
    inner.push(iso([x, isPort ? y1 : y0, z], P));
  }
  return pathOf([...outer, ...inner.reverse()], true);
}

export function buildChevronLugs(count = 18): string[] {
  const lugs: string[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const r0 = 46;
    const r1 = 51.5;
    const w = 1.8;
    const p1 = `${(r0 * cos - w * sin).toFixed(1)},${(r0 * sin + w * cos).toFixed(1)}`;
    const p2 = `${(r1 * cos - (w * 0.5) * sin).toFixed(1)},${(r1 * sin + (w * 0.5) * cos).toFixed(1)}`;
    const p3 = `${(r1 * cos + (w * 0.5) * sin).toFixed(1)},${(r1 * sin - (w * 0.5) * cos).toFixed(1)}`;
    const p4 = `${(r0 * cos + w * sin).toFixed(1)},${(r0 * sin - w * cos).toFixed(1)}`;
    lugs.push(`M${p1}L${p2}L${p3}L${p4}Z`);
  }
  return lugs;
}

export function buildStatorCoils(count = 16) {
  const coils: { angle: number; d: string }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 360;
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const r0 = 26.5;
    const r1 = 35;
    const w = 2.2;
    const p1 = `${(r0 * cos - w * sin).toFixed(1)},${(r0 * sin + w * cos).toFixed(1)}`;
    const p2 = `${(r1 * cos - w * sin).toFixed(1)},${(r1 * sin + w * cos).toFixed(1)}`;
    const p3 = `${(r1 * cos + w * sin).toFixed(1)},${(r1 * sin + w * cos).toFixed(1)}`;
    const p4 = `${(r0 * cos + w * sin).toFixed(1)},${(r0 * sin - w * cos).toFixed(1)}`;
    coils.push({ angle, d: `M${p1}L${p2}L${p3}L${p4}Z` });
  }
  return coils;
}

export function buildGearRing(r = 25.5, count = 28): string {
  const pts: string[] = [];
  for (let i = 0; i < count; i++) {
    const a0 = (i / count) * Math.PI * 2;
    const a1 = ((i + 0.5) / count) * Math.PI * 2;
    const rInner = r - 1.4;
    const rOuter = r + 1.4;
    pts.push(
      `M${(rInner * Math.cos(a0)).toFixed(1)} ${(rInner * Math.sin(a0)).toFixed(1)} ` +
      `L${(rOuter * Math.cos(a0)).toFixed(1)} ${(rOuter * Math.sin(a0)).toFixed(1)} ` +
      `L${(rOuter * Math.cos(a1)).toFixed(1)} ${(rOuter * Math.sin(a1)).toFixed(1)} ` +
      `L${(rInner * Math.cos(a1)).toFixed(1)} ${(rInner * Math.sin(a1)).toFixed(1)}Z`
    );
  }
  return pts.join(" ");
}

export const CHEVRON_LUGS = buildChevronLugs();
export const STATOR_COILS = buildStatorCoils();
export const GEAR_RING_TEETH = buildGearRing();
