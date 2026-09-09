export const EMBEDDING_MODEL = "@cf/baai/bge-base-en-v1.5";

export async function embedTexts(
  ai: Ai,
  texts: string[],
): Promise<number[][]> {
  const response = await ai.run(EMBEDDING_MODEL, {
    text: texts,
  });

  if (!("data" in response) || !response.data) {
    throw new Error(
      "Embedding request did not return synchronous embedding data.",
    );
  }

  return response.data;
}