/// <reference path="../fourslash.ts" />

// @Filename: /jsconfig.json
////{
////  "compilerOptions": {
////    "module": "commonjs",
////  },
////}

// @Filename: /node_modules/@types/node/index.d.ts
////declare module 'fs' {
////  export function readFile(): void;
////}
////declare module 'util' {
////  export function promisify(): void;
////}

// @Filename: /package.json
////{ "mod" }

// @Filename: /a.js
////
////readF/**/

goTo.marker("");
verify.completions({
    includes: {
        name: "readFile",
        source: "fs",
        hasAction: true,
        sortText: completion.SortText.AutoImportSuggestions,
    },
    preferences: {
        includeCompletionsForModuleExports: true,
        includeInsertTextCompletions: true,
    },
});