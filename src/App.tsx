import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SearchBar } from './components/SearchBar';
import { useWeatherStore } from './store/weatherStore';
import { getWeatherData } from './services/api';

function App() {
  const { weatherData, loading, error, darkMode, setWeatherData, setLoading, setError, toggleDarkMode } = useWeatherStore();
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          handleSearch(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Geolocation error:', error);
          handleSearch('London'); // Default city
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Weather App
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              °{unit}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center mt-8"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {weatherData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <WeatherCard data={weatherData} unit={unit} />
            <ForecastCard forecast={weatherData.forecast} unit={unit} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;