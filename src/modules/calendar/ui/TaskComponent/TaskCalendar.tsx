import type CalendarTask from "../../model/types";
import { taskWarningTime } from "../../lib/dateUtils";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

type Props = {
  task: CalendarTask;
};
function TaskCalendar({ task }: Props) {
  const isWarnint = useMemo(() => taskWarningTime(task.time), [task.time]);

  return (
    <div className="w-full h-[3.7rem] bg-white stroke-1 flex pl-[1.6rem] pr-[1.6rem] items-center border-[1px] border-[#F6F7F8] rounded-2xl">
      <div className="w-[2.1rem] h-[2.1rem] bg-black rounded-full flex justify-center items-center">
        {task.status === "completed" ? (
          <img src="public/svg/complete.svg" className="w-[2.1rem]" />
        ) : isWarnint ? (
          <motion.img
            src="public/svg/prepare.svg"
            className="w-[10.1rem] rounded-full"
            animate={{ opacity: [0.2, 1] }}
            initial={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 0.9,
              repeatType: "reverse",
              repeatDelay: 0,
            }}
          />
        ) : (
          <img src="public/svg/prepare.svg" className="w-[5.1rem]" />
        )}
      </div>

      <div className="flex items-start flex-col gap-[0.68rem] ml-[1.4rem]">
        <h4 className="text-[1rem] p-0 m-0 h-[0.8rem] font-semibold">
          {task.title}
        </h4>
        <p className="text-[0.68rem] text-[#808080] font-medium">
          {task.status}
        </p>
      </div>

      {/* Время справа */}
      <div className="ml-auto  text-right flex items-center">
        <p className="text-[0.8rem] text-[#808080] font-medium">{task.time}</p>
      </div>
    </div>
  );
}

export default memo(TaskCalendar);
