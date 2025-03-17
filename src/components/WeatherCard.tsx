import React from 'react';
import { motion } from 'framer-motion';
import { parse, format } from 'date-fns';
import { Sun, Cloud, CloudRain, Wind, Droplets, Activity, Sunrise, Sunset } from 'lucide-react';

interface WeatherCardProps {
  data: any;
  unit: 'C' | 'F';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, unit }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-12 h-12 text-gray-500" />;
      case 'rain':
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  const getBackgroundClass = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900';
      case 'cloudy':
        return 'bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-900';
      case 'rain':
        return 'bg-gradient-to-br from-blue-100 to-gray-100 dark:from-blue-900 dark:to-gray-900';
      default:
        return 'bg-gradient-to-br from-blue-100 to-white dark:from-blue-900 dark:to-gray-900';
    }
  };

  const formatTime = (timeStr: string) => {
    try {
      // Parse time in 12-hour format (e.g., "06:30 AM")
      const date = parse(timeStr, 'hh:mm a', new Date());
      return format(date, 'h:mm a');
    } catch (error) {
      return timeStr; // Return original string if parsing fails
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-6 shadow-lg ${getBackgroundClass(data.current.condition.text)}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.location.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{data.location.country}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {data.current.condition.text}
          </p>
        </div>
        {getWeatherIcon(data.current.condition.text)}
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center">
          <Activity className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-200">
            {unit === 'C' ? `${data.current.temp_c}°C` : `${data.current.temp_f}°F`}
          </span>
        </div>
        <div className="flex items-center">
          <Wind className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-200">
            {data.current.wind_kph} km/h
          </span>
        </div>
        <div className="flex items-center">
          <Droplets className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-200">
            {data.current.humidity}%
          </span>
        </div>
        <div className="flex items-center">
          <Activity className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-200">
            UV: {data.current.uv}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center">
          <Sunrise className="w-5 h-5 mr-2 text-yellow-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {formatTime(data.forecast.forecastday[0].astro.sunrise)}
          </span>
        </div>
        <div className="flex items-center">
          <Sunset className="w-5 h-5 mr-2 text-orange-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {formatTime(data.forecast.forecastday[0].astro.sunset)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};