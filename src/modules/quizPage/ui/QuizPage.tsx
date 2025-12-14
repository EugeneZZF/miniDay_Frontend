import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MorningQuiz from "./morningQuiz";
const TOTAL_SCREENS = 4;

export default function QuizPage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const handleNext = () => {
    setFlipped(!flipped);
    setCurrentScreen((perv) => perv + 1);
  };
  const screens = [
    <QuizPage1
      key="screen1"
      bg="#ffcc00"
      currentScreen={currentScreen}
      handleNext={handleNext}
    ></QuizPage1>,
    <QuizPage1
      key="screen2"
      bg="#12323a"
      currentScreen={currentScreen}
      handleNext={handleNext}
    ></QuizPage1>,
    <QuizPage1
      key="screen3"
      bg="gray"
      currentScreen={currentScreen}
      handleNext={handleNext}
    ></QuizPage1>,
    <QuizPage1
      key="screen4"
      bg="darkgray"
      currentScreen={currentScreen}
      handleNext={handleNext}
    ></QuizPage1>,
  ];

  return (
    <div
      className="w-full h-screen bg-amber-500
     flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {/* {screens[currentScreen]} */}
        <MorningQuiz />
      </AnimatePresence>
    </div>
  );
}

function QuizPage1({
  currentScreen,
  handleNext,
  bg,
}: {
  currentScreen: number;
  handleNext: () => void;
  bg: string;
}) {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
      key={currentScreen} // важно, чтобы AnimatePresence видел смену компонента
      initial={{ rotateX: 180, opacity: 0.5, perspective: "800px" }}
      animate={{ rotateX: 0, opacity: 1, perspective: "0px" }}
      exit={{ rotateX: -180, opacity: 0, perspective: "800px" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        backgroundColor: bg,
        backfaceVisibility: "hidden",
      }}
      className="w-[10rem] h-[10rem] h-full text-white flex items-center justify-center"
      onClick={handleNext}
    >
      <h1 className="text-3xl font-bold">{bg}</h1>
    </motion.div>
  );
}
