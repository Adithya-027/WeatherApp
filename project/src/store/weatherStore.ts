import create from 'zustand';
import { WeatherStore } from '../types/weather';

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  loading: false,
  error: null,
  darkMode: false,
  setWeatherData: (data) => set({ weatherData: data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));