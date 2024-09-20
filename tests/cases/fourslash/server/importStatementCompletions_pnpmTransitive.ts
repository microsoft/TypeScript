/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /home/src/workspaces/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts
//// import "csstype";
//// export declare function Component(): void;

// @Filename: /home/src/workspaces/project/node_modules/.pnpm/csstype@3.0.8/node_modules/csstype/index.d.ts
//// export interface SvgProperties {}

// @Filename: /home/src/workspaces/project/index.ts
//// [|import SvgProp/**/|]

// @link: /home/src/workspaces/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react -> /home/src/workspaces/project/node_modules/@types/react
// @link: /home/src/workspaces/project/node_modules/.pnpm/csstype@3.0.8/node_modules/csstype -> /home/src/workspaces/project/node_modules/.pnpm/@types+react@17.0.7/node_modules/csstype

goTo.marker("");
verify.completions({
  isNewIdentifierLocation: true,
  marker: "",
  exact: [{ name: "type", sortText: completion.SortText.GlobalsOrKeywords }],
  preferences: {
    includeCompletionsForImportStatements: true,
    includeCompletionsWithInsertText: true,
    includeCompletionsWithSnippetText: true,
  }
});
