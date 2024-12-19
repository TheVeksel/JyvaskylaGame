/* eslint-disable @typescript-eslint/no-explicit-any */

type LocalizedContent = {
  title: string;
  content: string;
};

export async function fetchData(): Promise<any> {
  const response = await fetch("/data.json");
  if (!response.ok) {
    throw new Error("Failed fetching data");
  }
  return response.json();
}

export async function getLocalizedDescription(
  id: number,
  language: string
): Promise<LocalizedContent | null> {
  const data = await fetchData();

  const description = data.descriptions?.find((item: any) => item.id === id);

  if (description) {
    return description.content[language] || null;
  }
  return null;
}
