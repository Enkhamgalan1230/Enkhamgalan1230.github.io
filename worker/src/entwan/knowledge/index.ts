import { about } from "./about";
import { education } from "./education";
import { faq } from "./faq";
import { interests } from "./interests";
import { projects } from "./projects";
import { skills } from "./skills";
import { work } from "./work";

export const knowledge = [
  ...about,
  ...education,
  ...work,
  ...projects,
  ...skills,
  ...interests,
  ...faq,
];