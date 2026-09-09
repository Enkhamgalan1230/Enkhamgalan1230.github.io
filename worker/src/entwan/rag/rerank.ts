export const RERANK_MODEL =
  "@cf/baai/bge-reranker-base";

export type RerankCandidate<T> = {
  item: T;
  text: string;
};

type RerankerInput = {
  query: string;
  contexts: Array<{
    text: string;
  }>;
  top_k?: number;
};

type RerankerResult = {
  id: number;
  score: number;
};

type RerankerOutput = {
  response: RerankerResult[];
};

export async function rerankCandidates<T>(
  ai: Ai,
  question: string,
  candidates: RerankCandidate<T>[],
  topK = 5,
): Promise<T[]> {
  if (candidates.length === 0) {
    return [];
  }

  const input: RerankerInput = {
    query: question,
    contexts: candidates.map((candidate) => ({
      text: candidate.text,
    })),
    top_k: Math.min(topK, candidates.length),
  };

  const response = (await ai.run(
    RERANK_MODEL,
    input as any,
  )) as unknown as RerankerOutput;

  if (!Array.isArray(response.response)) {
    throw new Error(
      "Reranker did not return the expected response array.",
    );
  }

  return response.response.map((result) => {
    const candidate = candidates[result.id];

    if (!candidate) {
      throw new Error(
        `Reranker returned invalid candidate index: ${result.id}`,
      );
    }

    return candidate.item;
  });
}