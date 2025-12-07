import useState from "react";
// import { currentDateString } from "../lib/dateUtils";
import TaskBlock from "./TaskBlock";
import CardComponent from "./CardComponent";

export default function Calendar() {
  // const currentDateTitle = currentDateString();

  return (
    <div className="overflow-hidden relative bg-white w-full h-full p-6 text-[5.4vw] font-semibold text-black p-[2.8vw] flex flex-col">
      {/* content */}
      <TaskBlock />
      <CardComponent />
    </div>
  );
}
