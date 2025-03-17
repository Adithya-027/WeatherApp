import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface TemperatureGraphProps {
  forecast: any;
  unit: 'C' | 'F';
}

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({ forecast, unit }) => {
  const temperatures = forecast.forecastday.map((day: any) => ({
    date: format(new Date(day.date), 'EEE'),
    temp: unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f,
  }));

  const maxTemp = Math.max(...temperatures.map((t: any) => t.temp));
  const minTemp = Math.min(...temperatures.map((t: any) => t.temp));
  const range = maxTemp - minTemp;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Temperature Trend
      </h3>
      <div className="h-48 flex items-end justify-between px-4">
        {temperatures.map((day: any, index: number) => {
          // Calculate relative height with a minimum of 10% to ensure visibility
          const relativeHeight = ((day.temp - minTemp) / range) * 90 + 10;
          
          return (
            <div key={day.date} className="flex flex-col items-center flex-1 mx-1">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {Math.round(day.temp)}°{unit}
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${relativeHeight}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full max-w-[30px] bg-blue-500 dark:bg-blue-400 rounded-t-lg"
                style={{ minHeight: '4px' }}
              />
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {day.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemperatureGraph;