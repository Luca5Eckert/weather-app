const BASE_URL = "http://api.weatherapi.com/v1";
const DAYS_TO_FORECAST = 3; 

function Weather(actual, nextDays) {
    this.actual = actual;
    this.nextDays = nextDays;
}

/**
 * Busca o clima atual e a previsão para os próximos X dias simultaneamente.
 * @param {string} city - Nome da cidade.
 */
export async function fetchWeather(city) {
    const [actual, forecastDays] = await Promise.all([ 
        fetchCurrentWeather(city),
        fetchNextThreeDays(city)
    ]);

    if (!actual || !forecastDays) {
        return null;
    }

    return new Weather(actual, forecastDays);
}


/**
 * Busca o clima atual.
 */
const fetchCurrentWeather = async (city) => {
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

/**
 * Busca a previsão para os próximos dias em uma única chamada de API (Mais eficiente).
 */
const fetchNextThreeDays = async (city) => {
    try {
        
        const url = `${BASE_URL}/forecast.json?key=${process.env.API_KEY}&q=${city}&days=${DAYS_TO_FORECAST + 1}`;
        
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Erro na busca da previsão: ${response.status} - ${response.statusText}`);
            return null;
        }

        const data = await response.json(); 
        
        
        const nextDays = data.forecast.forecastday.slice(1, DAYS_TO_FORECAST + 1);

        const [firstDay, secondDay, thirdDay] = nextDays.map(dayData => ({
            "date": dayData.date,
            "temp": dayData.day.avgtemp_c,
            "prec": dayData.day.totalprecip_mm
        }));
        
        return {
            firstDay,
            secondDay,
            thirdDay
        };

    } catch (erro) {
        console.log(`Erro ao buscar a previsão: ${erro}`);
        return null;
    }
}