// lib/calendarStore.ts
import { create } from "zustand";
import { subMonths, addMonths } from "date-fns";

// Определяем тип состояния
interface CalendarState {
  currentDate: Date;
  selectedDate: Date | undefined;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date?: Date) => void;
  setPrevMonth: () => void;
  setNextMonth: () => void;
  isAnimated: boolean;
  setIsAnimated: (value: boolean) => void;
}

const useStore = create<CalendarState>((set) => ({
  currentDate: new Date(), // Текущая дата
  selectedDate: undefined, // По умолчанию не выбрана
  setCurrentDate: (date: Date) => set({ currentDate: date }),
  setSelectedDate: (date?: Date) => set({ selectedDate: date }),
  setPrevMonth: () =>
    set((state) => {
      const newDate = subMonths(state.currentDate, 1);
      return { currentDate: newDate };
    }),
  setNextMonth: () =>
    set((state) => {
      const newDate = addMonths(state.currentDate, 1);
      return { currentDate: newDate };
    }),
  isAnimated: false,
  setIsAnimated: (value: boolean) => set({ isAnimated: value }),
}));

export default useStore;

// Селекторы для оптимизации - компоненты будут ререндериться только при изменении нужных значений
export const useCurrentDate = () => useStore((state) => state.currentDate);
export const useSelectedDate = () => useStore((state) => state.selectedDate);
export const useIsAnimated = () => useStore((state) => state.isAnimated);

// Отдельные селекторы для действий - они стабильны и не вызывают ререндеры
export const useSetCurrentDate = () => useStore((state) => state.setCurrentDate);
export const useSetSelectedDate = () => useStore((state) => state.setSelectedDate);
export const useSetPrevMonth = () => useStore((state) => state.setPrevMonth);
export const useSetNextMonth = () => useStore((state) => state.setNextMonth);
export const useSetIsAnimated = () => useStore((state) => state.setIsAnimated);

// Вспомогательная функция для прямого доступа без хука
export const setIsAnimated = (value: boolean) =>
  useStore.getState().setIsAnimated(value);
