import {
  KUMO_SYSTEM_PROMPT,
  KUMO_NO_CONTEXT_PROMPT,
} from "../prompts";

import type { KnowledgeChunk } from "../knowledge/types";

export const GENERATION_MODEL =
  "@cf/google/gemma-4-26b-a4b-it";

type RetrievedChunk = {
  id: string;
  score: number;
  chunk: KnowledgeChunk;
};

function formatContext(
  matches: RetrievedChunk[],
): string {
  return matches
    .map(
      (match, index) =>
        [
          `[Evidence ${index + 1}]`,
          `Category: ${match.chunk.category}`,
          `Subject: ${match.chunk.subject}`,
          `Topic: ${match.chunk.topic}`,
          `Content: ${match.chunk.text}`,
        ].join("\n"),
    )
    .join("\n\n");
}

function buildSystemPrompt(
  matches: RetrievedChunk[],
): string {
  if (matches.length === 0) {
    return KUMO_NO_CONTEXT_PROMPT;
  }

  return KUMO_SYSTEM_PROMPT;
}

export async function generateAnswer(
  env: Env,
  question: string,
  matches: RetrievedChunk[],
): Promise<string> {
  const context =
    formatContext(matches);

  const systemPrompt =
    buildSystemPrompt(matches)
      .replace(
        "{{CONTEXT}}",
        context,
      )
      .replace(
        "{{QUESTION}}",
        question,
      );

  const response =
    await env.AI.run(
      GENERATION_MODEL,
      {
        messages: [
          {
            role: "system",
            content:
              systemPrompt,
          },
          {
            role: "user",
            content:
              question,
          },
        ],
        max_completion_tokens:
          250,
        temperature: 0.6,

        chat_template_kwargs: {
          enable_thinking: false,
        },
      },
    );

  if (
    !(
      "choices" in
      response
    ) ||
    !Array.isArray(
      response.choices,
    )
  ) {
    throw new Error(
      "Kumo did not return a valid chat completion response.",
    );
  }

  const content =
    response.choices[0]
      ?.message
      ?.content;

  if (
    typeof content !==
      "string" ||
    !content.trim()
  ) {
    throw new Error(
      "Kumo returned an empty response.",
    );
  }

  return content.trim();
}