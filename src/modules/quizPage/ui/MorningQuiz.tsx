import { motion, useMotionValue, useTransform } from "framer-motion";
// import { fire } from "lucide-react";
import { getWeatherByDate } from "../lib/weatherApi";
import { useState, useRef, useEffect } from "react";

export default function MorningQuiz() {
  const vh = window.innerHeight / 100;
  const vw = window.innerWidth / 100;
  async function fetchWeather() {
    const date = new Date();
    const weather = await getWeatherByDate(date);
    console.log("weather fetched", weather);
  }

  const y_axios = useMotionValue(0);
  const yStroke = useTransform(y_axios, [-190, 0], [0 * vh, -15 * vh]);
  const yStrokeScale = useTransform(y_axios, [-200, 0], [1.25, 0.5], {
    clamp: true,
  });
  const yLineScale = useTransform(y_axios, [-200, 0], [1.45, 0.5], {
    clamp: true,
  });
  // солнышко
  const ySunCircleScale = useTransform(y_axios, [-145, 0], [1.35, 0.5], {
    clamp: true,
  });
  const ySunCircle = useTransform(y_axios, [0, -145], [0, -5 * vh], {
    clamp: true,
  });
  const ySunCircleMargin = useTransform(y_axios, [0, -145], [-8 * vh, 0], {
    clamp: true,
  });
  const ySunLineLeft = useTransform(y_axios, [-130, -145], [5.4 * vh, 1], {
    clamp: true,
  });
  const ySunLineRight = useTransform(y_axios, [-130, -145], [5.4 * vh, 1], {
    clamp: true,
  });

  // слевое солнышко линия
  const ySunLeftLineBottom = useTransform(
    y_axios,
    [0, -145],
    [-1 * vh, 4.3 * vh],
    {
      clamp: true,
    }
  );
  const yLinesOpasity = useTransform(y_axios, [0, -145], [0, 1], {
    clamp: true,
  });

  //   deg up
  const ySunDegBottom = useTransform(
    y_axios,
    [0, -145],
    [-30 * vh, 11.3 * vh],
    {
      clamp: true,
    }
  );
  const ySunDegRight = useTransform(
    y_axios,
    [-130, -145],
    [11.4 * vw, 5 * vw],
    {
      clamp: true,
    }
  );
  const ySunDegLeft = useTransform(y_axios, [-130, -145], [11.4 * vw, 5 * vw], {
    clamp: true,
  });

  useEffect(() => {
    async function fetchWeather() {
      const weather = await getWeatherByDate(new Date());
      console.log("weather fetched", weather);
    }
    fetchWeather();
  }, []);

  const constraintsRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="w-full h-screen bg-black text-white 
  flex justify-center relative items-center"
    >
      <div
        ref={constraintsRef}
        className="w-full bg-red-950 flex justify-center overflow-hidden h-[87vh] items-center"
      >
        <motion.div
          drag="y"
          dragElastic={0}
          dragMomentum={false}
          dragConstraints={{ top: -155, bottom: 0 }}
          // initial={{ opacity: 0, y:  }}
          onDrag={(event, info) => {
            console.log(info.offset.y);
          }}
          style={{ y: y_axios }}
          className="w-auto text-white  h-auto"
        >
          <div className="w-full bg-amber-900  flex flex-col items-center justify-center p-0   ">
            <motion.img
              src="/public/svg/quiz/sun_stroke.svg"
              style={{ marginBottom: yStroke, scale: yStrokeScale }}
              className="w-[12.4vw] "
            ></motion.img>
            <motion.div
              className="relative h-[13.8125vh] w-full overflow-hidden  flex items-end justify-center "
              //   style={{ scale: yStrokeScale }}
            >
              {/* Right */}
              <motion.img
                src="/public/svg/quiz/sun_side_line.svg"
                className="absolute  w-[5.61vw] bottom-[4.3vh]"
                style={{
                  scale: yStrokeScale,
                  bottom: ySunLeftLineBottom,
                  right: ySunLineRight,
                  opacity: yLinesOpasity,
                }}
              ></motion.img>
              <motion.img
                src="/public/svg/quiz/sun_side_line.svg"
                className="absolute  w-[5.61vw] rotate-135 bottom-[4.3vh]"
                style={{
                  scale: yStrokeScale,
                  bottom: ySunDegBottom,
                  right: ySunDegRight,
                  opacity: yLinesOpasity,
                }}
              ></motion.img>
              {/* LEFT */}
              <motion.img
                src="/public/svg/quiz/sun_side_line.svg"
                className="absolute  w-[5.61vw] bottom-[4.3vh]"
                style={{
                  scale: yStrokeScale,
                  bottom: ySunLeftLineBottom,
                  left: ySunLineLeft,
                  opacity: yLinesOpasity,
                }}
              ></motion.img>
              <motion.img
                src="/public/svg/quiz/sun_side_line.svg"
                className="absolute  w-[5.61vw] rotate-45 bottom-[4.3vh]"
                style={{
                  scale: yStrokeScale,
                  bottom: ySunDegBottom,
                  left: ySunDegLeft,
                  opacity: yLinesOpasity,
                }}
              ></motion.img>
              {/* SUN */}
              <motion.img
                src="/public/svg/quiz/sun_circle.svg"
                className="w-[12.38vw] bg-black rounded-t-4xl  absolute bottom-0 mb-[-8vh]"
                style={{
                  scale: ySunCircleScale,
                  y: ySunCircle,
                  marginBottom: ySunCircleMargin,
                }}
              ></motion.img>
            </motion.div>
            <motion.img
              src="/public/svg/quiz/sun_line.svg"
              className="w-[36vw]"
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
    </div>
  );
}
