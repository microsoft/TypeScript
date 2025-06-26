/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
////{
////  "compilerOptions": {
////    "module": "esnext",
////    "allowJs": true,
////    "checkJs": true,
////    "typeRoots": [
////      "node_modules/@types"
////    ]
////  },
////  "include": ["**/*"],
////  "typeAcquisition": {
////    "enable": true
////  }
////}

// @Filename: /home/src/workspaces/project/node_modules/@types/node/index.d.ts
////declare module 'fs' {
////  export function readFile(): void;
////}
////declare module 'util' {
////  export function promisify(): void;
////}

// @Filename: /home/src/workspaces/project/package.json
////{}

// @Filename: /home/src/workspaces/project/a.js
////
////readF/**/

verifyExcludes("readFile");
edit.replaceLine(0, "import { promisify } from 'util';");
verifyIncludes("readFile");
edit.deleteLine(0);
verifyExcludes("readFile");

function verifyIncludes(name: string) {
  goTo.marker("");
  verify.completions({
      includes: {
          name,
          source: "fs",
          hasAction: true,
          sortText: completion.SortText.AutoImportSuggestions,
      },
      preferences: {
          includeCompletionsForModuleExports: true,
          includeInsertTextCompletions: true,
      },
  });
}

function verifyExcludes(name: string) {
  goTo.marker("");
  verify.completions({
      excludes: name,
      preferences: {
          includeCompletionsForModuleExports: true,
          includeInsertTextCompletions: true,
      },
  });
}

