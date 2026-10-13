import os
import sys
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection

CAD_PATH = r"bujji cad model-20261013T043927Z-1-001\bujji cad model\version 3.2 v1.obj"

print("Reading OBJ...")
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

# Camera vector in CAD space:
# Remember:
# x_iso = -X_cad
# y_iso = Z_cad
# z_iso = Y_cad
# In iso-kit:
# px = (x * sinA - y * cosA) * k
# py = ((x * cosA + y * sinA) * sinE - z * cosE) * k
# Camera ray pointing towards viewer in iso space:
# V_iso = [cosA * cosE, sinA * cosE, sinE]
# In CAD space (X_cad, Y_cad, Z_cad):
# V_cad_X = -V_iso_x = -cosA * cosE
# V_cad_Y = V_iso_z = sinE
# V_cad_Z = V_iso_y = sinA * cosE

V_cad = np.array([-np.cos(az) * np.cos(el), np.sin(el), np.sin(az) * np.cos(el)], dtype=np.float64)
V_cad = V_cad / np.linalg.norm(V_cad)

print(f"Camera direction vector: {V_cad}")

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

# Normalize V2D to canvas 1000 x 580:
min_pt = V2D.min(axis=0)
max_pt = V2D.max(axis=0)
span = max_pt - min_pt
scale = min(880 / span[0], 500 / span[1])
center_2d = (min_pt + max_pt) / 2
target_center = np.array([500.0, 290.0])

V_CANVAS = (V2D - center_2d) * scale + target_center
print(f"Canvas scale: {scale:.3f}, span: {span * scale}")

# Extract silhouette edges for a group
def extract_feature_edges(group_name, crease_deg=35.0):
    if group_name not in groups:
        return []
    faces = groups[group_name]
    
    # triangulate faces
    triangles = []
    for f in faces:
        if len(f) == 3:
            triangles.append(f)
        elif len(f) == 4:
            triangles.append([f[0], f[1], f[2]])
            triangles.append([f[0], f[2], f[3]])
            
    if len(triangles) == 0:
        return []
        
    tris = np.array(triangles, dtype=np.int32)
    
    # compute face normals
    v0 = V[tris[:, 0]]
    v1 = V[tris[:, 1]]
    v2 = V[tris[:, 2]]
    normals = np.cross(v1 - v0, v2 - v0)
    lens = np.linalg.norm(normals, axis=1, keepdims=True)
    lens[lens == 0] = 1.0
    normals = normals / lens
    
    # dot with camera
    dots = np.dot(normals, V_cad)
    
    # build edge to face map
    # canonical edge key: (min(i, j), max(i, j))
    edge_map = {}
    for face_idx, tri in enumerate(tris):
        for e in [(tri[0], tri[1]), (tri[1], tri[2]), (tri[2], tri[0])]:
            key = (min(e[0], e[1]), max(e[0], e[1]))
            if key not in edge_map:
                edge_map[key] = []
            edge_map[key].append(face_idx)
            
    feature_edges = []
    cos_crease = np.cos(crease_deg * np.pi / 180)
    
    for (i, j), flist in edge_map.items():
        if len(flist) == 1:
            # boundary edge
            f0 = flist[0]
            if dots[f0] > 0: # front facing
                feature_edges.append((i, j, "boundary"))
        elif len(flist) == 2:
            f0, f1 = flist[0], flist[1]
            d0, d1 = dots[f0], dots[f1]
            # silhouette edge: one front, one back
            if (d0 > 0 and d1 <= 0) or (d0 <= 0 and d1 > 0):
                feature_edges.append((i, j, "silhouette"))
            # crease edge: both front facing and angle sharp
            elif d0 > 0 and d1 > 0:
                dot_faces = np.dot(normals[f0], normals[f1])
                if dot_faces < cos_crease:
                    feature_edges.append((i, j, "crease"))
                    
    print(f"Group {group_name}: {len(tris)} tris, {len(feature_edges)} feature edges")
    return feature_edges

# Extract feature edges for major groups
major_groups = ["Body22", "Body19", "Body20", "Body21", "Body24", "Body25", "Body1", "Body2", "Body13", "Body14"]
all_edges = {}
for g in major_groups:
    all_edges[g] = extract_feature_edges(g)

# Plot to cad_technical_vector.png
fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
fig.patch.set_facecolor('#f4f5f7')
ax.set_facecolor('#f4f5f7')

colors = {
    "Body22": "#f26419", # Orange monocoque
    "Body19": "#1e293b", # Right wheel
    "Body20": "#1e293b", # Left wheel
    "Body21": "#334155", # Rear omni wheel
    "Body24": "#0284c7", # Visor
    "Body25": "#0284c7", # Visor
    "Body1": "#f5bf00",  # Suspension arm
    "Body2": "#f5bf00",  # Suspension arm
    "Body13": "#cbd5e1", # Hydraulic ram
    "Body14": "#cbd5e1", # Hydraulic ram
}

for g, elist in all_edges.items():
    c = colors.get(g, "#64748b")
    lines = []
    for i, j, kind in elist:
        lines.append([V_CANVAS[i], V_CANVAS[j]])
    if lines:
        lw = 1.0 if g in ["Body22", "Body19", "Body20"] else 0.7
        lc = LineCollection(lines, colors=c, linewidths=lw, alpha=0.9)
        ax.add_collection(lc)

ax.set_xlim(40, 960)
ax.set_ylim(40, 540)
ax.set_aspect('equal')
ax.axis('off')

plt.title("Bujji CAD Decompiled - True Vector Feature Edges at Webpage Isometric Angle", fontsize=14, fontfamily="monospace")
plt.tight_layout()
os.makedirs("assets/cad_renders", exist_ok=True)
out_png = "assets/cad_renders/cad_technical_vector.png"
plt.savefig(out_png, facecolor='#f4f5f7')
print(f"Saved: {out_png}")

