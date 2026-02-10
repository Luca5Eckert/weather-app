const BASE_URL = "https://api.weatherapi.com/v1";
const DAYS_TO_FORECAST = 4;

import type { WeatherInfo } from "@/types/WeatherInfo";
import type { DayForest } from "@/types/DayForest";

/**
 * 1. Busca o clima atual.
 */
export async function fetchCurrentWeather(city: string): Promise<WeatherInfo | null> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY; 
        const url = `${BASE_URL}/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
        
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'No error details' }));
            console.error("Erro na API:", errorData);
            return null;
        }

        const weather = await response.json(); 

        return {
            "city": weather.location.name, // Usando o nome retornado pela API (mais preciso)
            "temp": weather.current.temp_c,
            "windKph": weather.current.wind_kph,
            "isDay": weather.current.is_day,
            "prec": weather.current.precip_mm,
            "dayOfWeek": new Date(weather.location.localtime.replace(' ', 'T')).toLocaleDateString('pt-BR', { weekday: 'long' })
        };
    } catch (erro) {
        console.error(`Erro ao buscar o clima atual: ${erro}`);
        return null;
    }
}

/**
 * 2. Busca o clima e a previsão (Combina as funções)
 */
export async function fetchWeather(city : string): Promise<WeatherInfo | null> {
    const actual = await fetchCurrentWeather(city);

    if (!actual) {
        return null;
    }

    return {
        ...actual
    };
}

/**
 * 3. Busca a previsão para os próximos dias
 */
export const fetchNextThreeDays = async (city: string) : Promise<DayForest[] | null> => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const url = `${BASE_URL}/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=${DAYS_TO_FORECAST + 1}`;
        
        const response = await fetch(url);
        if (!response.ok) return null;

        const data = await response.json();
        const forecastArr = data?.forecast?.forecastday;

        if (!Array.isArray(forecastArr) || forecastArr.length <= 1) return [];

        return forecastArr.slice(1, 1 + DAYS_TO_FORECAST).map((dayData: any) => ({
            date: dayData.date,
            temp: dayData.day.avgtemp_c,
            prec: dayData.day.totalprecip_mm
        }));
    } catch (erro) {
        console.error(`Erro na previsão: ${erro}`);
        return null;
    }

};