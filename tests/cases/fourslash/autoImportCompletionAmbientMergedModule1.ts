/// <reference path="fourslash.ts" />

// @strict: true
// @module: commonjs

// @filename: /node_modules/@types/vscode/index.d.ts
//// declare module "vscode" {
////   export class Position {
////     readonly line: number;
////     readonly character: number;
////   }
//// }

// @filename: src/motion.ts
//// import { Position } from "vscode";
////
//// export abstract class MoveQuoteMatch {
////   public override async execActionWithCount(
////     position: Position,
////   ): Promise<void> {}
//// }
////
//// declare module "vscode" {
////   interface Position {
////     toString(): string;
////   }
//// }

// @filename: src/smartQuotes.ts
//// import { MoveQuoteMatch } from "./motion";
////
//// export class MoveInsideNextQuote extends MoveQuoteMatch {/*1*/
////   keys = ["i", "n", "q"];
//// }

const preferences = {
  includeCompletionsWithInsertText: true,
  includeCompletionsWithClassMemberSnippets: true,
};

verify.completions({
  marker: "1",
  includes: [
    {
      name: "execActionWithCount",
      insertText: "public execActionWithCount(position: Position): Promise<void> {\n}",
      filterText: "execActionWithCount",
      hasAction: true,
      source: "ClassMemberSnippet/",
    },
  ],
  preferences,
  isNewIdentifierLocation: true,
});

verify.applyCodeActionFromCompletion("1", {
  name: "execActionWithCount",
  source: "ClassMemberSnippet/",
  description: `Includes imports of types referenced by 'execActionWithCount'`,
  newFileContent: `import { Position } from "vscode";
import { MoveQuoteMatch } from "./motion";

export class MoveInsideNextQuote extends MoveQuoteMatch {
  keys = ["i", "n", "q"];
}`,
  preferences,
});
