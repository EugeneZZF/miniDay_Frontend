type ButtonNextQuizProps = {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  startScreen?: boolean;
};

export default function ButtonNextQuiz({
  onClick,
  disabled = false,
  children = "Приступить",
  startScreen = false,
}: ButtonNextQuizProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        py-4 rounded-2xl font-medium text-lg
        transition-all
         bottom-10
        w-[60vw]
        
        self-center
        ${
          disabled
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100 active:bg-gray-200"
        }
      `}
    >
      {children}
    </button>
  );
}
