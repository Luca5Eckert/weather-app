"use client";

import SearchBar from "@/components/ui/SearchBar";
import { useState, useEffect } from "react";
import WeatherInfoComponent from "@/components/ui/WeatherInfo";
import { fetchCurrentWeather} from "@/lib/weatherApi";
import { WeatherInfo } from "@/types/WeatherInfo";

export default function Home() {
  const [city, setCity] = useState('São Paulo');
  const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);
  
  const [loading, setLoading] = useState(false);

  const loadWeather = async (targetCity: string) => {
    setLoading(true);
    const data = await fetchCurrentWeather(targetCity);
    setWeatherData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather(city);
  }, []);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
    loadWeather(newCity);
  };

  return (
    <main>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <p>Carregando...</p>}

      {weatherData ? (
        <WeatherInfoComponent
          city={weatherData.city}
          dayOfWeek={weatherData.dayOfWeek}
          temp={weatherData.temp}
          windKph={weatherData.windKph}
          isDay={weatherData.isDay}
          prec={weatherData.prec}
        />
      ) : (
        !loading && <p>Cidade não encontrada ou erro na API.</p>
      )}
    </main>
  );
  
}