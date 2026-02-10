"use client";

import SearchBar from "@/components/ui/SearchBar";
import { useState, useEffect } from "react";
import WeatherInfoComponent from "@/components/ui/WeatherInfo";
import NextDayCard from "@/components/ui/NextDayCard";
import { fetchCurrentWeather, fetchNextThreeDays } from "@/lib/weatherApi";

import { DayForest } from "@/types/DayForest"; // Verifique se não é 'DayForecast' o nome correto
import { WeatherInfo } from "@/types/WeatherInfo";

export default function Home() {
  const [city, setCity] = useState('São Paulo');
  const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);
  const [nextDays, setNextDays] = useState<DayForest[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWeather = async (targetCity: string) => {
    setLoading(true);
    const [currentData, forecastData] = await Promise.all([
      fetchCurrentWeather(targetCity),
      fetchNextThreeDays(targetCity)
    ]);
    setWeatherData(currentData);
    if (forecastData) setNextDays(forecastData);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather(city);
  }, []);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
    loadWeather(newCity);
  };

  const bgGradient = weatherData?.isDay 
    ? "from-blue-400 to-blue-600" 
    : "from-gray-800 to-slate-950";

  return (
    <main className={`min-h-screen bg-gradient-to-br ${bgGradient} text-white p-4 md:p-8`}>
      <div className="max-w-2xl mx-auto">
        
        <header className="flex flex-col gap-2 mb-8 items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md">
            Weather-App
          </h1>
          <p className="text-blue-100 opacity-80">Previsão do tempo em tempo real</p>
        </header>

        <section className="backdrop-blur-md bg-white/10 p-2 rounded-2xl shadow-xl border border-white/20 mb-8">
          <SearchBar onSearch={handleSearch} />
        </section>

        {loading && (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        )}

        {!loading && weatherData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <WeatherInfoComponent
              city={weatherData.city}
              dayOfWeek={weatherData.dayOfWeek}
              temp={weatherData.temp}
              windKph={weatherData.windKph}
              isDay={weatherData.isDay}
              prec={weatherData.prec}
            />

            {nextDays.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold mb-4 ml-2">Próximos Dias</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {nextDays.map((day) => (
                    <NextDayCard 
                      key={day.date} 
                      date={day.date} 
                      temp={day.temp} 
                      prec={day.prec} 
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Erro */}
        {!weatherData && !loading && (
          <div className="text-center p-10 backdrop-blur-md bg-red-500/10 rounded-2xl border border-red-500/20">
            <p className="text-lg">Ops! Não encontramos essa cidade. 🔍</p>
          </div>
        )}
      </div>
    </main>
  );
}