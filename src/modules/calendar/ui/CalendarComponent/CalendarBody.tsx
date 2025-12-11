import { memo, useMemo, useCallback } from "react";
import BoxContainer from "./BoxContainer";
import { generateCalendarDays } from "../../model/calendarUtils";
import { useCurrentDate, useSelectedDate, useSetSelectedDate } from "../../lib/calendarStore";

const CalendarBody = memo(() => {
  const currentDate = useCurrentDate();
  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  // ✅ ЧИСТЫЕ вычисления, без setState
  const calendarDays = useMemo(
    () => generateCalendarDays(currentDate, selectedDate),
    [currentDate, selectedDate]
  );

  // ✅ Разбивка на недели
  const weeks = useMemo(() => {
    const result: (typeof calendarDays)[] = [];

    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }

    return result;
  }, [calendarDays]);

  // Мемоизируем обработчик клика
  const handleDateClick = useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  return (
    <div className="w-full flex justify-center pb-[0.5rem]">
      <div className="max-w-[501px] flex flex-col pt-[1rem]">
        <div className="w-full flex flex-col justify-center px-[1rem]">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="w-full max-w-[501px] mt-[1vw] mb-[1vw] flex items-center justify-center"
            >
              <div className="flex justify-between w-[84.77vw]">
                {week.map((day) => {
                  // Создаем стабильный key из даты
                  const dateKey = `${day.date.getFullYear()}-${day.date.getMonth()}-${day.date.getDate()}`;
                  return (
                    <div
                      key={dateKey}
                      className="cursor-pointer"
                      onClick={() => handleDateClick(day.date)}
                    >
                      <BoxContainer
                        title={day.dayNumber}
                        color={day.isCurrentMonth ? "000000" : "9C9C9C"}
                        isSelected={day.isSelected}
                        isToday={day.isToday}
                        isOtherMonth={!day.isCurrentMonth}
                        hasEvent={day.hasEvent || day.isSelected}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

CalendarBody.displayName = "CalendarBody";

export default CalendarBody;
