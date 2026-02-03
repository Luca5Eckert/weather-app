import SearchBar from '@/components/ui/SearchBar';
import WeatherInfo from '@/components/ui/weather-info';
import { fetchWeather } from '@/lib/weather-api';
import { useEffect } from 'react';

const baseCity = "São Leopoldo";
const weatherData = await fetchWeather(baseCity);

export default function Home() {
  const [weather, setWeather] = 

  useEffect(() => {
    setWeather(weatherData);
  }, [baseCity]);

  return (

    <WeatherInfo
      city='São Leopoldo'
      dayOfWeek='Segunda-feira'
      temp={22}
      windKph={15}
      isDay={1}
      prec={10}
    />

  );
}
