/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "compilerOptions": { "module": "esnext" } }

// @Filename: /home/src/workspaces/project/undefined.ts
////export = undefined;

// @Filename: /home/src/workspaces/project/undefinedAlias.ts
////const x = undefined;
////export = x;

// @Filename: /home/src/workspaces/project/index.ts
//// /**/

// Would throw error if undefined appears twice
goTo.marker("");
verify.completions({
  includes: [{
    name: "x",
     hasAction: true,
     sortText: completion.SortText.AutoImportSuggestions,
     source: "/home/src/workspaces/project/undefinedAlias"
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
     source: "/home/src/workspaces/project/undefinedAlias"
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true
  }
});