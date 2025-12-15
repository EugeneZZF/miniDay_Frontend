import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { LoaderCircle, Cloudy, CloudRain } from "lucide-react";
import type { WeatherResult, WeatherError } from "../lib/weatherApi";
import { getWeekAroundDate } from "../model/morningData";

interface MorningQuizTitleProps {
  weather: WeatherResult | WeatherError | null;
}

export default function MorningQuizTitle({ weather }: MorningQuizTitleProps) {
  const days = getWeekAroundDate(new Date());

  console.log(days);
  // загрузка
  if (weather == null) {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 110000, ease: "linear" }}
        className="flex justify-center items-center"
      >
        <LoaderCircle className="w-[2rem] h-[2rem]" />
      </motion.div>
    );
  }

  // ошибка
  if ("error" in weather) {
    return <p className="text-red-500">Ошибка: {weather.error}</p>;
  }

  // успешный результат — weather типизирован как WeatherResult
  return (
    <motion.div className="flex align-middle items-center justify-center flex-col">
      <div className="flex items-center gap-4">
        <h1
          className="text-[6rem]"
          //   style={{ fontSize: "clamp(3rem, 16vw, 6rem)" }}
        >
          Утро
        </h1>
      </div>

      <div className="flex justify-between w-[80%] mt-4 font-medium">
        <div className="w-[3rem] ml-[-2rem] flex items-center justify-between">
          <Flame className="w-[2rem]" />
          <p className="text-[1.15rem]">5</p>
        </div>
        <div className="flex justify-between w-[3rem] ml-[-1rem] gap-2">
          <div className="text-[1.15rem] ">
            {weather.temperature > 0 ? "+" : "-"}
            {weather.temperature.toFixed(1)}°
          </div>
          <div>{weather.rain == 0 ? <Cloudy /> : <CloudRain />}</div>
        </div>
      </div>
      <div className="flex gap-[0.75rem] w-full justify-center mt-16">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex justify-center 
                w-[1.5625rem] h-[1.5625rem] items-center
                ${
                  index === 3 ? "bg-white text-black" : ""
                } border-2 border-white rounded-full text-[1.15rem]`}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
