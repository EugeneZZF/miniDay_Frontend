import { create } from "zustand";

// Типы для ответов викторин
export type QuizMorningWibesEnergy = "<6" | "6-7" | "8-9" | ">10";
export type QuizMorningMatterMostToday =
  | "productivity"
  | "wellbeing"
  | "social"
  | "learning"
  | "sport"
  | string;
export type QuizMorning = {
  wibesEnergy: QuizMorningWibesEnergy | null;
  firstThought: string;
  matterMostToday: QuizMorningMatterMostToday | null;
  oneThingBetterToday: string;
};
export type WeekDays =
  | "Понедельник"
  | "Вторник"
  | "Среда"
  | "Четверг"
  | "Пятница"
  | "Суббота"
  | "Воскресенье";
export interface QuizPageState {
  // Ответы пользователя
  morningQuiz: QuizMorning;
}
