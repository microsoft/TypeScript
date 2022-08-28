/// <reference path="../fourslash.ts" />

// @Filename: /node_modules/fp-ts/package.json
//// { "name": "fp-ts", "version": "0.10.4" }

// @Filename: /node_modules/fp-ts/index.d.ts
//// export * as string from "./lib/string";

// @Filename: /node_modules/fp-ts/lib/string.d.ts
//// export declare const fromString: (s: string) => string;
//// export type SafeString = string;

// @Filename: /package.json
//// { "dependencies": { "fp-ts": "^0.10.4" } }

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /index.ts
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
