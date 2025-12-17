import { useState } from "react";
import { motion } from "framer-motion";
import { useStoreQuizPage } from "../lib/quizStore";
import ButtonNextQuiz from "./ButtonNextQuiz";

type QuizScreen1Props = {
  onNext: () => void;
};

export default function QuizScreen1({ onNext }: QuizScreen1Props) {
  const {
    morningWakeUpMood,
    sleepDuration,
    energyLevel,
    first_thought,
    setMorningWakeUpMood,
    setSleepDuration,
    setEnergyLevel,
    setFirstThought,
  } = useStoreQuizPage();

  const [moodValue, setMoodValue] = useState(morningWakeUpMood ?? 50);
  const [thoughtText, setThoughtText] = useState(first_thought ?? "");

  const sleepOptions: Array<{
    value: "<6" | "6-7" | "8-9" | ">10";
    label: string;
  }> = [
    { value: "<6", label: "<6" },
    { value: "6-7", label: "6-7" },
    { value: "8-9", label: "8-9" },
    { value: ">10", label: ">10" },
  ];

  const energyOptions: Array<{
    value: "<6" | "6-7" | "8-9" | ">10";
    label: string;
  }> = [
    { value: "<6", label: "<6" },
    { value: "6-7", label: "6-7" },
    { value: "8-9", label: "8-9" },
    { value: ">10", label: ">10" },
  ];

  const handleMoodChange = (value: number) => {
    setMoodValue(value);
    setMorningWakeUpMood(value);
  };

  const handleNext = () => {
    setFirstThought(thoughtText);
    onNext();
  };

  const canProceed = sleepDuration !== null && energyLevel !== null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full h-full bg-black text-white flex flex-col px-6 py-8"
    >
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
        {/* Title */}
        <h1 className="text-[1.4rem] font-medium mb-8 text-center">
          Какое у тебя настроение с утра?
        </h1>

        {/* Mood Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <img src="/public/svg/quiz/face_angry.svg" />
            <img src="/public/svg/quiz/face_neutral.svg" />
            <img src="/public/svg/quiz/face_funny.svg" />
          </div>
          <div className="relative px-2">
            <input
              type="range"
              min="0"
              max="100"
              value={moodValue}
              onChange={(e) => handleMoodChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #666 0%, #999 ${moodValue}%, #222 ${moodValue}%, #333 100%)`,
              }}
            />
          </div>
        </div>

        {/* Sleep Duration */}
        <div className="mb-7 mt-10 self-center">
          <h2 className="text-[1.5rem] font-medium mb-4">Сколько ты спал?</h2>
          <div className="flex gap-3 flex-wrap">
            {sleepOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSleepDuration(option.value)}
                className={`px-[0.65rem] py-1 rounded-lg border-1 transition-all text-left text-[1rem] ${
                  sleepDuration === option.value
                    ? "bg-white text-black border-white"
                    : "border-white text-white hover:bg-gray-800"
                }`}
              >
                <span className="mr-2">O</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Energy Level */}
        <div className="mb-7 mt-10 self-center">
          <h2 className="text-xl font-medium mb-4">
            Какой у тебя уровень энергии?
          </h2>
          <div className="flex gap-3 flex-wrap">
            {energyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setEnergyLevel(option.value)}
                className={`px-[0.65rem] py-1 rounded-lg border-1 transition-all text-left text-[1rem] ${
                  energyLevel === option.value
                    ? "bg-white text-black border-white"
                    : "border-white text-white hover:bg-gray-800"
                }`}
              >
                <span className="mr-2">O</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* First Thought */}
        <div className="mb-8 mt-[2rem]">
          <h2 className="text-xl font-medium mb-4">
            Что первое пришло в голову?
          </h2>
          <textarea
            value={thoughtText}
            onChange={(e) => setThoughtText(e.target.value)}
            placeholder="Какая-то мысль..."
            className="w-full px-4 py-3 bg-transparent border-2 border-white rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* Next Button */}
      <ButtonNextQuiz onClick={handleNext} disabled={!canProceed} />
    </motion.div>
  );
}
