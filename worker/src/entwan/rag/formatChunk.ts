import type { KnowledgeChunk } from "../knowledge/types";

export function formatChunkForEmbedding(chunk: KnowledgeChunk): string {
  return [
    `Category: ${chunk.category}`,
    `Subject: ${chunk.subject}`,
    `Topic: ${chunk.topic}`,
    `Content: ${chunk.text}`,
  ].join("\n");
}