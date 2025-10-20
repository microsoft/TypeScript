/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/jsconfig.json
////{
////  "compilerOptions": {
////    "module": "commonjs",
////  },
////}

// @Filename: /home/src/workspaces/project/node_modules/@types/node/index.d.ts
////declare module 'fs' {
////  export function readFile(): void;
////}
////declare module 'util' {
////  export function promisify(): void;
////}

// @Filename: /home/src/workspaces/project/package.json
////{ "mod" }

// @Filename: /home/src/workspaces/project/a.js
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