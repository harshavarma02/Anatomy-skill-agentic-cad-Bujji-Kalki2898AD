import React, { useEffect, useRef, useState } from "react";
import { WIDTH, HEIGHT, PALETTE } from "../view";
import { InsideDriveArt } from "../art/InsideDriveArt";
import { OutsideShellArt } from "../art/OutsideShellArt";

interface CutawaySliderProps {
  initialSplit?: number;
}

export function CutawaySlider({ initialSplit = 500 }: CutawaySliderProps) {
  const [splitX, setSplitX] = useState(initialSplit);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Smooth unwrap glide on initial mount
  useEffect(() => {
    let animId: number;
    const start = performance.now();
    const duration = 1400;
    const fromX = 940;
    const toX = initialSplit;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(1, elapsed / duration);
      if (progress < 1) {
        setSplitX(fromX - (fromX - toX) * easeOutCubic(progress));
        animId = requestAnimationFrame(animate);
      } else {
        setSplitX(toX);
      }
    };

    const timer = setTimeout(() => {
      animId = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, []);

  const updatePosition = (clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * WIDTH;
    setSplitX(Math.max(20, Math.min(WIDTH - 20, Math.round(x))));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSplitX((prev) => Math.max(20, prev - 25));
    } else if (e.key === "ArrowRight") {
      setSplitX((prev) => Math.min(WIDTH - 20, prev + 25));
    }
  };

  return (
    <svg
      ref={svgRef}
      className="iso-svg w-full h-auto select-none cursor-ew-resize"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="none"
      style={{ backgroundColor: PALETTE.bg }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-valuenow={Math.round((splitX / WIDTH) * 100)}
      aria-label="Cutaway reveal divider"
    >
      <defs>
        {/* ClipPath revealing the Inside Powertrain up to splitX */}
        <clipPath id="cutaway-clip">
          <rect x="0" y="0" width={splitX} height={HEIGHT} />
        </clipPath>
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill={PALETTE.bg} />

      {/* Base Layer: Finished Automotive Vehicle */}
      <OutsideShellArt />

      {/* Clipped Layer: Bare Mechanical Powertrain */}
      <g clipPath="url(#cutaway-clip)">
        <InsideDriveArt />
      </g>

      {/* Draggable Divider Bar & Cyan Glowing Edge */}
      <g id="divider-handle">
        {/* Subtle Edge Glow Line */}
        <line
          x1={splitX}
          y1="0"
          x2={splitX}
          y2={HEIGHT}
          stroke="#06b6d4"
          strokeWidth="3.5"
          opacity="0.4"
        />
        {/* Crisp Center Knife Edge */}
        <line
          x1={splitX}
          y1="0"
          x2={splitX}
          y2={HEIGHT}
          stroke="#ffffff"
          strokeWidth="1.8"
        />

        {/* Center Pill Handle */}
        <g transform={`translate(${splitX} ${HEIGHT / 2})`}>
          <circle r="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle r="15" fill="#f8fafc" stroke="#06b6d4" strokeWidth="1.2" />
          {/* Chevron Arrows */}
          <path d="M-6,0 L-2,-5 L-2,5 Z" fill="#0f172a" />
          <path d="M6,0 L2,-5 L2,5 Z" fill="#0f172a" />
        </g>
      </g>
    </svg>
  );
}
