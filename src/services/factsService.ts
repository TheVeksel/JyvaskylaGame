/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchData } from "./descriptionService";

export type Facts = {
  title: string;
  text: string;
  imgURL: string;
}

export async function getFactsContent(language: string): Promise<Facts[]> {
  const data = await fetchData();

  return data.slides.map((item: any) => ({
    title: item.content[language].title,
    text: item.content[language].text,
    imgURL: item.imgURL,
  }));
}