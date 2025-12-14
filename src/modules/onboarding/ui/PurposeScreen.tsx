import { motion } from "framer-motion";
import { useOnboardingStore } from "../lib/onboardingStore";
import type { PurposeOption } from "../lib/onboardingStore";
import {
  ChartNoAxesCombined,
  Briefcase,
  Leaf,
  Heart,
  ChevronRight,
} from "lucide-react";

interface PurposeScreenProps {
  onNext: () => void;
}

const purposeOptions: {
  value: PurposeOption;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  color: string;
}[] = [
  {
    value: "productivity",
    label: "Productivity",
    icon: ChartNoAxesCombined,
    iconColor: "#F56565",
    color: "bg-[#312226]",
  },
  {
    value: "work",
    label: "Work",
    icon: Briefcase,
    iconColor: "#5C73E6",
    color: "bg-[#212433]",
  },
  {
    value: "structure",
    label: "Structure the day",
    icon: Leaf,
    iconColor: "#30A36C",
    color: "bg-[#1D2827]",
  },
  {
    value: "wellbeing",
    label: "Improve your well-being / habits",
    icon: Heart,
    iconColor: "#D6B436",
    color: "bg-[#2A261B]",
  },
];

export default function PurposeScreen({ onNext }: PurposeScreenProps) {
  const purpose = useOnboardingStore((state) => state.purpose);
  const setPurpose = useOnboardingStore((state) => state.setPurpose);

  const handleSelect = (value: PurposeOption) => {
    setPurpose(value);
  };

  const handleNext = () => {
    if (purpose) {
      onNext();
    }
  };

  return (
    <div className="w-full h-screen bg-[#1b1b1f] text-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-8  align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <p className="text-sm text-gray-400 mb-4">Что будет использовать</p> */}
          <h2 className="text-2xl font-medium mb-8 flex items-center justify-center text-center">
            Для чего ты будешь вести дневник?
          </h2>
          <div className="space-y-4">
            {purposeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = purpose === option.value;
              return (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
                    isSelected
                      ? `${option.color} text-white`
                      : `bg-gray-900 text-white  hover:${option.color} `
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon
                    className="w-6 h-6"
                    {...(isSelected
                      ? { style: { color: option.iconColor } }
                      : {})}
                  />
                  <span
                    {...(isSelected
                      ? { style: { color: option.iconColor } }
                      : {})}
                    className="text-left flex-1"
                  >
                    {option.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
      <div className="px-8 pb-8 flex  align-middle justify-center">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleNext}
          disabled={!purpose}
          className={`w-[15rem] flex items-center justify-center h-[2.5rem] text-[1.1rem] 
             rounded-lg text-lg font-medium transition-opacity ${
               purpose
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
