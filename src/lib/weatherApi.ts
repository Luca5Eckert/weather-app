const BASE_URL = "https://api.weatherapi.com/v1";
const DAYS_TO_FORECAST = 3; 

export interface WeatherInfo {
    city: string;
    temp: number;
    windKph: number;
    isDay: number;
    prec: number;
}


/**
 * Busca o clima atual e a previsão para os próximos 3 dias simultaneamente.
 * @param {string} city - Nome da cidade.
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
 * Busca o clima atual.
 */
const fetchCurrentWeather = async (city: string): Promise<WeatherInfo | null> => {
    try {
        const url = `${BASE_URL}/current.json?key=${process.env.API_KEY}&q=${city}`;
        
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Erro na busca atual: ${response.status} - ${response.statusText}`);

            const errorData = await response.json().catch(() => ({ message: 'No error details' }));
            console.error("Detalhes do erro da API:", errorData);
            return null;
        }

        const weather = await response.json(); 

        return {
            "city": city,
            "temp": weather.current.temp_c,
            "windKph": weather.current.wind_kph,
            "isDay": weather.current.is_day,
            "prec": weather.current.precip_mm
        };
    } catch (erro) {
        console.log(`Erro ao buscar o clima atual: ${erro}`);
        return null;
    }
}


export interface DayForecast {
    date: string;
    temp: number;
    prec: number;
}

export type NextDays = DayForecast[];

/**
 * Busca a previsão para os próximos dias (retorna array com 0..DAYS_TO_FORECAST elementos).
 */
export const fetchNextThreeDays = async (city: string): Promise<NextDays | null> => {
    try {
        const url = `${BASE_URL}/forecast.json?key=${process.env.API_KEY}&q=${encodeURIComponent(city)}&days=${DAYS_TO_FORECAST + 1}`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Erro na busca da previsão: ${response.status} - ${response.statusText}`);
            const errorData = await response.json().catch(() => ({ message: 'No error details' }));
            console.error("Detalhes do erro da API:", errorData);
            return null;
        }

        const data: any = await response.json();
        const forecastArr = data?.forecast?.forecastday;

        if (!Array.isArray(forecastArr) || forecastArr.length <= 1) {
            return [];
        }

        const next = forecastArr
            .slice(1, 1 + DAYS_TO_FORECAST)
            .map((dayData: any) => ({
                date: dayData.date,
                temp: typeof dayData.day?.avgtemp_c === 'number' ? dayData.day.avgtemp_c : (dayData.day?.maxtemp_c ?? 0),
                prec: typeof dayData.day?.totalprecip_mm === 'number' ? dayData.day.totalprecip_mm : 0
            }));

        return next;
    } catch (erro) {
        console.log(`Erro ao buscar a previsão: ${erro}`);
        return null;
    }
};

