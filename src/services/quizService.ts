/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchData } from "./descriptionService";

export type Quiz = {
  question: string;
  options: string[];
  answer: string;
  title: string;
  type: string;
};

export async function getQuizContent(language: string): Promise<Quiz[]> {
  const data = await fetchData();

  return data.questions.map((item: any) => ({
    question: item.content[language].question,
    options: item.content[language].options,
    answer: item.content[language].answer,
    title: item.content[language].title,
    type: item.content[language].type
  }));
}
