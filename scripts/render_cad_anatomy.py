import os
import sys
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.collections import PolyCollection, LineCollection

CAD_PATH = r"bujji cad model-20261013T043927Z-1-001\bujji cad model\version 3.2 v1.obj"

print("Reading OBJ file...")
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

V = np.array(vertices, dtype=np.float32)

az = 42 * np.pi / 180
el = 30 * np.pi / 180

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
    depth = (x * cosA + y * sinA) * cosE + z * sinE
    return np.stack([px, py], axis=-1), depth

V2D, Depth = project(V)

# Let's render 3 targeted images:
# 1. Exterior Road-Ready (Body22 Hull + Body19/20 Wheels + Body24/25 Visor + Body21 Rear Wheel)
# 2. Interior Powertrain (Body1/2 Arms + Body13-16 Rams + Chassis Framework + Body19/20 Hub Motors)
# 3. Clean Vector Silhouette / Technical Drawing

def render_scene(filename, included_bodies, title, color_fn):
    fig, ax = plt.subplots(figsize=(14, 9), dpi=180)
    fig.patch.set_facecolor('#f4f5f7')
    ax.set_facecolor('#f4f5f7')
    
    faces_to_render = []
    for name in included_bodies:
        if name not in groups: continue
        fc, ec, alpha = color_fn(name)
        for f in groups[name]:
            if len(f) < 3: continue
            d = Depth[f].mean()
            faces_to_render.append((d, f, fc, ec, alpha))
            
    faces_to_render.sort(key=lambda x: x[0])
    
    polys = [V2D[f] for _, f, _, _, _ in faces_to_render]
    fcs = [fc for _, _, fc, _, _ in faces_to_render]
    ecs = [ec for _, _, _, ec, _ in faces_to_render]
    
    coll = PolyCollection(polys, facecolors=fcs, edgecolors=ecs, linewidths=0.25)
    ax.add_collection(coll)
    
    # Auto scale to vehicle
    all_v = V2D[[f[0] for _, f, _, _, _ in faces_to_render[::10]]]
    min_xy = all_v.min(axis=0)
    max_xy = all_v.max(axis=0)
    pad = (max_xy - min_xy) * 0.08
    ax.set_xlim(min_xy[0] - pad[0], max_xy[0] + pad[0])
    ax.set_ylim(min_xy[1] - pad[1], max_xy[1] + pad[1])
    ax.set_aspect('equal')
    ax.axis('off')
    
    plt.title(title, fontsize=12, fontfamily="monospace", color="#0f172a")
    plt.tight_layout()
    plt.savefig(filename, facecolor='#f4f5f7')
    plt.close()
    print(f"Saved: {filename}")

# Exterior color function
def exterior_colors(name):
    if name == "Body22":
        return "#f26419", "#9a3412", 0.95 # Automotive Orange Hull
    elif name in ["Body19", "Body20"]:
        return "#26292e", "#0f172a", 1.0 # 34-inch front wheels
    elif name == "Body21":
        return "#1e2229", "#0f172a", 1.0 # Rear omni wheel
    elif name in ["Body24", "Body25"]:
        return "#0284c7", "#0369a1", 0.75 # Tinted visor
    elif name in ["Body1", "Body2"]:
        return "#f5bf00", "#ca8a04", 0.95 # Yellow suspension arms
    else:
        return "#94a3b8", "#475569", 0.8

# Interior mechanics color function
def interior_colors(name):
    if name in ["Body1", "Body2"]:
        return "#f5bf00", "#ca8a04", 1.0 # Yellow arms
    elif name in ["Body13", "Body14", "Body15", "Body16"]:
        return "#f8fafc", "#94a3b8", 1.0 # Chrome hydraulic rams
    elif name in ["Body19", "Body20"]:
        return "#334155", "#1e293b", 0.6 # Wheel hub carriers
    elif name in ["Body23", "Body26", "Body27"]:
        return "#06b6d4", "#0891b2", 0.9 # Power units / electronics
    else:
        return "#cbd5e1", "#64748b", 0.4

print("Rendering Exterior CAD at Azimuth 42°, Elevation 30°...")
render_scene("cad_exterior_iso.png", ["Body22", "Body19", "Body20", "Body21", "Body24", "Body25", "Body1", "Body2"], "Bujji CAD - Exterior Shell at Webpage Isometric Angle (Azimuth 42°, Elevation 30°)", exterior_colors)

print("Rendering Mechanics CAD at Azimuth 42°, Elevation 30°...")
render_scene("cad_mechanics_iso.png", ["Body1", "Body2", "Body13", "Body14", "Body15", "Body16", "Body19", "Body20", "Body21", "Body23", "Body26", "Body27"], "Bujji CAD - Internal Mechanics at Webpage Isometric Angle (Azimuth 42°, Elevation 30°)", interior_colors)

print("All CAD renders finished successfully.")
