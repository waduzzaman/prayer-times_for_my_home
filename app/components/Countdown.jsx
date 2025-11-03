'use client';

import { useEffect, useState } from 'react';

export default function Countdown({ nextPrayer, countdown, currentPrayer }) {
  const [progress, setProgress] = useState(100);

  const formatRemaining = (diff) => {
    if (!diff || diff <= 0) return "00:00:00";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!countdown || !nextPrayer?.time) return;

    const total =
      (nextPrayer.time - new Date()) + parseCountdownToMs(countdown);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextPrayer.time - now;
      const percent = Math.max(0, (diff / total) * 100);
      setProgress(percent);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, nextPrayer]);

  const parseCountdownToMs = (count) => {
    if (!count) return 0;
    const [h, m, s] = count.split(":").map(Number);
    return (h * 3600 + m * 60 + s) * 1000;
  };

  return (
    <section
      className="
        bg-gradient-to-br from-green-950 via-green-900 to-green-800
        border border-green-800/50 rounded-3xl p-12 mb-12 text-center
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]
        hover:shadow-green-600/50 transform hover:scale-[1.05]
        transition-all duration-300 ease-in-out
      "
    >
      <h2 className="text-2xl md:text-3xl text-amber-300 uppercase tracking-widest font-semibold mb-6">
        Time until next Salah
      </h2>

      {/* Circular Countdown */}
     {/* Circular Countdown */}
<div className="relative w-80 h-80 mx-auto mb-8">
  {/* Outer ring */}
  <div className="absolute inset-0 rounded-full border-[12px] border-green-700/50"></div>

  {/* Middle ring */}
  <div className="absolute inset-4 rounded-full border-[10px] border-green-500/60"></div>

  {/* Animated inner ring */}
  <svg className="absolute inset-0 w-full h-full -rotate-90">
    <defs>
      <linearGradient id="vividGrad" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <circle
      cx="50%"
      cy="50%"
      r="110" // increased radius
      stroke="url(#vividGrad)"
      strokeWidth="14"
      fill="transparent"
      strokeLinecap="round"
      strokeDasharray={`${2 * Math.PI * 110}`}
      strokeDashoffset={`${((100 - progress) / 100) * (2 * Math.PI * 110)}`}
      className="transition-all duration-1000 ease-linear drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]"
    />
  </svg>

  {/* Center time text */}
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <p className="text-4xl md:text-5xl font-mono font-extrabold text-amber-400 tracking-tighter drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)]">
      {countdown || "00:00:00"}
    </p>
    <p className="mt-2 text-white font-semibold text-lg uppercase">
      {nextPrayer ? nextPrayer.name : "Loading..."}
    </p>
  </div>
</div>


      {/* Current prayer ongoing status */}
      {currentPrayer && (
        <div className="mt-8 text-center">
          <p className="text-xl text-amber-500 font-semibold uppercase tracking-wide mb-1">
            {currentPrayer.name} ongoing
          </p>
          <p className="text-3xl font-bold text-orange-600 tracking-tighter drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)]">
            Ends in {formatRemaining(currentPrayer.remaining)}
          </p>
        </div>
      )}
    </section>
  );
}
