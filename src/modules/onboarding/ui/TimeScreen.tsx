import { useState } from "react";
import { motion } from "framer-motion";
import { useOnboardingStore } from "../lib/onboardingStore";
import { Clock, Plus, X, ChevronRight } from "lucide-react";

interface TimeScreenProps {
  onNext: () => void;
}

export default function TimeScreen({ onNext }: TimeScreenProps) {
  const times = useOnboardingStore((state) => state.times);
  const addTime = useOnboardingStore((state) => state.addTime);
  const removeTime = useOnboardingStore((state) => state.removeTime);
  const [inputValue, setInputValue] = useState("");

  const handleAddTime = () => {
    if (inputValue.trim()) {
      addTime(inputValue.trim());
      setInputValue("");
    }
  };

  const handleNext = () => {
    if (times.length > 0) {
      onNext();
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-400 mb-4">Дата заполнения</p>
          <h2 className="text-2xl font-medium mb-8">
            Когда тебе удобно заполнять дневник?
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Твое время"
                className="w-full bg-transparent border-b-2 border-white text-white text-lg pb-2 pr-10 focus:outline-none focus:border-white placeholder:text-gray-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddTime();
                  }
                }}
              />
              <Clock className="absolute right-0 top-0 w-5 h-5 text-gray-400" />
            </div>
            {times.length > 0 && (
              <div className="space-y-2 mt-4">
                {times.map((time, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between bg-gray-900 p-3 rounded-lg"
                  >
                    <span>{time}</span>
                    <button
                      onClick={() => removeTime(index)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
            <button
              onClick={handleAddTime}
              disabled={!inputValue.trim()}
              className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
      <div className="px-8 pb-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleNext}
          disabled={times.length === 0}
          className={`w-full text-[1.3rem] py-4 rounded-lg text-lg font-medium transition-opacity ${
            times.length > 0
              ? "bg-white text-black hover:opacity-90"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          Вперед
          <ChevronRight className="inline-block w-[2rem]" />
        </motion.button>
      </div>
    </div>
  );
}

