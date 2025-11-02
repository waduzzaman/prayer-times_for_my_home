"use client";

import { useState, useEffect } from "react";
import SunCalc from "suncalc";

export default function Header({ currentTime }) {
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords;

        const times = SunCalc.getTimes(new Date(), latitude, longitude);
        setSunrise(
          times.sunrise.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
        );
        setSunset(
          times.sunset.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
        );

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setLocation(
            data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              ""
          );
        } catch (err) {
          console.error(err);
        }
      });
    }
  }, []);

  return (
    <header className="relative w-full mb-10">
      {/* Top-right info for desktop */}
      <div className="hidden md:flex absolute top-0 right-0 mt-4 mr-4 flex-col text-right text-amber-200 font-semibold space-y-1">
        <p>{location}</p>
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
      </div>

      {/* Mobile / small screen: info above heading */}
      <div className="flex flex-col items-center md:hidden mb-2 text-amber-200 font-sm space-y-1">
        <p className="font-semibold">{location}</p>
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-2 leading-snug">
            بِسْمِ ٱللّٰهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </h1>
         
        </div>

        <p className="text-xl md:text-xl text-amber-200/90 mb-2">
          30 Tuxedo Musallah
        </p>
        <p className="text-2xl md:text-3xl text-white font-mono mb-1">
          {currentTime.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </p>
        <p className="text-xl md:text-2xl text-gray-100 font-mono tracking-wider">
          {currentTime.toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </header>
  );
}
