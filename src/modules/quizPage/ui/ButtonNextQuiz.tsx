type ButtonNextQuizProps = {
  bg: string;
  onClick: () => void;
};

export default function ButtonNextQuiz({ bg, onClick }: ButtonNextQuizProps) {
  return (
    <button onClick={onClick} className={`w-full h-2rem bg-[${bg}]`}>
      312
    </button>
  );
}
