export type QuizType = "A_B_IMAGE" | "O_X_IMAGE" | "O_X_SIMPLE";
export type AB = "A" | "B";
export type OX = "O" | "X";
export type QuizButtonType = OX | AB;

export interface CreateQuizFormValues {
  title: string;
  tags: string[];
  categoryId: string;
  question: QuestionFormValues;
  quizType: QuizType;
  description: string;
  answer?: QuizButtonType;
}

export interface Categories {
  id: string;
  depth: number;
  name: string;
  description: string;
}

export type Quiz = OXSimpleQuiz | OXImageQuiz | ABImageQuiz;

export interface QuestionFormValues {
  question: string;
  imageUrl?: File | string;
  buttons: {
    [key in QuizButtonType]?: {
      imageUrl?: File | string;
      button: { name: string };
    };
  };
}

export interface Question {
  question: string;
  imageUrl?: string;
  // buttons: {
  //   [key in QuizButtonType]: QuizButton;
  // };
}

export interface QuizButton {
  imageUrl?: string;
  button: { name: string };
}

export interface BaseQuiz {
  title: string;
  tags: string[];
  categoryId: string;
  description: string;
  answer: OX;
}

export interface OXSimpleQuiz extends BaseQuiz {
  quizType: "O_X_SIMPLE";
  question: {
    question: string;
    buttons: {
      O: {
        button: {
          name: string;
        };
      };
      X: {
        button: {
          name: string;
        };
      };
    };
  };
}

export interface OXImageQuiz extends BaseQuiz {
  quizType: "O_X_IMAGE";
  question: {
    question: string;
    imageUrl: string;
    buttons: {
      O: {
        button: {
          name: string;
        };
      };
      X: {
        button: {
          name: string;
        };
      };
    };
  };
}

export interface ABImageQuiz extends BaseQuiz {
  quizType: "A_B_IMAGE";
  question: {
    question: string;
    buttons: {
      A: {
        imageUrl: string;
        button: {
          name: string;
        };
      };
      B: {
        imageUrl: string;
        button: {
          name: string;
        };
      };
    };
  };
}
