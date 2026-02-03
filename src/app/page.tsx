import SearchBar from "@/components/ui/SearchBar";
import { useState } from "react";
import { WeatherInfo } from "@/components/ui/WeatherInfo";



export default function Home() {
  const [city, setCity] = useState('São Paulo');

  const handleSearch = (city: string) => {
    setCity(city);
  }

  return (
    <main>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      
      <WeatherInfo
        city={city}
        dayOfWeek={"Segunda-feira"}
        temp={25}
        windKph={15}
        isDay={1}
        prec={10}
      />

    </main>

  )


}
