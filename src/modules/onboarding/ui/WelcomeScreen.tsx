import { motion } from "framer-motion";

interface WelcomeScreenProps {
  text: string;
  onNext: () => void;
}

export default function WelcomeScreen({ text, onNext }: WelcomeScreenProps) {
  const lines = text.split('\n');
  
  return (
    <div
      onClick={onNext}
      className="w-full h-screen bg-black text-white flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-8"
      >
        <h1 className="text-4xl font-medium leading-relaxed">
          {lines.map((line, index) => (
            <span key={index}>
              {line}
              {index < lines.length - 1 && <br />}
            </span>
          ))}
        </h1>
      </motion.div>
      {/* <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        onClick={onNext}
        className="absolute bottom-8 right-8 text-white text-lg hover:opacity-80 transition-opacity"
      >
        Вперед &gt;
      </motion.button> */}
    </div>
  );
}
