export type QuestionStep = {
  question: string;
  yesText: string;
  noText: string;
  image: string;
};

export type QuestionsFormData = {
  steps: QuestionStep[];
  userId: string;
  createdAt: string;
};
