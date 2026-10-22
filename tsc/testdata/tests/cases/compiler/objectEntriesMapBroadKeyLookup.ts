// @target: es2017
// @strict: true

declare const languages: Record<"en" | "fr", string>;
declare const language: string;

new Map(Object.entries(languages)).get(language);
