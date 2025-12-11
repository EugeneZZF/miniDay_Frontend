import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import BoxContainer from "./BoxContainer";
import {
  getMonthName,
  getYear,
  getDayAbbreviations,
} from "../../model/calendarUtils";
import { useCurrentDate, useSetPrevMonth, useSetNextMonth } from "../../lib/calendarStore";

const CalendarHeader = memo(() => {
  const currentDate = useCurrentDate();
  const setPrevMonth = useSetPrevMonth();
  const setNextMonth = useSetNextMonth();

  const monthName = useMemo(() => getMonthName(currentDate), [currentDate]);
  const year = useMemo(() => getYear(currentDate), [currentDate]);
  const dayAbbreviations = useMemo(() => getDayAbbreviations(), []);

  return (
    <div className="w-full flex flex-col  h-[auto]  ">
      <div className="flex justify-between   border-b-[1px]  border-[#F3F4F6] pl-[0.5rem] pr-[0.5rem]">
        <motion.img
          src="/svg/CalendarStroke.svg"
          className="cursor-pointer w-[2.3rem]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, x: -7 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={setPrevMonth}
        />

        <div className="flex justify-center flex-col  text-center">
          <h4 className="text-[1.4rem] h-[1.9rem] font-medium">{monthName}</h4>
          <h5 className="text-[0.87rem] font-normal text-[#808080]">{year}</h5>
        </div>
        <motion.img
          className="rotate-180 w-[2.3rem] cursor-pointer"
          src="/svg/CalendarStroke.svg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, x: 7 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={setNextMonth}
        />
      </div>
      <div className="w-full flex justify-center ">
        <div
          className="w-full max-w-[501px] mt-[1vw] mb-[1vw] px-[1rem] border-b-[1px]  border-[#F3F4F6]
           flex items-center justify-center
        "
        >
          <div className="flex justify-between w-[84.77vw]">
            {dayAbbreviations.map((day, index) => (
              <BoxContainer key={index} title={day} color="9C9C9C" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

CalendarHeader.displayName = "CalendarHeader";

export default CalendarHeader;
