import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MorningQuiz from "./morningQuiz";
import MorningQuizSleep from "./MorningQuizSleep";
const TOTAL_SCREENS = 4;

export default function QuizPage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const handleNext = () => {
    setFlipped(!flipped);
    setCurrentScreen((perv) => perv + 1);
  };
  const screens = [
    // <QuizPage1
    //   key="screen1"
    //   bg="#ffcc00"
    //   currentScreen={currentScreen}
    //   handleNext={handleNext}
    // ></QuizPage1>,
    <MorningQuiz key="screen_1"></MorningQuiz>,
    <MorningQuizSleep key="screen_2"></MorningQuizSleep>,
  ];

  return (
    <div
      className="w-full h-screen bg-amber-500
     flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {/* {screens[currentScreen]} */}
        {screens.map((screen, index) => (
          <div key={index}>{screen}</div>
        ))}
      </AnimatePresence>
    </div>
  );
}
