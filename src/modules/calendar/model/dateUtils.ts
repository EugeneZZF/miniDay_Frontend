import { format } from "date-fns/format";
import { differenceInMinutes } from "date-fns";

export const getDayOfWeek = (today: Date): string => {
  return format(today, "EEEE");
};

export const currentDateString = (): string => {
  const date = new Date();
  const dateTitle = format(date, "MMMM-dd").replace("-", " ");
  const currentDate = getDayOfWeek(date) + ", " + dateTitle;
  return currentDate;
};

export const taskWarningTime = (taskTime: string): boolean => {
  const now = new Date();

  const [hours, minutes] = taskTime.split(":").map(Number);

  const taskDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0
  );

  const diffMinutes = differenceInMinutes(taskDate, now);

  if (diffMinutes > 0 && diffMinutes < 120) {
    return true;
  } else {
    return false;
  }
};
