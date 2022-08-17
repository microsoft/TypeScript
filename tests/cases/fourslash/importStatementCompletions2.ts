/// <reference path="fourslash.ts" />

// @Filename: /button.ts
//// export function Button() {}

// @Filename: /index1.ts
//// [|import Butt/*0*/|]
////
//// interface Props {}

// @Filename: /index2.ts
//// [|import { Butt/*1*/ }|]
////
//// interface Props {}

[0, 1].forEach(marker => {
  verify.completions({
    marker: `${marker}`,
    isNewIdentifierLocation: true,
    exact: [{
      name: "Button",
      source: "./button",
      sourceDisplay: "./button",
      insertText: `import { Button$1 } from "./button"`,
      isSnippet: true,
      replacementSpan: test.ranges()[marker],
    }, {
      name: "type",
      sortText: completion.SortText.GlobalsOrKeywords,
    }],
    preferences: {
      includeCompletionsForImportStatements: true,
      includeCompletionsForModuleExports: true,
      includeCompletionsWithSnippetText: true,
      includeCompletionsWithInsertText: true,
    },
  });
});
