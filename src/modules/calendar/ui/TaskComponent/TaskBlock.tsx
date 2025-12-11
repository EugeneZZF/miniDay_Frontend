import { useState } from "react";
import { currentDateString } from "../../model/dateUtils";
import type CalendarTask from "../../lib/types";
import TaskCalendar from "./TaskCalendar";
import { memo } from "react";
import { motion } from "framer-motion";
import { useIsAnimated } from "../../lib/calendarStore";

const tasks: CalendarTask[] = [
  { id: 1, status: "completed", title: "Task title", time: "10:00" },
  { id: 2, status: "in-progress", title: "Another task", time: "04:00" },
  { id: 3, status: "in-progress", title: "Помыть руки", time: "20:00" },
];

function TaskBlock() {
  const [currentDateTitle] = useState(currentDateString);
  const isAnimated = useIsAnimated();

  return (
    <motion.div
      initial={!isAnimated ? false : { opacity: 0, y: 200 }}
      animate={!isAnimated ? false : { opacity: 1, y: 0 }}
      transition={
        isAnimated
          ? undefined
          : {
              duration: 1.5,
              delay: 0.8,
            }
      }
      className="text-black index p-[1rem] z-10 flex flex-col justify-start items-start"
    >
      <p className="text-[1.5rem] w-full font-bold">{currentDateTitle}</p>
      <div className=" h-auto mt-[1.5rem]  gap-[2rem] flex flex-col w-full ">
        {tasks.map((totalTask) => (
          <TaskCalendar key={totalTask.id} task={totalTask} />
        ))}
      </div>
    </motion.div>
  );
}

export default memo(TaskBlock);
