import { knowledge } from "../knowledge";
import { formatChunkForEmbedding } from "./formatChunk";
import { embedTexts } from "./embed";

const EMBEDDING_BATCH_SIZE = 32;

export async function indexKnowledge(env: Env) {
  let indexed = 0;

  for (
    let start = 0;
    start < knowledge.length;
    start += EMBEDDING_BATCH_SIZE
  ) {
    const batch = knowledge.slice(
      start,
      start + EMBEDDING_BATCH_SIZE,
    );

    const texts = batch.map(formatChunkForEmbedding);

    const embeddings = await embedTexts(
      env.AI,
      texts,
    );

    if (embeddings.length !== batch.length) {
      throw new Error(
        `Embedding count mismatch. Expected ${batch.length}, received ${embeddings.length}.`,
      );
    }

    const vectors: VectorizeVector[] = batch.map(
      (chunk, index) => {
        const values = embeddings[index];

        if (!values) {
          throw new Error(
            `Missing embedding for ${chunk.id}.`,
          );
        }

        return {
          id: chunk.id,
          values,
          metadata: {
            category: chunk.category,
            subject: chunk.subject,
            topic: chunk.topic,
            importance:
              chunk.importance ?? "medium",
          },
        };
      },
    );

    await env.VECTORIZE.upsert(vectors);

    indexed += batch.length;

    console.log(
      `Indexed ${indexed}/${knowledge.length}`,
    );
  }

  return {
    indexed,
    total: knowledge.length,
  };
}