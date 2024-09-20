/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/node_modules/fp-ts/package.json
//// { "name": "fp-ts", "version": "0.10.4" }

// @Filename: /home/src/workspaces/project/node_modules/fp-ts/index.d.ts
//// export * as string from "./lib/string";

// @Filename: /home/src/workspaces/project/node_modules/fp-ts/lib/string.d.ts
//// export declare const fromString: (s: string) => string;
//// export type SafeString = string;

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "fp-ts": "^0.10.4" } }

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /home/src/workspaces/project/index.ts
//// type A = { name: string/**/ }

goTo.marker("");
verify.completions({
  marker: "",
  includes: [{
    name: "string",
    sortText: completion.SortText.GlobalsOrKeywords,
  }, {
    name: "string",
    sortText: completion.SortText.AutoImportSuggestions,
    source: "fp-ts",
    sourceDisplay: "fp-ts",
    hasAction: true,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  },
});
