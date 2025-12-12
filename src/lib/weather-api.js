const BASE_URL = "http://api.weatherapi.com/v1";

function Weather(actual, nextDays){
    this.actual = actual;
    this.nextDays = nextDays;
} 

export function fetchWeather(city){
    
}

const featchCurrentWeather = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}/current/${process.env.API_KEY}/${city}`);
        
        if(!response.ok) return null;

        const weather = response.json();

        return new {
            "temp": weather.temp_c,
            "windKph": weather.wind_kph,
            "isDay": weather.is_day,
            "prec": weather.precipitação_mm
        };
    } catch (erro){
        console.log(`Erro: ${erro}`);
        return null;
    }
}





