import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import QuizScreen1 from "./QuizScreen1";
import QuizScreen2 from "./QuizScreen2";
import MorningQuiz from "./MorningQuiz";

export default function QuizPage() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    setCurrentScreen((prev) => prev + 1);
  };

  const screens = [
    <MorningQuiz key="screen_1" onNext={handleNext} />,
    <QuizScreen1 key="screen_2" onNext={handleNext} />,
    <QuizScreen2 key="screen_3" onNext={handleNext} />,
  ];

  return (
    <div className="w-full h-full bg-black flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen < screens.length && (
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            {screens[currentScreen]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
