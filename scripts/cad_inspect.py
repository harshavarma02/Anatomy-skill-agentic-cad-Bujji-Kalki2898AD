import os
import sys
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection, PolyCollection

CAD_PATH = r"bujji cad model-20261013T043927Z-1-001\bujji cad model\version 3.2 v1.obj"

if not os.path.exists(CAD_PATH):
    print(f"Error: {CAD_PATH} does not exist")
    sys.exit(1)

print("Reading OBJ file...")
vertices = []
objects = {}
current_obj = "default"

with open(CAD_PATH, "r", encoding="utf-8", errors="ignore") as f:
    for line in f:
        if line.startswith("v "):
            parts = line.strip().split()
            vertices.append([float(parts[1]), float(parts[2]), float(parts[3])])
        elif line.startswith("o "):
            current_obj = line.strip().split()[1]
            if current_obj not in objects:
                objects[current_obj] = []
        elif line.startswith("f "):
            if current_obj not in objects:
                objects[current_obj] = []
            parts = line.strip().split()[1:]
            # Parse vertex indices (1-based)
            face = [int(p.split("/")[0]) - 1 for p in parts]
            objects[current_obj].append(face)

V = np.array(vertices, dtype=np.float32)
print(f"Total vertices: {len(V)}")
print(f"Total bodies: {len(objects)}")

for name, faces in objects.items():
    if len(faces) == 0:
        continue
    # find unique vertex indices in this object
    idx = set()
    for f in faces:
        idx.update(f)
    v_obj = V[list(idx)]
    min_pt = v_obj.min(axis=0)
    max_pt = v_obj.max(axis=0)
    size = max_pt - min_pt
    center = (max_pt + min_pt) / 2
    print(f"[{name}] faces={len(faces)}, size=[{size[0]:.1f}, {size[1]:.1f}, {size[2]:.1f}], center=[{center[0]:.1f}, {center[1]:.1f}, {center[2]:.1f}]")
