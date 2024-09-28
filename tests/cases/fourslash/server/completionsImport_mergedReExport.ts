/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "@jest/types": "*", "ts-jest": "*" } }

// @Filename: /home/src/workspaces/project/node_modules/@jest/types/package.json
//// { "name": "@jest/types" }

// @Filename: /home/src/workspaces/project/node_modules/@jest/types/index.d.ts
//// import type * as Config from "./Config";
//// export type { Config };

// @Filename: /home/src/workspaces/project/node_modules/@jest/types/Config.d.ts
//// export interface ConfigGlobals {
////     [K: string]: unknown;
//// }

// @Filename: /home/src/workspaces/project/node_modules/ts-jest/index.d.ts
//// export {};
//// declare module "@jest/types" {
////     namespace Config {
////         interface ConfigGlobals {
////             'ts-jest': any;
////         }
////     }
//// }

// @Filename: /home/src/workspaces/project/index.ts
//// C/**/

verify.completions({
  marker: "",
  includes: [{
    name: "Config",
    source: "/home/src/workspaces/project/node_modules/@jest/types/index",
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
