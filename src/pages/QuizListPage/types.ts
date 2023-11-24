export interface CreateQuizFormValues {
  title: string;
  tags: string[];
  categoryId: string;
  questions: [];
  quizType: "A_B_IMAGE" | "A_B_SIMPLE" | "O_X_IMAGE" | "O_X_SIMPLE";
}

export interface Categories {
  id: string;
  depth: number;
  name: string;
  description: string;
}
