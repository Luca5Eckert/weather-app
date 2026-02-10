import type { WeatherInfo } from '@/types/WeatherInfo';
import { Wind, Droplets, Calendar, MapPin, CloudRain, Sun, Moon } from 'lucide-react';

function getIntensiveOfRain(prec: number): string {
    if (prec === 0) return "Céu limpo";
    if (prec < 5) return "Chuva leve";
    if (prec < 20) return "Chuva moderada";
    return "Chuva forte";
}

function getDayPhrase(info : WeatherInfo) : string {
    if (info.isDay === 1) {
        return info.prec === 0 ? "Um dia ensolarado!" : "Leve um guarda-chuva!";
    }
    return info.prec === 0 ? "Uma noite tranquila." : "Noite chuvosa, cuidado!";
}

export default function WeatherInfoComponent(info: WeatherInfo) {
    const { city, dayOfWeek, temp, windKph, isDay, prec } = info;
    const rainIntensity = getIntensiveOfRain(prec);
    const dayPhrase = getDayPhrase(info);

    return (
        <section className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-[2.5rem] p-8 shadow-2xl text-white transition-all duration-500">
            {/* Cabeçalho: Cidade e Data */}
            <div className="flex justify-between items-start mb-10">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-200" />
                        <h2 className="text-3xl font-bold tracking-tight">{city}</h2>
                    </div>
                    <div className="flex items-center gap-2 opacity-80 ml-1">
                        <Calendar className="w-4 h-4" />
                        <p className="capitalize text-sm font-medium">{dayOfWeek}</p>
                    </div>
                </div>

                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                    {isDay ? <Sun className="w-8 h-8 text-yellow-300 fill-yellow-300/20" /> : <Moon className="w-8 h-8 text-indigo-200 fill-indigo-200/20" />}
                </div>
            </div>

            <div className="flex flex-col items-center mb-10">
                <div className="relative">
                    <span className="text-8xl font-black drop-shadow-lg leading-none">
                        {Math.round(temp)}
                    </span>
                    <span className="absolute -top-2 -right-6 text-4xl font-light">°</span>
                </div>
                <p className="text-xl font-medium mt-4 bg-white/10 px-4 py-1 rounded-full border border-white/10">
                    {dayPhrase}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-3xl border border-white/5">
                    <div className="p-2 bg-blue-400/20 rounded-xl">
                        <Wind className="w-6 h-6 text-blue-200" />
                    </div>
                    <div>
                        <p className="text-xs opacity-60 uppercase font-bold tracking-wider">Vento</p>
                        <p className="text-lg font-semibold">{windKph} <span className="text-xs font-normal">km/h</span></p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-3xl border border-white/5">
                    <div className="p-2 bg-indigo-400/20 rounded-xl">
                        <Droplets className="w-6 h-6 text-indigo-200" />
                    </div>
                    <div>
                        <p className="text-xs opacity-60 uppercase font-bold tracking-wider">{rainIntensity}</p>
                        <p className="text-lg font-semibold">{prec} <span className="text-xs font-normal">mm</span></p>
                    </div>
                </div>
            </div>
            
        </section>
    );
}