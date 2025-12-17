import { create } from "zustand";

type TodayMatter = "family" | "work" | "selfDevelopment" | "health" | string;

type MorningQuizState = {
  morningWakeUpMood: number | null;
  morningWakeUpTime: string | null;
  first_thought: string | null;
  important_matter: string | null;
  sleepHours: number | null;
  todayMatter: TodayMatter | null;
};

type MorningQuizActions = {
  setMorningWakeUpMood: (mood: number) => void;
  setMorningWakeUpTime: (time: string) => void;
};

export const useStoreQuizPage = create<MorningQuizState & MorningQuizActions>(
  (set) => ({
    morningWakeUpMood: null,
    morningWakeUpTime: null,
    first_thought: null,
    important_matter: null,
    sleepHours: null,
    todayMatter: null,

    setMorningWakeUpMood: (mood) => set({ morningWakeUpMood: mood }),

    setMorningWakeUpTime: (time) => set({ morningWakeUpTime: time }),
  })
);
