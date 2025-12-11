import { create } from "zustand";
import { persist } from "zustand/middleware";

// Типы для ответов онбординга
export type PurposeOption = 
  | "productivity" 
  | "work" 
  | "structure" 
  | "wellbeing";

export type FormatOption = 
  | "mini-quiz" 
  | "full-diary" 
  | "free-entry";

export interface OnboardingState {
  // Ответы пользователя
  name: string;
  purpose: PurposeOption | null;
  times: string[]; // Массив времени для заполнения дневника
  format: FormatOption | null;
  
  // Действия
  setName: (name: string) => void;
  setPurpose: (purpose: PurposeOption) => void;
  addTime: (time: string) => void;
  removeTime: (index: number) => void;
  setFormat: (format: FormatOption) => void;
  reset: () => void;
  
  // Статус завершения
  isCompleted: boolean;
  setCompleted: (completed: boolean) => void;
}

const initialState = {
  name: "",
  purpose: null as PurposeOption | null,
  times: [] as string[],
  format: null as FormatOption | null,
  isCompleted: false,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setName: (name: string) => set({ name }),
      
      setPurpose: (purpose: PurposeOption) => set({ purpose }),
      
      addTime: (time: string) => 
        set((state) => ({ 
          times: [...state.times, time] 
        })),
      
      removeTime: (index: number) =>
        set((state) => ({
          times: state.times.filter((_, i) => i !== index),
        })),
      
      setFormat: (format: FormatOption) => set({ format }),
      
      reset: () => set(initialState),
      
      setCompleted: (completed: boolean) => set({ isCompleted: completed }),
    }),
    {
      name: "onboarding-storage", // Имя для localStorage
    }
  )
);

// Селекторы для удобства
export const useOnboardingName = () => 
  useOnboardingStore((state) => state.name);
export const useOnboardingPurpose = () => 
  useOnboardingStore((state) => state.purpose);
export const useOnboardingTimes = () => 
  useOnboardingStore((state) => state.times);
export const useOnboardingFormat = () => 
  useOnboardingStore((state) => state.format);
export const useOnboardingIsCompleted = () => 
  useOnboardingStore((state) => state.isCompleted);

