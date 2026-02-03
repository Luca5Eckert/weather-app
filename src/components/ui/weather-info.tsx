interface WeatherInfo {
    city: string;
    dayOfWeek: string;
    temp: number;
    windKph: number;
    isDay: number;
    prec: number;
}

function getIntensiveOfRain(prec: number): string {
    switch (true){
        case prec == 0: return "sem chuva";
        case prec < 20: return "chuva leve";
        case prec < 50: return "chuva moderada";
        case prec < 70: return "chuva intensa";
        default: return "chuva forte";
    }
}

function getDayPhrase(info : WeatherInfo) : string {
    type rule = { test: (i: WeatherInfo) => boolean, phrase: string };

    const rules: rule[] = [
        { test: (i) => i.isDay === 1 && i.prec === 0, phrase: "Um dia ensolarado!"},
        { test: (i) => i.isDay === 1 && i.prec > 0, phrase: "Leve um guarda-chuva!"},
        { test: (i) => i.isDay === 0 && i.prec === 0, phrase: "Uma noite tranquila."},
        { test: (i) => i.isDay === 0 && i.prec > 0, phrase: "Noite chuvosa, cuidado!"}
    ];

    const match = rules.find(() => info);

    return match ? match.phrase : "Aproveite o dia!";
}

export default function WeatherInfoComponent({city, dayOfWeek, temp, windKph, isDay, prec} : WeatherInfo) {
    const rainIntensity = getIntensiveOfRain(prec);
    
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
                    <p>{prec} %</p>
                </div>

            </div>
        </section>
    )
}