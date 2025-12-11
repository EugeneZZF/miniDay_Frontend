import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOnboardingStore } from "../lib/onboardingStore";
import { ChevronRight } from "lucide-react";

interface NameScreenProps {
  onNext: () => void;
}

export default function NameScreen({ onNext }: NameScreenProps) {
  const name = useOnboardingStore((state) => state.name);
  const setName = useOnboardingStore((state) => state.setName);
  const [inputValue, setInputValue] = useState(name);

  useEffect(() => {
    setInputValue(name);
  }, [name]);

  const handleNext = () => {
    if (inputValue.trim()) {
      setName(inputValue.trim());
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
          <p className="text-sm text-gray-400 mb-4">Экран имя</p>
          <h2 className="text-2xl font-medium mb-8">Как к тебе обращаться?</h2>
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Твое имя"
              className="w-full bg-transparent border-b-2 border-white text-white text-lg pb-2 focus:outline-none focus:border-white placeholder:text-gray-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleNext();
                }
              }}
            />
          </div>
        </motion.div>
      </div>
      <div className="px-8 pb-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleNext}
          disabled={!inputValue.trim()}
          className={`w-full text-[1.3rem] py-4 rounded-lg text-lg font-medium transition-opacity ${
            inputValue.trim()
              ? "bg-white text-black hover:opacity-90"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          {/* <p className="text-[1.3rem]">Вперед</p>{" "} */}
          Вперед
          <ChevronRight className="inline-block w-[2rem]" />
        </motion.button>
      </div>
    </div>
  );
}
