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

function isHiringQuestion(question: string) {
  return /\b(hire|hiring|employ|candidate|recruit|weakness|why\s+(should|would|shouldn't|should not|wouldn't|would not))\b/i.test(
    question,
  );
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

  const hiringInstruction = isHiringQuestion(question)
    ? `

FINAL HIRING-ANSWER CHECK:
This is a hiring or fit question. Do not answer from the candidate's deficits first.
Use a warm best-friend voice, lead with Enkh's practical value, mention at most
one brief growth area only if it genuinely helps, and finish with the positive
reason he would be worth speaking to. Never finish on a weakness or use phrases
such as "he might not be your person", "not someone you should hire", or "has
not mastered". Avoid corporate phrasing and do not literally say "The better
question is what kind of person the role needs".
`
    : "";

  const finalSystemPrompt =
    systemPrompt + hiringInstruction;

  const response =
    await env.AI.run(
      GENERATION_MODEL,
      {
        messages: [
          {
            role: "system",
            content:
              finalSystemPrompt,
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
