import { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

export default function CalendarComponent() {
  return (
    <div className="bg-white z-10 w-[100%] pv-[1rem] h-[20rem] flex flex-col ">
      <CalendarHeader />

      <CalendarBody />
    </div>
  );
}
