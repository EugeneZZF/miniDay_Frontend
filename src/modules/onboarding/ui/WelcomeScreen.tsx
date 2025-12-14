import { motion } from "framer-motion";

interface WelcomeScreenProps {
  text: string;
  onNext: () => void;
  textSize?: string;
}

export default function WelcomeScreen({
  text,
  onNext,
  textSize,
}: WelcomeScreenProps) {
  const lines = text.split("\n");

  return (
    <div
      onClick={onNext}
      className="w-full h-screen bg-black text-white flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-8"
      >
        <h1
          className="font-medium leading-relaxed"
          style={{
            fontSize: textSize ? textSize : "2.25rem",
          }}
        >
          {text}
        </h1>
      </motion.div>
    </div>
  );
}
