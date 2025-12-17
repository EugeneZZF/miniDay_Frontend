import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStoreQuizPage } from "../lib/quizStore";
import ButtonNextQuiz from "./ButtonNextQuiz";

type QuizScreen2Props = {
  onNext: () => void;
};

export default function QuizScreen2({ onNext }: QuizScreen2Props) {
  const {
    important_matter,
    sleepHours,
    oneThing,
    setImportantMatter,
    setSleepHours,
    setOneThing,
  } = useStoreQuizPage();

  const [selectedMatter, setSelectedMatter] = useState(important_matter ?? "");
  const [sleepInput, setSleepInput] = useState(sleepHours?.toString() ?? "");
  const [oneThingText, setOneThingText] = useState(oneThing ?? "");
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customMatterText, setCustomMatterText] = useState("");

  const [isMatterMenuOpen, setIsMatterMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMatterMenuOpen(false);
      }
    };

    if (isMatterMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMatterMenuOpen]);

  const matterOptions = [
    { id: "family", label: "Семья", icon: "/public/svg/quiz/family.svg" },
    { id: "sport", label: "Спорт", icon: "/public/svg/quiz/sport.svg" },
    {
      id: "custom",
      label: "Свободная запись...",
      icon: "/public/svg/quiz/freewriting.svg",
    },
  ];

  const handleMatterSelect = (option: (typeof matterOptions)[0]) => {
    if (option.id === "custom") {
      setIsCustomInput(true);
      setSelectedMatter("");
      setIsMatterMenuOpen(false);
    } else {
      setIsCustomInput(false);
      setCustomMatterText("");
      setSelectedMatter(option.label);
      setImportantMatter(option.label);
      setIsMatterMenuOpen(false);
    }
  };

  const handleCustomMatterChange = (value: string) => {
    setCustomMatterText(value);
    setSelectedMatter(value);
    setImportantMatter(value);
  };

  const handleSleepChange = (value: string) => {
    setSleepInput(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setSleepHours(numValue);
    } else if (value === "") {
      setSleepHours(null);
    }
  };

  const handleOneThingChange = (value: string) => {
    setOneThingText(value);
  };

  const handleNext = () => {
    setOneThing(oneThingText);
    onNext();
  };

  const canProceed =
    selectedMatter !== "" && sleepInput !== "" && oneThingText !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full h-full bg-black text-white flex flex-col px-6 py-8"
    >
      <div className="flex-1 flex flex-col py-[4rem] items-center w-full overflow-y-auto">
        <div className="w-[80vw] relative flex flex-col items-center z-20">
          <h2 className="text-2xl">Что самое важное сегодня?</h2>

          {/* Matter Selector */}
          <AnimatePresence mode="wait">
            {!isCustomInput ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                ref={menuRef}
                className="w-[75%] relative"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMatterMenuOpen((prev) => !prev);
                  }}
                  className="w-full flex justify-between mt-[2rem] cursor-pointer"
                >
                  <div className="text-[1rem]">{selectedMatter || "...."}</div>
                  <motion.img
                    src="/public/svg/quiz/stroke_menu.svg"
                    animate={{ rotate: isMatterMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="w-full h-[1px] bg-[#D9D9D9] z-10 absolute bottom-0"></div>
                <div className="w-full h-auto flex-col">
                  <motion.div
                    className="w-[75%] h-auto flex flex-col overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: isMatterMenuOpen ? 1 : 0,
                      height: isMatterMenuOpen ? "auto" : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isMatterMenuOpen ? 200 : 400,
                      damping: isMatterMenuOpen ? 20 : 40,
                      mass: isMatterMenuOpen ? 1.5 : 1,
                      bounce: isMatterMenuOpen ? 1 : 0,
                    }}
                  >
                    {matterOptions.map((option, index) => (
                      <motion.div
                        key={option.id}
                        onClick={() => handleMatterSelect(option)}
                        className="flex w-full items-center pl-1.5 h-[2.5rem] gap-5 cursor-pointer hover:opacity-70 transition-opacity"
                        initial={{ y: -15 }}
                        animate={{
                          y: isMatterMenuOpen ? 0 : -40 * (index + 1),
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          className="w-[1.5rem]"
                          src={option.icon || "/public/svg/quiz/family.svg"}
                          alt={option.label}
                        />
                        <p className="text-[1rem]">{option.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="textarea"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-[75%] mt-[2rem] flex "
              >
                <textarea
                  value={customMatterText}
                  onChange={(e) => handleCustomMatterChange(e.target.value)}
                  placeholder="Введите ваше дело..."
                  className="w-full h-auto pl-[0.5rem] pt-[0.5rem] pb-[0.5rem]
                bg-transparent border-b-[1px] border-[#D9D9D9]
                   text-[0.7rem] text-white placeholder-gray-500 focus:outline-none
                    focus:border-gray-400 relative"
                  rows={1}
                  autoFocus
                ></textarea>
                <motion.div
                  onClick={() => {
                    setIsCustomInput(false);
                    if (!customMatterText) {
                      setSelectedMatter("");
                      setImportantMatter("");
                    }
                  }}
                  animate={{ rotate: isMatterMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 absolute z-20 right-0 mr-[4rem] mb-[0.5rem]                
                    text-sm text-gray-400 hover:text-white transition-colors"
                >
                  х
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sleep Duration Input */}
          <div className="w-[60vw]  mt-[5rem]">
            <h2 className="text-xl font-medium mb-4">Сколько ты спал?</h2>
            <div className="relative flex items-center">
              <input
                type="number"
                value={sleepInput}
                onChange={(e) => handleSleepChange(e.target.value)}
                placeholder="Часы"
                min="0"
                max="24"
                className="w-full px-4 py-3 bg-transparent border-b-[1px] border-[#D9D9D9]  text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 pr-12"
              />
              <motion.img
                src="/public/svg/quiz/bed.svg"
                className="w-[1.3rem] absolute right-4"
              ></motion.img>
            </div>
          </div>

          {/* One Thing */}
          <div className="w-[60vw] mt-[5rem] flex flex-col items-center justify-center">
            <h2 className="text-[1rem] font-medium mb-4">
              Если сегодня получится только одно — что это должно быть? Почему?
            </h2>
            <textarea
              value={oneThingText}
              onChange={(e) => handleOneThingChange(e.target.value)}
              placeholder="Какая-то мысль..."
              className="w-[100%]  bg-transparent text-xs p-[0.5rem] border-[1px] border-[#D9D9D9] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Next Button */}
      <ButtonNextQuiz
        onClick={handleNext}
        disabled={!canProceed}
        startScreen={false}
      />
    </motion.div>
  );
}
