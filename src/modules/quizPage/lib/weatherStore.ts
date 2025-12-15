import { create } from "zustand";
import { getWeatherByDate } from "../lib/weatherApi";
import type { WeatherResult, WeatherError } from "../lib/weatherApi";

interface WeatherState {
  weather: WeatherResult | WeatherError | null;
  loading: boolean;
  error: string | null;

  fetchWeather: (date: Date) => Promise<void>;
  clearWeather: () => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  loading: false,
  error: null,

  fetchWeather: async (date: Date) => {
    set({ loading: true, error: null });

    const result = await getWeatherByDate(date);

    if ("error" in result) {
      set({
        error: result.error,
        weather: null,
        loading: false,
      });
      return;
    }

    set({
      weather: result,
      loading: false,
    });
  },

  clearWeather: () =>
    set({
      weather: null,
      error: null,
      loading: false,
    }),
}));
