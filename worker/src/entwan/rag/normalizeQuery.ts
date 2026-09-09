export function normalizeQuery(question: string): string {
  let normalized = question.trim();

  normalized = normalized.replace(
    /\bEntwan\b/gi,
    "Enkh",
  );

  normalized = normalized.replace(
    /\bEnkh-Amgalan\b/gi,
    "Enkh",
  );

  return normalized;
}