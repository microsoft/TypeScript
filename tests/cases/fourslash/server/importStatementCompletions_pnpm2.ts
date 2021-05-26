/// <reference path="../fourslash.ts" />

// @Filename: /project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react/index.d.ts
//// import "csstype";
//// export declare function Component(): void;

// @Filename: /project/node_modules/.pnpm/csstype@3.0.8/node_modules/csstype/index.d.ts
//// export interface SvgProperties {}

// @Filename: /project/index.ts
//// [|import SvgProp/**/|]

// @link: /project/node_modules/.pnpm/@types+react@17.0.7/node_modules/@types/react -> /project/node_modules/@types/react
// @link: /project/node_modules/.pnpm/csstype@3.0.8/node_modules/csstype -> /project/node_modules/.pnpm/@types+react@17.0.7/node_modules/csstype

goTo.marker("");
verify.completions({
  isNewIdentifierLocation: true,
  marker: "",
  exact: [],
  preferences: {
    includeCompletionsForImportStatements: true,
    includeCompletionsWithInsertText: true,
    includeCompletionsWithSnippetText: true,
  }
});
