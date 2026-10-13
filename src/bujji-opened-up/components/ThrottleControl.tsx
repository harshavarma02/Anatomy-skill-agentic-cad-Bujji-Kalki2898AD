import React, { useState } from "react";

export function ThrottleControl() {
  const [throttle, setThrottle] = useState(45);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setThrottle(val);

    const root = document.documentElement;
    if (val === 0) {
      root.style.setProperty("--ps", "paused");
    } else {
      root.style.setProperty("--ps", "running");
      const duration = (3.8 - val * 0.032).toFixed(2) + "s";
      root.style.setProperty("--d", duration);
    }
  };

  const calculatedTorque = Math.round((throttle / 100) * 9800);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mt-3 bg-white/80 backdrop-blur-sm border border-[#d5dae1] rounded-lg shadow-sm">
      {/* Label and telemetry */}
      <div className="flex flex-col">
        <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800 uppercase">
          Dual-Hub Motor Throttle
        </span>
        <span className="text-[12px] font-mono text-slate-500 mt-0.5">
          Output: <strong className="text-cyan-600 font-bold">{calculatedTorque.toLocaleString()} Nm</strong> &bull; Drive Status:{" "}
          <span className={throttle > 0 ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>
            {throttle > 0 ? "ENGAGED" : "IDLE"}
          </span>
        </span>
      </div>

      {/* Interactive slider control */}
      <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
        <span className="text-[11px] font-mono text-slate-400">0%</span>
        <input
          type="range"
          min="0"
          max="100"
          value={throttle}
          onChange={handleInput}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          aria-label="Throttle percentage"
        />
        <span className="text-[12px] font-mono font-bold text-slate-800 w-10 text-right">
          {throttle}%
        </span>
      </div>
    </div>
  );
}
