import { motion } from "framer-motion";
import BoxContainer from "./BoxContainer";

type CalendarHeaderProps = {};

export default function CalendarHeader() {
  return (
    <div className="w-full flex flex-col  h-[auto] pt-[1rem] ">
      <div className="flex justify-between mt-[1.5rem]  border-b-[1px] border-t-[1px] border-[#F3F4F6] pl-[0.5rem] pr-[0.5rem]">
        <motion.img
          src="/svg/CalendarStroke.svg"
          className="cursor-pointer w-[2.3rem]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, x: -7 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />

        <div className="flex justify-center flex-col  text-center">
          <h4 className="text-[1.4rem] h-[1.9rem] font-medium">Декабрь</h4>
          <h5 className="text-[0.87rem] font-normal text-[#808080]">2024</h5>
        </div>
        <motion.img
          className="rotate-180 w-[2.3rem]"
          src="./public/svg/CalendarStroke.svg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, x: -7 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        ></motion.img>
      </div>
      <div className="w-full flex justify-center ">
        <div
          className="w-full max-w-[501px] mt-[1vw] mb-[1vw] px-[1rem] border-b-[1px]  border-[#F3F4F6]
           flex items-center justify-center
        "
        >
          <div className="flex justify-between w-[84.77vw]">
            <BoxContainer title="Пн" color="9C9C9C" />
            <BoxContainer title="Вт" color="9C9C9C" />
            <BoxContainer title="Ср" color="9C9C9C" />
            <BoxContainer title="Чт" color="9C9C9C" />
            <BoxContainer title="Пт" color="9C9C9C" />
            <BoxContainer title="Сб" color="9C9C9C" />
            <BoxContainer title="Вс" color="9C9C9C" />
          </div>
        </div>
      </div>
    </div>
  );
}
