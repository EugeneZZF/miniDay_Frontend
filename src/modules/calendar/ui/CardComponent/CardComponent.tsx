import React from "react";
import "./Card.css"; // Подключаем файл с кастомными анимациями

const CardComponent = () => {
  return (
    <div className="flex items-center justify-around w-full max-w-[900px] mx-auto mt-12 absolute left-0 -ml-[30vw]">
      <div className="flex-basis-[30%] p-12 bg-[#F8F9FA] text-white animate-fluid01 "></div>
    </div>
  );
};

export default CardComponent;
