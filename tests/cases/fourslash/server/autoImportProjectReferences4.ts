/// <reference path="../fourslash.ts" />

// @Filename: /packages/lib/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs",
////         "outDir": "../../node_modules/lib",
////         "rootDir": "./src"
////     }
//// }

// @Filename: /packages/lib/src/index.ts
//// export const util = 0;

// @Filename: /node_modules/lib/index.d.ts
//// export const util: number;

// @Filename: /node_modules/lib/package.json
//// { "name": "lib", "version": "1.0.0", "main": "index.js", "types": "index.d.ts" }

// @Filename: /packages/app/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs"
////     },
////     "references": [
////         { "path": "../lib" }
////     ]
//// }

// @Filename: /packages/app/index.ts
//// util/**/

// Test that the ModuleSpecifierResolutionHost used for resolving the specifier
// for a file in the referenced project knows that lib/src/index.ts is a source
// of a project reference redirect. This test is contrived and bizarre but I
// I couldn't figure out another way to test this behavior.

goTo.marker("");

verify.importFixAtPosition([
  `import { util } from "lib";\r\n\r\nutil`,
], /*errorCode*/ undefined);

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "util",
    source: "lib",
    sourceDisplay: "lib",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
    data: {
      source: "/packages/lib/tsconfig.json",
      exportName: "util",
      fileName: "/packages/lib/src/index.ts",
      moduleSpecifier: "lib"
    },
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    includeProjectReferenceAutoImports: "on",
  },
});
