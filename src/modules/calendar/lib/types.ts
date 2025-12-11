export default interface CalendarTask {
  id: number;
  status: "completed" | "in-progress";
  title: string;
  time: string;
  description?: string;
}
