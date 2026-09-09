import { knowledge } from "../knowledge";
import { embedTexts } from "./embed";
import { normalizeQuery } from "./normalizeQuery";

const knowledgeById = new Map(
  knowledge.map((chunk) => [
    chunk.id,
    chunk,
  ]),
);

export async function retrieveKnowledge(
  env: Env,
  question: string,
  topK = 8,
) {
  const normalizedQuestion =
    normalizeQuery(question);

  const [queryEmbedding] =
    await embedTexts(
      env.AI,
      [normalizedQuestion],
    );

  if (!queryEmbedding) {
    throw new Error(
      "Failed to create query embedding.",
    );
  }

  const result =
    await env.VECTORIZE.query(
      queryEmbedding,
      {
        topK,
        returnMetadata: "all",
      },
    );

  return result.matches
    .map((match) => {
      const chunk =
        knowledgeById.get(
          match.id,
        );

      if (!chunk) {
        return null;
      }

      return {
        id: match.id,
        score: match.score,
        metadata:
          match.metadata,
        chunk,
      };
    })
    .filter(
      (
        match,
      ): match is NonNullable<
        typeof match
      > => match !== null,
    );
}