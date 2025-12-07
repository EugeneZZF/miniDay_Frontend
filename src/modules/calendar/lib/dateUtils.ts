import { format } from "date-fns/format";
import { getDay } from "date-fns";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const formatDate = (date: Date): any => {
  return 0;
};

export const getDayOfWeek = (today: Date): string => {
  return format(today, "EEEE");
};

export const currentDateString = (): string => {
  const date = new Date();
  const dateTitle = format(date, "MMMM-dd").replace("-", " ");
  const currentDate = getDayOfWeek(date) + ", " + dateTitle;
  return currentDate;
};
