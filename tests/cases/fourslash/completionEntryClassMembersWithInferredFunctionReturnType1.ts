///<reference path="fourslash.ts" />

// @filename: /tokenizer.ts
//// export default abstract class Tokenizer {
////   errorBuilder() {
////     return (pos: number, lineStart: number, curLine: number) => {};
////   }
//// }

// @filename: /expression.ts
//// import Tokenizer from "./tokenizer.js";
////
//// export default abstract class ExpressionParser extends Tokenizer {
////   /**/
//// }

verify.completions({
  marker: "",
  includes: [
    {
      name: "errorBuilder",
      insertText: "errorBuilder(): (pos: number, lineStart: number, curLine: number) => void {\n}",
      filterText: "errorBuilder",
    },
  ],
  preferences: {
    includeCompletionsWithInsertText: true,
    includeCompletionsWithClassMemberSnippets: true,
  },
  isNewIdentifierLocation: true,
});
