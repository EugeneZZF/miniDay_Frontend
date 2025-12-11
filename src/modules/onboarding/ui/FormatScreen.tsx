import { useState } from "react";
import { motion } from "framer-motion";
import { useOnboardingStore } from "../lib/onboardingStore";
import type { FormatOption } from "../lib/onboardingStore";
import { ChevronDown } from "lucide-react";

interface FormatScreenProps {
  onNext: () => void;
}

const formatOptions: {
  value: FormatOption;
  label: string;
  description: string;
}[] = [
  {
    value: "mini-quiz",
    label: "Мини-квиз (3 вопроса в день)",
    description: "Мини-квиз (3 вопроса в день)",
  },
  {
    value: "full-diary",
    label: "Полный дневник (7-10 вопросов)",
    description: "Полный дневник (7-10 вопросов)",
  },
  {
    value: "free-entry",
    label: "Свободная запись",
    description: "Свободная запись",
  },
];

export default function FormatScreen({ onNext }: FormatScreenProps) {
  const format = useOnboardingStore((state) => state.format);
  const setFormat = useOnboardingStore((state) => state.setFormat);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedFormat = formatOptions.find((opt) => opt.value === format);

  const handleSelect = (value: FormatOption) => {
    setFormat(value);
    setIsDropdownOpen(false);
  };

  const handleNext = () => {
    if (format) {
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
          {/* <p className="text-sm text-gray-400 mb-4">Формат заполения</p> */}
          <h2 className="text-2xl font-medium mb-8">
            Какой формат тебе ближе?
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-transparent  border-b-[#D9D9D9] border-b text-white text-lg pb-2 flex items-center justify-between focus:outline-none"
            >
              <span className={selectedFormat ? "" : "text-gray-500"}>
                {selectedFormat ? selectedFormat.label : "Твой формат"}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0  bg-black mt-2 mb-2 border-b-[#D9D9D9] border-b  overflow-hidden z-10"
              >
                {formatOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
                      format === option.value ? "bg-white text-black" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          {format && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 space-y-2"
            >
              {formatOptions.map((option) => (
                <div
                  key={option.value}
                  className={`text-sm ${
                    format === option.value ? "text-white" : "text-gray-500"
                  }`}
                >
                  • {option.description}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
      <div className="px-8 pb-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleNext}
          disabled={!format}
          className={`w-full py-4 rounded-lg text-lg font-medium transition-opacity ${
            format
              ? "bg-white text-black hover:opacity-90"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          Вперед &gt;
        </motion.button>
      </div>
    </div>
  );
}
