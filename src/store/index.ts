import { create } from "zustand";
import { CreateQuizFormValues } from "../pages/QuizListPage/types";

const useModalStore = create<{
  isDrawerOpen: boolean;
  actions: {
    setIsDrawerOpen: (isDrawerOpen: boolean) => void;
  };
}>((set) => ({
  isDrawerOpen: false,
  actions: {
    setIsDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),
  },
}));

export const useModalState = () => useModalStore((state) => state.isDrawerOpen);
export const useModalActions = () => useModalStore((state) => state.actions);

type QuizStore = {
  quiz: (CreateQuizFormValues & { id: number }) | null;
  actions: {
    setQuiz: (quiz: (CreateQuizFormValues & { id: number }) | null) => void;
  };
};

const useSelectedQuizStore = create<QuizStore>((set) => ({
  quiz: null,
  actions: {
    setQuiz: (quiz) => set({ quiz }),
  },
}));

export const useSelectedQuiz = () =>
  useSelectedQuizStore((state) => state.quiz);

export const useSelectedQuizActions = () =>
  useSelectedQuizStore((state) => state.actions);
