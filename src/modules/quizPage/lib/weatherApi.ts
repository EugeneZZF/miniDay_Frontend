import { fetchWeatherApi } from "openmeteo";

export interface WeatherResult {
  location: { latitude: number; longitude: number };
  time: Date;
  temperature: number;
  rain: number;
  showers: number;
  snowfall: number;
}

export interface WeatherError {
  error: string;
}

// Получаем координаты GPS
async function getLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({ error: "Геолокация не поддерживается браузером" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        reject({ error: "Ошибка GPS: " + err.message });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
}

export async function getWeatherByDate(
  date: Date,
  latitude?: number,
  longitude?: number
): Promise<WeatherResult | WeatherError> {
  // Если координаты не переданы — получаем GPS
  if (latitude === undefined || longitude === undefined) {
    try {
      const gps = await getLocation();
      latitude = gps.latitude;
      longitude = gps.longitude;
    } catch (e: any) {
      return { error: e.error ?? "Ошибка получения GPS" };
    }
  }

  const params = {
    latitude,
    longitude,
    hourly: ["temperature_2m", "rain", "showers", "snowfall"],
    timezone: "Europe/Moscow",
    forecast_days: 1,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  if (!responses || responses.length === 0) {
    return { error: "Ответ API пустой" };
  }

  const response = responses[0];
  const hourly = response.hourly();

  if (!hourly) {
    return { error: "Hourly данные отсутствуют" };
  }

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const start = Number(hourly.time());
  const end = Number(hourly.timeEnd());
  const interval = hourly.interval();
  const total = (end - start) / interval;

  const times = Array.from({ length: total }, (_, i) => {
    return new Date((start + i * interval + utcOffsetSeconds) * 1000);
  });

  const targetTime = new Date(date);
  targetTime.setMinutes(0, 0, 0);

  const index = times.findIndex((t) => t.getTime() === targetTime.getTime());

  if (index === -1) {
    return { error: "Нет данных для этой даты" };
  }

  const tempVar = hourly.variables(0);
  const rainVar = hourly.variables(1);
  const showersVar = hourly.variables(2);
  const snowVar = hourly.variables(3);

  if (!tempVar || !rainVar || !showersVar || !snowVar) {
    return { error: "Некоторые погодные данные отсутствуют" };
  }

  const tempArr = tempVar.valuesArray() ?? [];
  const rainArr = rainVar.valuesArray() ?? [];
  const showersArr = showersVar.valuesArray() ?? [];
  const snowArr = snowVar.valuesArray() ?? [];

  return {
    location: { latitude, longitude },
    time: times[index],
    temperature: tempArr[index],
    rain: rainArr[index],
    showers: showersArr[index],
    snowfall: snowArr[index],
  };
}
