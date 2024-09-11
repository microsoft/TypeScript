/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /home/src/workspaces/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts
//// export declare function Component(): void;

// @Filename: /home/src/workspaces/project/index.ts
//// [|import Com/**/|]

// @link: /home/src/workspaces/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react -> /home/src/workspaces/project/node_modules/@types/react

goTo.marker("");
verify.completions({
  isNewIdentifierLocation: true,
  marker: "",
  exact: [{
    name: "Component",
    source: "react",
    insertText: `import { Component$1 } from "react";`,
    isSnippet: true,
    replacementSpan: test.ranges()[0],
    sourceDisplay: "react",
  }, {
    name: "type",
    sortText: completion.SortText.GlobalsOrKeywords,
  }],
  preferences: {
    includeCompletionsForImportStatements: true,
    includeCompletionsWithInsertText: true,
    includeCompletionsWithSnippetText: true,
  }
});
