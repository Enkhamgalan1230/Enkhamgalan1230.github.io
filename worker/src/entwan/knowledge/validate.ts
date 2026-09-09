import { knowledge } from "./index";

const seenIds = new Set<string>();

let hasErrors = false;

for (const chunk of knowledge) {
  if (!chunk.id) {
    console.error("Missing id:", chunk);
    hasErrors = true;
  }

  if (seenIds.has(chunk.id)) {
    console.error(`Duplicate id: ${chunk.id}`);
    hasErrors = true;
  }

  seenIds.add(chunk.id);

  if (!chunk.category) {
    console.error(`Missing category: ${chunk.id}`);
    hasErrors = true;
  }

  if (!chunk.subject) {
    console.error(`Missing subject: ${chunk.id}`);
    hasErrors = true;
  }

  if (!chunk.topic) {
    console.error(`Missing topic: ${chunk.id}`);
    hasErrors = true;
  }

  if (!chunk.text?.trim()) {
    console.error(`Missing text: ${chunk.id}`);
    hasErrors = true;
  }
}

console.log(`Total chunks: ${knowledge.length}`);

if (hasErrors) {
  console.error("Knowledge validation failed.");
  process.exit(1);
}

console.log("Knowledge validation passed.");

import { formatChunkForEmbedding } from "../rag/formatChunk";

console.log("\nExample embedding text:\n");
console.log(formatChunkForEmbedding(knowledge[0]));