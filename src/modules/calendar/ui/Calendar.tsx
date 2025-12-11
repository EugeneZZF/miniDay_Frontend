// import { currentDateString } from "../lib/dateUtils";
import TaskBlock from "./TaskComponent/TaskBlock";
import CardComponent from "./CardComponent/CardComponent";
import CalendarComponent from "./CalendarComponent/CalendarComponent";
import { setIsAnimated } from "../lib/calendarStore";

export default function Calendar() {
  // const currentDateTitle = currentDateString();

  return (
    <div className="overflow-x-hidden relative bg-black w-full h-full  font-semibold text-black  flex flex-col">
      {/* content */}

      <TaskBlock />
      <CalendarComponent />
      <CardComponent />
    </div>
  );
}
