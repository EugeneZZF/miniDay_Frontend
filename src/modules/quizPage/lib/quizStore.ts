import { create } from "zustand";

type TodayMatter = "family" | "work" | "selfDevelopment" | "health" | "sport" | string;
type SleepDuration = "<6" | "6-7" | "8-9" | ">10";
type EnergyLevel = "<6" | "6-7" | "8-9" | ">10";

type MorningQuizState = {
  morningWakeUpMood: number | null; // 0-100 slider value
  sleepDuration: SleepDuration | null;
  energyLevel: EnergyLevel | null;
  first_thought: string | null;
  important_matter: string | null;
  sleepHours: number | null;
  todayMatter: TodayMatter | null;
  oneThing: string | null; // Если сегодня получится только одно
};

type MorningQuizActions = {
  setMorningWakeUpMood: (mood: number) => void;
  setSleepDuration: (duration: SleepDuration) => void;
  setEnergyLevel: (level: EnergyLevel) => void;
  setFirstThought: (thought: string) => void;
  setImportantMatter: (matter: string) => void;
  setSleepHours: (hours: number | null) => void;
  setTodayMatter: (matter: TodayMatter) => void;
  setOneThing: (thing: string) => void;
  reset: () => void;
};

const initialState: MorningQuizState = {
  morningWakeUpMood: null,
  sleepDuration: null,
  energyLevel: null,
  first_thought: null,
  important_matter: null,
  sleepHours: null,
  todayMatter: null,
  oneThing: null,
};

export const useStoreQuizPage = create<MorningQuizState & MorningQuizActions>(
  (set) => ({
    ...initialState,

    setMorningWakeUpMood: (mood) => set({ morningWakeUpMood: mood }),
    setSleepDuration: (duration) => set({ sleepDuration: duration }),
    setEnergyLevel: (level) => set({ energyLevel: level }),
    setFirstThought: (thought) => set({ first_thought: thought }),
    setImportantMatter: (matter) => set({ important_matter: matter }),
    setSleepHours: (hours) => set({ sleepHours: hours ?? null }),
    setTodayMatter: (matter) => set({ todayMatter: matter }),
    setOneThing: (thing) => set({ oneThing: thing }),
    reset: () => set(initialState),
  })
);
