import { motion, useMotionValue, useTransform } from "framer-motion";
// import { fire } from "lucide-react";
import { getWeatherByDate } from "../lib/weatherApi";
import { useState, useRef, useEffect } from "react";
import MorningQuizTitle from "./morningQuizTitle";
import ButtonNextQuiz from "./ButtonNextQuiz";
import type { WeatherResult, WeatherError } from "../lib/weatherApi";

export default function MorningQuiz() {
  const [weather, setWeather] = useState<WeatherResult | WeatherError | null>(
    null
  );

  const y_axios = useMotionValue(0);
  const y_axios_margin = useTransform(y_axios, [-100, 0], [-300, 0]);
  const y_title_margin = useTransform(y_axios, [-150, 0], [-200, 0]);
  const y_title_opacity = useTransform(y_axios, [-90, -150], [0, 1]);
  //   SUN
  const yStroke = useTransform(y_axios, [-190, 0], [0, -90]);

  const yStrokeScale = useTransform(y_axios, [-200, 0], [1.0, 0.5], {
    clamp: true,
  });
  const yStrokeW = useTransform(y_axios, [-200, 0], [85, 45], {
    clamp: true,
  });

  // LINES
  const yLineScale = useTransform(y_axios, [-200, 0], [1.45, 0.5], {
    clamp: true,
  });
  // солнышко
  const ySunCircleScale = useTransform(y_axios, [-145, 0], [0.8, 0.5], {
    clamp: true,
  });
  const ySunCircle = useTransform(y_axios, [-145, 0], [-10, 0], {
    clamp: true,
  });
  const ySunCircleMargin = useTransform(y_axios, [0, -145], [-90, 0], {
    clamp: true,
  });

  // слевое солнышко линия
  const ySunLeftLineBottom = useTransform(y_axios, [0, -145], [0, 15], {
    clamp: true,
  });
  const yLineSacle = useTransform(y_axios, [-200, 0], [1.2, 0.5], {
    clamp: true,
  });
  const yLinesOpasity = useTransform(y_axios, [-120, -130], [0, 1], {
    clamp: true,
  });
  const ySunLineLeft = useTransform(y_axios, [-130, -155], [0, -115], {
    clamp: true,
  });
  const ySunLineRight = useTransform(y_axios, [-130, -155], [0, -115], {
    clamp: true,
  });

  //   deg up
  const ySunDegBottom = useTransform(y_axios, [0, -155], [-150, 60], {
    clamp: true,
  });
  const ySunDegRight = useTransform(y_axios, [-130, -155], [0, -75], {
    clamp: true,
  });
  const ySunDegLeft = useTransform(y_axios, [-130, -155], [0, -75], {
    clamp: true,
  });

  useEffect(() => {
    async function fetchWeather() {
      const weathers = await getWeatherByDate(new Date());
      console.log("weather fetched", weathers);
      setWeather(weathers);
    }
    fetchWeather();
  }, []);

  const constraintsRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="w-full h-full bg-black text-white 
  flex flex-col justify-center relative items-center overflow-y-hidden"
    >
      <div
        ref={constraintsRef}
        className="w-full bg-red-950  flex justify-center   items-center absolute scale-1.9 z-10"
      >
        <motion.div
          drag="y"
          dragElastic={0}
          dragMomentum={false}
          dragConstraints={{ top: -155, bottom: 0 }}
          // initial={{ opacity: 0, y:  }}
          onDrag={(event, info) => {
            console.log(y_axios);
          }}
          style={{ y: y_axios, marginTop: y_axios_margin }}
          className="w-auto text-white w-full  h-auto "
        >
          <div className="w-full bg-amber-900 mt-[0vh] flex flex-col items-center justify-center p-0   ">
            <motion.img
              src="/public/svg/quiz/sun_stroke.svg"
              style={{
                marginBottom: yStroke,
                scale: yStrokeScale,
                width: yStrokeW,
                height: "auto",
              }}
              className="w-[45px] h-auto"
            ></motion.img>
            <motion.div className="relative h-[100px] w-full overflow-hidden  flex items-end justify-center">
              {/* Right */}
              <motion.img
                src="/public/svg/quiz/sun_side_line.svg"
                className="absolute  w-[21px] "
                style={{
                  scale: yLineSacle,
                  bottom: ySunLeftLineBottom,
                  marginRight: ySunLineRight,
                  opacity: yLinesOpasity,
                }}
              ></motion.img>
              <motion.img
                src="/public/svg/quiz/sun_side_line.svg"
                className="absolute   w-[21px] rotate-135 bottom-[0px]"
                style={{
                  scale: yLineSacle,
                  bottom: ySunDegBottom,
                  marginRight: ySunDegRight,
                  opacity: yLinesOpasity,
                }}
              ></motion.img>
              {/* LEFT */}
              <motion.img
                src="/public/svg/quiz/sun_side_line.svg"
                className="absolute  w-[21px]  
                "
                style={{
                  scale: yLineSacle,
                  bottom: ySunLeftLineBottom,
                  marginLeft: ySunLineLeft,
                  opacity: yLinesOpasity,
                }}
              ></motion.img>
              <motion.img
                src="/public/svg/quiz/sun_side_line.svg"
                className="absolute   w-[21px] rotate-45 bottom-[0px]"
                style={{
                  scale: yLineSacle,
                  bottom: ySunDegBottom,
                  marginLeft: ySunDegLeft,
                  opacity: yLinesOpasity,
                }}
              ></motion.img>
              {/* SUN */}
              <motion.img
                src="/public/svg/quiz/sun_circle.svg"
                className="w-[85px] bg-black rounded-t-[1000px]  absolute bottom-0 mb-[0px]"
                style={{
                  scale: ySunCircleScale,
                  y: ySunCircle,
                  marginBottom: ySunCircleMargin,
                }}
              ></motion.img>
            </motion.div>
            <motion.img
              src="/public/svg/quiz/sun_line.svg"
              className="w-[113px]"
              style={{ scale: yLineScale }}
            ></motion.img>
          </div>
          {/* <h1 className="font-normal text-[16.24vw]">Утро</h1>
        <div className="flex justify-between">
          <div>1</div>
          <div>2</div>
        </div> */}
        </motion.div>
      </div>
      <motion.div
        style={{ marginTop: y_title_margin, opacity: y_title_opacity }}
      >
        <MorningQuizTitle weather={weather}></MorningQuizTitle>
        <ButtonNextQuiz bg={"#fff"} onClick={}>
          {" "}
        </ButtonNextQuiz>
      </motion.div>
    </div>
  );
}
