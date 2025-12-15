import { addDays, subDays } from "date-fns";

export function getWeekAroundDate(date: Date): Date[] {
  const days: Date[] = [];

  for (let i = 3; i > 0; i--) {
    days.push(subDays(date, i));
  }
  days.push(date);
  for (let i = 1; i <= 3; i++) {
    days.push(addDays(date, i));
  }

  return days;
}
