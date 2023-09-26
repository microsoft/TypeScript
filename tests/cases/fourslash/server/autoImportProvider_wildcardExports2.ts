/// <reference path="../fourslash.ts" />

// @Filename: /node_modules/pkg/package.json
//// {
////     "name": "pkg",
////     "version": "1.0.0",
////     "exports": {
////         "./core/*": {
////             "types": "./lib/core/*.d.ts",
////             "default": "./lib/core/*.js"
////         }
////     }
//// }

// @Filename: /node_modules/pkg/lib/core/test.d.ts
//// export function test(): void;

// @Filename: /package.json
//// {
////     "type": "module",
////     "dependencies": {
////         "pkg": "1.0.0"
////     }
//// }

// @Filename: /tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "nodenext"
////     }
//// }

// @Filename: /main.ts
//// /**/

verify.completions({
  marker: "",
  includes: [
    {
      name: "test",
      source: "pkg/core/test",
      sourceDisplay: "pkg/core/test",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
  ],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true
  }
});
