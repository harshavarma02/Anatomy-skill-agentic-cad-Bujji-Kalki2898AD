# Bujji, opened up

<div align="center">

[![Payload](https://img.shields.io/badge/Payload-306_KB_Standalone-0ea5e9.svg?style=flat-square)](./bujji-opened-up.html)
[![Tech](https://img.shields.io/badge/Tech-React_19_+_Pure_SVG-6366f1.svg?style=flat-square)](#how-it-works)
[![Skill](https://img.shields.io/badge/Skill-Anatomy_by_@wheresryan22-10b981.svg?style=flat-square)](https://github.com/wheresryan22/anatomy)
[![License](https://img.shields.io/badge/License-MIT-f59e0b.svg?style=flat-square)](./LICENSE)

<br/>

**An interactive, pure vector SVG cutaway of Bujji from *Kalki 2898 AD*.**  
Modeled from real mechanical blueprints into code — running inside a zero-dependency, 306 KB standalone HTML file.

<br/>

[**⚡ Launch Standalone HTML**](./bujji-opened-up.html) &bull; [**📐 Subsystems**](#mechanical-subsystems) &bull; [**⚙️ How It Works**](#how-it-works) &bull; [**🚀 Quickstart**](#quickstart)

</div>

---

## Real Machine vs. Vector Code

Instead of generating a generic AI raster image with melted hubs and floating pipes, this project constructs Bujji as an **accurate mechanical assembly in pure code**.

<div align="center">

| 🏭 Real Vehicle (*Mahindra × Jayem Automotives*) | 📐 Pure Vector SVG Recreation (*This Project*) |
| :---: | :---: |
| <img src="./assets/real_bujji_beauty.jpg" alt="Real Bujji Build" width="500" /> | <img src="./assets/vector_bujji_cutaway.png" alt="Pure Vector Code Cutaway" width="500" /> |
| *6,000 kg kerb weight • 6.075 m length • Dual Kirloskar motors (9,800 Nm) • 34.5" hubless front wheels built by Jayem & Mahindra* | *306 KB single-file HTML • 0 external dependencies • 120 FPS responsive vector • True $42^\circ$ axonometric projection* |

</div>

<br/>

### Interactive Split-Slider Cutaway

Drag the divider line across the vehicle to inspect how the **finished aerodynamic composite armor** mates with the **unskinned mechanical spaceframe and high-voltage powertrain**:

<div align="center">

<img src="./assets/vector_bujji_unwrapped.png" alt="Bujji Full Unwrapped Spaceframe View" width="980" />

<sub><b>Fig 01:</b> Full unwrapped structural view: DOM steel ladder chassis, 47 kWh battery spine with liquid coolant channels, 20-roller front hubless races, carbon-ceramic brake rotors, and rear electro-hydraulic steering swingarm.</sub>

</div>

---

## Mechanical Subsystems

<div align="center">

| Hubless Front Running Gear | Spaceframe Outrigger Torque Bridge |
| :---: | :---: |
| <img src="./assets/vector_hubless_wheel_internals.png" alt="Hubless Wheel Internals" width="480" /> | <img src="./assets/vector_chassis_outrigger_bridge.png" alt="Chassis Bridge" width="480" /> |
| *20 taper roller bearings • Slotted carbon-ceramic rotor • 16-pole copper stator • Dual opposing 4-piston calipers* | *DOM steel spaceframe • Cantilever torque box bridge • Front wishbone pivot mount • Structural roll cage* |

| Pilot Cockpit Capsule | Rear Powertrain & Steering Swingarm |
| :---: | :---: |
| <img src="./assets/vector_cockpit_wheel_zoom.png" alt="Cockpit Zoom" width="480" /> | <img src="./assets/vector_rear_powertrain_zoom.png" alt="Rear Powertrain Zoom" width="480" /> |
| *FIA tubular roll cage • Contoured pilot bucket seat • Steer-by-wire yoke column • Central holographic HUD pod* | *Spherical drive hub • Dual progressive coilover dampers • High-pressure hydraulic lines • Dual induction motors* |

</div>

---

## How It Works

This project follows the **Anatomy design contract** — treating vector code as an axonometric technical drawing engine:

* **True 2.5D Isometric Geometry**: All coordinates $(x, y, z)$ map deterministically to screen coordinates $(X, Y)$ at **$42^\circ$ azimuth** and **$30^\circ$ elevation**. No Three.js, no WebGL, no heavy 3D assets.
* **4-Tone Directional Shading**: Every solid part (`slabOf`, cylinders, discs) uses a strict directional palette — top highlight, front face, cast shadow, and specular crease line — creating tangible physical mass in flat SVG.
* **Topological Painter's Sorting**: Because SVG has no hardware $z$-buffer, all mechanical assemblies are sorted back-to-front: plinth shadow $\rightarrow$ port running gear $\rightarrow$ chassis spine & battery $\rightarrow$ cockpit seat $\rightarrow$ rear sphere $\rightarrow$ starboard body.
* **Live Dynamic Conduit Animation**: The interactive throttle slider modulates CSS variables (`--ps`, `--d`) that control live animated SVG electron conduits in real time.

---

## Quickstart

### Option A: Instant Zero-Install View (Recommended)

1. Clone or download this repo.
2. Double-click **[`bujji-opened-up.html`](./bujji-opened-up.html)** in any modern web browser.
3. Drag the slider to reveal the internal powertrain.

*306 KB • 0 network requests • 0 dependencies • Works offline.*

### Option B: Local Development

```bash
# Clone repository
git clone https://github.com/<your-username>/bujji-opened-up.git
cd bujji-opened-up

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

To regenerate the standalone single-file HTML bundle:
```bash
npm run bundle
```

---

## Repository Structure

```text
.
├── bujji-opened-up.html     # ⚡ Complete standalone zero-dependency build (306 KB)
├── assets/                 # 📸 Curated renders & mechanical component zooms
│   └── cad_renders/        # High-res orthographic CAD projections
├── scripts/                # Python CAD extraction & standalone bundling scripts
├── src/                    # Modular React 19 & SVG vehicle assemblies
├── index.html              # Vite entrypoint
├── package.json            # Lean project dependencies
└── README.md
```

---

## Credits & Acknowledgments

* **Anatomy Skill**: Built using the Anatomy design contract created by **Ryan** ([@wheresryan22](https://github.com/wheresryan22)).
* **Bujji Original Vehicle**: Designed by **Nag Ashwin** & produced by **Vyjayanthi Movies** for *Kalki 2898 AD*.
* **Real Engineering Build**: Manufactured in reality by **Mahindra Research Valley** & **Jayem Automotives**, with custom 34.5" tyres by **CEAT**.

---

<div align="center">

Released under the [MIT License](./LICENSE).

</div>
