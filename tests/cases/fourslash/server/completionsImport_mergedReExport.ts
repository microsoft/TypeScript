/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /package.json
//// { "dependencies": { "@jest/types": "*", "ts-jest": "*" } }

// @Filename: /node_modules/@jest/types/index.d.ts
//// import type * as Config from "./Config";
//// export type { Config };

// @Filename: /node_modules/@jest/types/Config.d.ts
//// export interface ConfigGlobals {
////     [K: string]: unknown;
//// }

// @Filename: /node_modules/ts-jest/index.d.ts
//// export {};
//// declare module "@jest/types" {
////     namespace Config {
////         interface ConfigGlobals {
////             'ts-jest': any;
////         }
////     }
//// }

// @Filename: /index.ts
//// C/**/

verify.completions({
  marker: "",
  includes: [{
    name: "Config",
    source: "/node_modules/@jest/types/index",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
  },
});

edit.insert("o");

verify.completions({
  marker: "",
  includes: [{
    name: "Config",
    source: "@jest/types",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  },
});
