import "./Card.css"; // Подключаем файл с кастомными анимациями

const CardComponent = () => {
  return (
    <div className="flex items-center justify-around w-[2rem] max-w-[2px]  mx-auto mt-12 absolute left-0 ml-[20vw]">
      <div className="flex-basis-[30%] p-12 bg-[#F8F9FA] text-white animate-fluid01 "></div>
    </div>
  );
};

export default CardComponent;
