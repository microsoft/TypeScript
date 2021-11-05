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

const insertionIndex = completion.globalsSortedByName.findIndex(c => c.name > "normalize");

verify.completions({
  marker: "",
  exact: [
    ...completion.globalsSortedByName.slice(0, insertionIndex),
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
    ...completion.globalsSortedByName.slice(insertionIndex),
  ],
  preferences: {
    includeCompletionsForModuleExports: true,
    includeCompletionsWithInsertText: true,
    allowIncompleteCompletions: true,
  },
});
