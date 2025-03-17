import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

interface ForecastCardProps {
  forecast: any;
  unit: 'C' | 'F';
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rain':
      case 'light rain':
      case 'heavy rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'snow':
      case 'light snow':
      case 'heavy snow':
        return <Snowflake className="w-8 h-8 text-blue-300" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex overflow-x-auto gap-4 pb-4 pt-2"
    >
      {forecast.forecastday.map((day: any) => (
        <div
          key={day.date}
          className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg w-48"
        >
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {format(new Date(day.date), 'EEE, MMM d')}
          </div>
          <div className="flex items-center justify-between mb-4">
            {getWeatherIcon(day.day.condition.text)}
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              {unit === 'C' ? `${day.day.maxtemp_c}°C` : `${day.day.maxtemp_f}°F`}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {day.day.condition.text}
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Humidity: {day.day.avghumidity}%
          </div>
        </div>
      ))}
    </motion.div>
  );
};