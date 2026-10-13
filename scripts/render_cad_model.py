import os
import sys
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.collections import PolyCollection, LineCollection

CAD_PATH = r"bujji cad model-20261013T043927Z-1-001\bujji cad model\version 3.2 v1.obj"

print("Reading OBJ groups and vertices...")
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
print(f"Total vertices: {len(V)}")
print(f"Total groups: {len(groups)}")

# Camera projection matching our web page:
# Azimuth: 42 deg, Elevation: 30 deg
# In OBJ: Y is vertical, X is longitudinal, Z is lateral
# Let's map CAD (X, Z, Y) -> (x, y, z)
# or directly project 3D CAD point:
# In iso-kit:
# radA = 42 * pi / 180, radE = 30 * pi / 180
# px = origin[0] + (x * sinA - y * cosA) * k
# py = origin[1] + ((x * cosA + y * sinA) * sinE - z * cosE) * k

az = 42 * np.pi / 180
el = 30 * np.pi / 180

def project(points_cad):
    # points_cad is (N, 3): [X_cad, Y_cad, Z_cad]
    # In CAD:
    # X_cad is longitudinal (front is negative -300, rear is +480)
    # Let's invert X so front is forward in our view: x = -X_cad
    # y = Z_cad (lateral)
    # z = Y_cad (vertical up)
    x = -points_cad[:, 0]
    y = points_cad[:, 2]
    z = points_cad[:, 1]
    
    sinA = np.sin(az)
    cosA = np.cos(az)
    sinE = np.sin(el)
    cosE = np.cos(el)
    
    px = (x * sinA - y * cosA)
    py = -((x * cosA + y * sinA) * sinE - z * cosE) # invert py for standard image coords (up is positive)
    return np.stack([px, py], axis=-1), (x * cosA + y * sinA) * cosE + z * sinE # return (2d, depth)

# Project all vertices
V2D, Depth = project(V)

# Color map for key bodies:
# Body1, Body2: Yellow suspension arms
# Body19, Body20: Front 34" wheels
# Body21: Rear omni wheel
# Body22: Main chassis hull
# Body24, Body25: Visor
# Body13-16: Rams
def get_body_color(name):
    if name in ["Body1", "Body2"]:
        return "#f5bf00", "#ca8a04", 0.9 # yellow arm
    elif name in ["Body19", "Body20"]:
        return "#334155", "#0f172a", 0.95 # front wheels
    elif name == "Body21":
        return "#1e293b", "#0f172a", 0.9 # rear omni wheel
    elif name == "Body22":
        return "#f26419", "#9a3412", 0.85 # orange hull
    elif name in ["Body24", "Body25"]:
        return "#0284c7", "#0369a1", 0.7 # cyan visor
    elif name in ["Body13", "Body14", "Body15", "Body16"]:
        return "#e2e8f0", "#94a3b8", 0.95 # chrome rams
    else:
        return "#94a3b8", "#64748b", 0.6 # secondary structural parts

# Render isometric multi-body projection
fig, ax = plt.subplots(figsize=(16, 10), dpi=150)
fig.patch.set_facecolor('#f4f5f7')
ax.set_facecolor('#f4f5f7')

# Sort all faces by depth across all groups for painter's algorithm
all_face_records = []
for name, faces in groups.items():
    face_color, edge_color, alpha = get_body_color(name)
    for f in faces:
        if len(f) < 3: continue
        # triangle or quad
        d = Depth[f].mean()
        all_face_records.append((d, name, f, face_color, edge_color, alpha))

# Sort back to front (smaller depth first)
all_face_records.sort(key=lambda item: item[0])

print(f"Rendering {len(all_face_records)} faces with painter's depth...")

# Batch polygons by color for speed
# Draw subsampled faces or line contours
polys = []
face_colors = []
edge_colors = []

# Subsample or draw every face
stride = 1 # all faces!
for d, name, f, fc, ec, alpha in all_face_records[::stride]:
    pts = V2D[f]
    polys.append(pts)
    face_colors.append(fc)
    edge_colors.append(ec)

coll = PolyCollection(polys, facecolors=face_colors, edgecolors=edge_colors, linewidths=0.2, alpha=0.8)
ax.add_collection(coll)

# Auto scale
all_pts = np.vstack([p for p in polys[::20]])
min_xy = all_pts.min(axis=0)
max_xy = all_pts.max(axis=0)
pad = (max_xy - min_xy) * 0.08
ax.set_xlim(min_xy[0] - pad[0], max_xy[0] + pad[0])
ax.set_ylim(min_xy[1] - pad[1], max_xy[1] + pad[1])
ax.set_aspect('equal')
ax.axis('off')

plt.title("Bujji CAD Model (version 3.2 v1.obj) - Exact 3/4 Isometric Projection (Azimuth 42°, Elevation 30°)", fontsize=14, fontfamily="monospace")
plt.tight_layout()
out_png = "cad_projected_iso.png"
plt.savefig(out_png, facecolor='#f4f5f7')
print(f"Saved: {out_png}")
