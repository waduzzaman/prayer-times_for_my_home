'use client';

import React from 'react';

export default function PrayerCard({ prayer, times, icon, formatName, isForbidden, maghribStatus }) {
  const formatTime = (time) => {
    if (!time) return '--:--';
    if (typeof time === 'string') {
      const [h, m] = time.split(':');
      const date = new Date();
      date.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className={`
      flex flex-col items-center p-6
      bg-gradient-to-br from-green-950 via-green-900 to-green-800
      border border-green-800/50 rounded-xl
      shadow-2xl shadow-black/70
      hover:shadow-green-600/40 transform hover:scale-[1.02]
      transition-all duration-300 ease-in-out
      ${isForbidden ? 'ring-4 ring-red-500' : ''}
    `}>
      {/* Icon */}
      <div className="mb-4 text-amber-00 text-3xl p-2 rounded-full bg-amber-500/20">
        {icon}
      </div>

      {/* Prayer Name */}
      <h2 className="text-3xl font-sans font-extrabold text-white mb-2 tracking-wider uppercase">
        {formatName(prayer)}
      </h2>

      {/* Times Grid */}
      <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2 text-white text-lg md:text-xl font-medium text-center">
        <p className="col-span-1 text-gray-400">Adhan</p>
        <p className="col-span-1 text-amber-300 font-extrabold tracking-wider">{formatTime(times?.adhan)}</p>

        <div className="col-span-2 h-[1px] bg-gray-200 my-1"></div>

        <p className="col-span-1 text-gray-400">Iqama</p>
        <p className="col-span-1 text-amber-300 font-extrabold tracking-wider">{formatTime(times?.iqama)}</p>
      </div>

      {/* Forbidden / Maghrib status */}
      {isForbidden && <p className="mt-2 text-red-400 font-semibold">Asr Forbidden Time</p>}
      {maghribStatus && <p className="mt-2 text-yellow-300 font-semibold">{maghribStatus}</p>}
    </div>
  );
}
