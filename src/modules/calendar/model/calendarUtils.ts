import {
  startOfMonth,
  endOfMonth,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ru } from "date-fns/locale/ru";

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasEvent: boolean;
}

export const getMonthName = (date: Date): string => {
  return format(date, "LLLL", { locale: ru });
};

export const getYear = (date: Date): string => {
  return format(date, "yyyy");
};

export const generateCalendarDays = (
  currentDate: Date,
  selectedDate?: Date
): CalendarDay[] => {
  const normalizedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const monthStart = startOfMonth(normalizedDate);
  const monthEnd = endOfMonth(normalizedDate);

  const monthStartDay = monthStart.getDay();

  const daysToSubtract = monthStartDay === 0 ? 6 : monthStartDay - 1;
  const calendarStart = addDays(monthStart, -daysToSubtract);

  const monthEndDay = monthEnd.getDay(); // 0-6

  const daysToAdd = monthEndDay === 0 ? 0 : 7 - monthEndDay;
  const calendarEnd = addDays(monthEnd, daysToAdd);

  const days: CalendarDay[] = [];
  let currentDay = new Date(calendarStart);

  const normalizedSelectedDate = selectedDate
    ? new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    : undefined;

  // Получаем сегодняшнюю дату для сравнения (нормализуем без времени)
  const today = new Date();
  const normalizedToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0, 0, 0, 0 // Устанавливаем время в полночь для точного сравнения
  );

  while (currentDay <= calendarEnd) {
    const dayDate = new Date(currentDay);
    const normalizedDayDate = new Date(
      dayDate.getFullYear(),
      dayDate.getMonth(),
      dayDate.getDate(),
      0, 0, 0, 0 // Устанавливаем время в полночь для точного сравнения
    );

    // Сравниваем даты напрямую через timestamp для надежности
    const isTodayDate = 
      normalizedDayDate.getTime() === normalizedToday.getTime();

    days.push({
      date: normalizedDayDate,
      dayNumber: dayDate.getDate(),
      isCurrentMonth: isSameMonth(dayDate, normalizedDate),
      isToday: isTodayDate,
      isSelected: normalizedSelectedDate
        ? isSameDay(normalizedDayDate, normalizedSelectedDate)
        : false,
      hasEvent: false,
    });

    currentDay = addDays(currentDay, 1);
  }

  return days;
};

// Мемоизируем массив дней недели, чтобы не создавать новый на каждом вызове
const DAY_ABBREVIATIONS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

export const getDayAbbreviations = (): readonly string[] => {
  return DAY_ABBREVIATIONS;
};
