import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface FinalScreenProps {
  onNext: () => void;
}

export default function FinalScreen({ onNext }: FinalScreenProps) {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* <p className="text-sm text-gray-400 mb-4">Что отслеживать</p> */}
          <h2 className="text-4xl font-medium">А теперь самое важное</h2>
        </motion.div>
      </div>
      <div className="px-8 pb-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onNext}
          className="w-full text-[1.3rem] py-4 rounded-lg text-lg font-medium bg-white text-black hover:opacity-90 transition-opacity"
        >
          Вперед
          <ChevronRight className="inline-block w-[2rem]" />
        </motion.button>
      </div>
    </div>
  );
}
