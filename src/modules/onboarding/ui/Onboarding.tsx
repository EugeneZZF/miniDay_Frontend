import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "./WelcomeScreen";
import NameScreen from "./NameScreen";
import PurposeScreen from "./PurposeScreen";
import TimeScreen from "./TimeScreen";
import FormatScreen from "./FormatScreen";
import FinalScreen from "./FinalScreen";
import { useOnboardingStore } from "../lib/onboardingStore";

type OnboardingProps = {
  onComplete: () => void;
};

const TOTAL_SCREENS = 8;

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const setCompleted = useOnboardingStore((state) => state.setCompleted);

  const handleNext = () => {
    if (currentScreen < TOTAL_SCREENS - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      setCompleted(true);
      localStorage.setItem("onboardingCompleted", "true");
      onComplete();
    }
  };

  const screens = [
    <WelcomeScreen key="welcome1" text="Привет!" onNext={handleNext} />,
    <WelcomeScreen key="welcome2" text="Это MiniDay" onNext={handleNext} />,
    <WelcomeScreen
      key="welcome3"
      text="Давай настроим приложение под тебя"
      onNext={handleNext}
      textSize="1.6rem"
    />,
    <NameScreen key="name" onNext={handleNext} />,
    <PurposeScreen key="purpose" onNext={handleNext} />,
    <TimeScreen key="time" onNext={handleNext} />,
    <FormatScreen key="format" onNext={handleNext} />,
    <FinalScreen key="final" onNext={handleNext} />,
  ];

  return (
    // <div className="w-full h-screen bg-black overflow-hidden">
    <div className="w-full h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
