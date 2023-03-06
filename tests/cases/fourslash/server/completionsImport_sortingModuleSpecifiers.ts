/// <reference path="../fourslash.ts" />

// @Filename: tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: path.d.ts
//// declare module "path/posix" {
////     export function normalize(p: string): string;
//// }
//// declare module "path/win32" {
////     export function normalize(p: string): string;
//// }
//// declare module "path" {
////     export function normalize(p: string): string;
//// }

// @Filename: main.ts
//// normalize/**/

verify.completions({
  marker: "",
  exact: completion.globalsPlus([
    {
      name: "normalize",
      source: "path",
      sourceDisplay: "path",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
    },
    {
      name: "normalize",
      source: "path/posix",
      sourceDisplay: "path/posix",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
    },
    {
      name: "normalize",
      source: "path/win32",
      sourceDisplay: "path/win32",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
    },
  ]),
  preferences: {
    includeCompletionsForModuleExports: true,
    includeCompletionsWithInsertText: true,
    allowIncompleteCompletions: true,
  },
});
