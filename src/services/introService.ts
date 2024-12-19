/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchData } from "./descriptionService";

type Intro = {
  title: string;
  buttonText: string;
}

export async function getIntroText(
  id: number,
  language: string
): Promise<Intro | null> {
  const data = await fetchData();

  const intro = data.screensText?.find((item: any) => item.id === id);

  if (intro) {
    return intro.content[language] || null;
  }
  return null;
}