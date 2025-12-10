export default interface CalendarTask {
  id: Number;
  status: "completed" | "in-progress";
  title: string;
  time: string;
  description?: string;
}
