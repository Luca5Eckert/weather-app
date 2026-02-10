interface DayForecastProps {
  date: string;
  temp: number;
  prec: number;
}

export default function NextDayCard({ date, temp, prec }: DayForecastProps) {
  const dayName = new Date(date + "T00:00:00").toLocaleDateString('pt-BR', { weekday: 'long' });

  return (
    <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg min-w-[120px]">
      <span className="capitalize text-sm font-medium">{dayName}</span>
      <span className="text-2xl font-bold my-2">{Math.round(temp)}°C</span>
      <span className="text-xs text-blue-300">Chuva: {prec}mm</span>
    </div>
  );
}