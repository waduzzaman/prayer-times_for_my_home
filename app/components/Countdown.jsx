'use client';

export default function Countdown({ nextPrayer, countdown, currentPrayer }) {
  // Helper to format remaining time
  const formatRemaining = (diff) => {
    if (!diff || diff <= 0) return "00:00:00";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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
      <h2 className="text-2xl md:text-3xl text-amber-300 uppercase tracking-widest font-semibold mb-4">
        Time until next Salah
      </h2>

      {/* Next Prayer Name */}
      <p className="text-5xl md:text-6xl font-bold my-4 text-white tracking-tight">
        {nextPrayer ? nextPrayer.name : "Loading..."}
      </p>

      {/* Countdown for next prayer */}
      <p className="text-7xl md:text-9xl font-mono font-extrabold text-red-500 tracking-tighter drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)]">
        {countdown || "00:00:00"}
      </p>

      {/* Current prayer ongoing status */}
      {currentPrayer && (
        <div className="mt-8 text-center">
          <p className="text-xl text-amber-200 font-semibold uppercase tracking-wide mb-1">
            {currentPrayer.name} ongoing
          </p>
          <p className="text-3xl font-bold text-green-300 tracking-tight">
            Ends in {formatRemaining(currentPrayer.remaining)}
          </p>
        </div>
      )}
    </section>
  );
}
