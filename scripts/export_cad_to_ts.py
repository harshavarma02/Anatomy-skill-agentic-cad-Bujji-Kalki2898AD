import os
import sys
import numpy as np

CAD_PATH = r"bujji cad model-20261013T043927Z-1-001\bujji cad model\version 3.2 v1.obj"

print("Reading OBJ for TS export...")
vertices = []
groups = {}
current_group = "Body1"

with open(CAD_PATH, "r", encoding="utf-8", errors="ignore") as f:
    for line in f:
        if line.startswith("v "):
            p = line.strip().split()
            vertices.append([float(p[1]), float(p[2]), float(p[3])])
        elif line.startswith("g "):
            current_group = line.strip().split()[1]
            if current_group not in groups:
                groups[current_group] = []
        elif line.startswith("f "):
            if current_group not in groups:
                groups[current_group] = []
            p = line.strip().split()[1:]
            face = [int(x.split("/")[0]) - 1 for x in p]
            groups[current_group].append(face)

V = np.array(vertices, dtype=np.float64)

az = 42 * np.pi / 180
el = 30 * np.pi / 180

V_cad = np.array([-np.cos(az) * np.cos(el), np.sin(el), np.sin(az) * np.cos(el)], dtype=np.float64)
V_cad = V_cad / np.linalg.norm(V_cad)

def project(points_cad):
    x = -points_cad[:, 0]
    y = points_cad[:, 2]
    z = points_cad[:, 1]
    
    sinA = np.sin(az)
    cosA = np.cos(az)
    sinE = np.sin(el)
    cosE = np.cos(el)
    
    px = (x * sinA - y * cosA)
    py = -((x * cosA + y * sinA) * sinE - z * cosE)
    return np.stack([px, py], axis=-1)

V2D = project(V)

# Normalize to canvas 1000 x 580:
min_pt = V2D.min(axis=0)
max_pt = V2D.max(axis=0)
span = max_pt - min_pt
scale = min(820 / span[0], 480 / span[1])
center_2d = (min_pt + max_pt) / 2
target_center = np.array([510.0, 280.0])

V_CANVAS = (V2D - center_2d) * scale + target_center

def extract_silhouette_and_crease(group_name, crease_deg=35.0):
    if group_name not in groups: return []
    faces = groups[group_name]
    triangles = []
    for f in faces:
        if len(f) == 3: triangles.append(f)
        elif len(f) == 4:
            triangles.append([f[0], f[1], f[2]])
            triangles.append([f[0], f[2], f[3]])
    if not triangles: return []
    
    tris = np.array(triangles, dtype=np.int32)
    v0, v1, v2 = V[tris[:, 0]], V[tris[:, 1]], V[tris[:, 2]]
    normals = np.cross(v1 - v0, v2 - v0)
    lens = np.linalg.norm(normals, axis=1, keepdims=True)
    lens[lens == 0] = 1.0
    normals = normals / lens
    dots = np.dot(normals, V_cad)
    
    edge_map = {}
    for face_idx, tri in enumerate(tris):
        for e in [(tri[0], tri[1]), (tri[1], tri[2]), (tri[2], tri[0])]:
            key = (min(e[0], e[1]), max(e[0], e[1]))
            if key not in edge_map: edge_map[key] = []
            edge_map[key].append(face_idx)
            
    edges = []
    cos_c = np.cos(crease_deg * np.pi / 180)
    for (i, j), flist in edge_map.items():
        if len(flist) == 1:
            if dots[flist[0]] > 0: edges.append((i, j))
        elif len(flist) == 2:
            f0, f1 = flist[0], flist[1]
            d0, d1 = dots[f0], dots[f1]
            if (d0 > 0 and d1 <= 0) or (d0 <= 0 and d1 > 0):
                edges.append((i, j))
            elif d0 > 0 and d1 > 0:
                if np.dot(normals[f0], normals[f1]) < cos_c:
                    edges.append((i, j))
    return edges

# We will export SVG path strings for each major body
def edges_to_svg_path(edges, max_edges=6000):
    # Subsample if too dense
    if len(edges) > max_edges:
        step = len(edges) // max_edges + 1
        edges = edges[::step]
    
    parts = []
    for i, j in edges:
        p0 = V_CANVAS[i]
        p1 = V_CANVAS[j]
        parts.append(f"M{p0[0]:.1f} {p0[1]:.1f}L{p1[0]:.1f} {p1[1]:.1f}")
    return "".join(parts)

print("Extracting feature edges for all groups...")
body22_edges = extract_silhouette_and_crease("Body22", 32.0)
body19_edges = extract_silhouette_and_crease("Body19", 35.0)
body20_edges = extract_silhouette_and_crease("Body20", 35.0)
body21_edges = extract_silhouette_and_crease("Body21", 30.0)
body24_edges = extract_silhouette_and_crease("Body24", 25.0) + extract_silhouette_and_crease("Body25", 25.0)
body1_edges = extract_silhouette_and_crease("Body1", 25.0) + extract_silhouette_and_crease("Body2", 25.0)
rams_edges = extract_silhouette_and_crease("Body13", 25.0) + extract_silhouette_and_crease("Body14", 25.0)

print("Generating TypeScript vector constants...")
ts_content = f"""// Decompiled from version 3.2 v1.obj at Azimuth 42°, Elevation 30°
// Exactly matches the real movie vehicle CAD geometry

export const CAD_VECTORS = {{
  // Main Monocoque Fuselage (Body22)
  hullLines: "{edges_to_svg_path(body22_edges, 3500)}",
  
  // Front Right 34" Wheel & Outrigger Nacelle (Body19)
  wheelRightLines: "{edges_to_svg_path(body19_edges, 2500)}",
  
  // Front Left 34" Wheel & Outrigger Nacelle (Body20)
  wheelLeftLines: "{edges_to_svg_path(body20_edges, 2500)}",
  
  // Rear Spherical Omni-Wheel (Body21)
  omniWheelLines: "{edges_to_svg_path(body21_edges, 1500)}",
  
  // Cockpit Visor Dome (Body24 & Body25)
  visorLines: "{edges_to_svg_path(body24_edges, 800)}",
  
  // Cantilever Wishbone Suspension Arms (Body1 & Body2)
  suspensionLines: "{edges_to_svg_path(body1_edges, 800)}",
  
  // Hydraulic Actuators (Body13 & Body14)
  hydraulicLines: "{edges_to_svg_path(rams_edges, 400)}",
}};
"""

out_ts = r"src\bujji-opened-up\geometry\cadVectors.ts"
with open(out_ts, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Saved: {out_ts} ({len(ts_content)} bytes)")
