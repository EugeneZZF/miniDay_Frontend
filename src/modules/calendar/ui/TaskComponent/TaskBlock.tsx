import { useState } from "react";
import { currentDateString } from "../../lib/dateUtils";
import type { CalendarTask } from "../../model/types";
import TaskCalendar from "./TaskCalendar";
import { memo } from "react";

const tasks: CalendarTask[] = [
  { id: 1, status: "completed", title: "Task title", time: "10:00" },
  { id: 2, status: "in-progress", title: "Another task", time: "04:00" },
  { id: 3, status: "in-progress", title: "Помыть руки", time: "20:00" },
];

function TaskBlock() {
  const [currentDateTitle] = useState(currentDateString);

  return (
    <div className="text-black index  p-[1rem] z-20 flex flex-col justify-start items-start">
      <p className="text-[1.5rem] w-full font-bold">{currentDateTitle}</p>
      <div className="bg-amber-100 h-auto mt-[1.5rem]  gap-[2rem] flex flex-col w-full ">
        {tasks.map((totalTask) => (
          <TaskCalendar key={totalTask.id} task={totalTask} />
        ))}
      </div>
    </div>
  );
}

export default memo(TaskBlock);
