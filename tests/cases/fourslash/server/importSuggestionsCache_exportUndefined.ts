/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
////{ "compilerOptions": { "module": "esnext" } }

// @Filename: /undefined.ts
////export = undefined;

// @Filename: /undefinedAlias.ts
////const x = undefined;
////export = x;

// @Filename: /index.ts
//// /**/

// Would throw error if undefined appears twice
goTo.marker("");
verify.completions({
  includes: [{
    name: "x",
     hasAction: true,
     sortText: completion.SortText.AutoImportSuggestions,
     source: "/undefinedAlias"
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true
  }
});

// Do it again for cache test
verify.completions({
  includes: [{
    name: "x",
     hasAction: true,
     sortText: completion.SortText.AutoImportSuggestions,
     source: "/undefinedAlias"
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true
  }
});