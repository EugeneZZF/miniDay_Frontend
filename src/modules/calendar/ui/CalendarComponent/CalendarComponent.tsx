import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

export default function CalendarComponent() {
  return (
    <div className="bg-[rgba(255,255,255,0.91)] z-20 w-[100%] pv-[1rem] h-[auto] flex flex-col ">
      <CalendarHeader
      // currentDate={currentDate}
      // onPrevMonth={setPrevMonth}
      // onNextMonth={setNextMonth}
      />

      <CalendarBody
      // currentDate={currentDate}
      // selectedDate={selectedDate}
      // onDateSelect={setSelectedDate}
      />
    </div>
  );
}
