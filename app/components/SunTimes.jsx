'use client';

import { useState, useEffect } from 'react';
import SunCalc from 'suncalc';

export default function SunTimes() {
  const [location, setLocation] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ latitude, longitude });

      // Calculate sunrise and sunset
      const times = SunCalc.getTimes(new Date(), latitude, longitude);
      setSunrise(times.sunrise);
      setSunset(times.sunset);

      // Reverse geocoding to get city, state/province, and country
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.village || '';
        const state = data.address.state || data.address.county || '';
        const country = data.address.country || '';
        setLocationName([city, state, country].filter(Boolean).join(', '));
      } catch (err) {
        console.error('Failed to get location name:', err);
      }
    });
  }, []);

  if (!sunrise || !sunset || !location) return null;

  return (
    <div className="absolute top-4 right-4 text-right text-amber-200 font-semibold">
      <p>{locationName ? `Location: ${locationName}` : 'Location: Unknown'}</p>
      <p>{`Sunrise: ${sunrise.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`}</p>
      <p>{`Sunset: ${sunset.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`}</p>
    </div>
  );
}
