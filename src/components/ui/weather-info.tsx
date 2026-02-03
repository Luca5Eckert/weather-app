import type { WeatherInfo as ApiWeatherInfo } from '@/lib/weather-api';

type WeatherInfo = ApiWeatherInfo & { dayOfWeek: string };

function getIntensiveOfRain(prec: number): string {
    switch (true){
        case prec == 0: return "sem chuva";
        case prec < 20: return "chuva leve";
        case prec < 50: return "chuva moderada";
        case prec < 70: return "chuva intensa";
        default: return "chuva forte";
    }
}

function getDayPhrase(info : ApiWeatherInfo) : string {
    type rule = { test: (i: ApiWeatherInfo) => boolean, phrase: string };

    const rules: rule[] = [
        { test: (i) => i.isDay === 1 && i.prec === 0, phrase: "Um dia ensolarado!"},
        { test: (i) => i.isDay === 1 && i.prec > 0, phrase: "Leve um guarda-chuva!"},
        { test: (i) => i.isDay === 0 && i.prec === 0, phrase: "Uma noite tranquila."},
        { test: (i) => i.isDay === 0 && i.prec > 0, phrase: "Noite chuvosa, cuidado!"}
    ];

    const match = rules.find(r => r.test(info));

    return match ? match.phrase : "Aproveite o dia!";
}

export default function WeatherInfoComponent({city, dayOfWeek, temp, windKph, isDay, prec} : WeatherInfo) {
    const rainIntensity = getIntensiveOfRain(prec);

    const dayPhrase = getDayPhrase({city, temp, windKph, isDay, prec});
    
    return (
        <section className="weather-info">
            <div>
                <h2>{city}</h2>
                <p>{dayOfWeek}</p>
            </div>

            <div>
                <p>{temp}°C</p>
                <p>{rainIntensity}</p>

                <div>
                    <p>{windKph} km/h</p>
                    <p>{prec} mm</p>
                </div>

                <div>
                    <p>{dayPhrase}</p>
                </div>

            </div>
        </section>
    )
    
}