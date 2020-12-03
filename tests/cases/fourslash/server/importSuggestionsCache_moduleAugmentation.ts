/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
////{ "compilerOptions": { "module": "esnext" } }

// @Filename: /node_modules/@types/react/index.d.ts
////export function useState(): void;

// @Filename: /a.ts
////import 'react';
////declare module 'react' {
////  export function useBlah(): void;  
////}
////0;
////use/**/

verifyIncludes("useState");
verifyIncludes("useBlah");

edit.replaceLine(2, "  export function useYes(): true");
verifyExcludes("useBlah");
verifyIncludes("useYes");

function verifyIncludes(name: string) {
  goTo.marker("");
  verify.completions({
      includes: {
          name,
          source: "/node_modules/@types/react/index",
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

