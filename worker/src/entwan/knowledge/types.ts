export type KnowledgeChunk = {
  id: string;
  category:
    "about" | "work" | "education" | "skills" | "project" | "interest" | "faq";
  subject: string;
  topic: string;
  text: string;
  importance?: "low" | "medium" | "high";
};
