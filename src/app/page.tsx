import SearchBar from '@/components/ui/SearchBar';
import WeatherInfo from '@/components/ui/weather-info';
import { fetchWeather } from '@/lib/weather-api';
import { use, useEffect, useState } from 'react';

import type { WeatherInfo as ApiWeatherInfo } from '@/lib/weather-api';


export default function Home() {
  const baseCity = "São Leopoldo";

  const [weather, setWeather] = useState<ApiWeatherInfo | null>(null);

  useEffect(() => {
    

  }, [baseCity]);

  return (

    <WeatherInfo
      city='São Leopoldo'
      dayOfWeek="Segunda-feira"
      temp={22}
      windKph={15}
      isDay={1}
      prec={10}
    />

  );
}
