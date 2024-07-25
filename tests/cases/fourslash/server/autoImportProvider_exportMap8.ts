/// <reference path="../fourslash.ts"/>

// Both 'import' and 'require' should be pulled in

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext"
////   }
//// }

// @Filename: /package.json
//// {
////   "type": "module",
////   "dependencies": {
////     "dependency": "^1.0.0"
////   }
//// }

// @Filename: /node_modules/dependency/package.json
//// {
////   "type": "module",
////   "name": "dependency",
////   "version": "1.0.0",
////   "exports": {
////     "./lol": {
////       "import": "./lib/index.js",
////       "require": "./lib/lol.js"
////     }
////   }
//// }

// @Filename: /node_modules/dependency/lib/index.d.ts
//// export function fooFromIndex(): void;

// @Filename: /node_modules/dependency/lib/lol.d.ts
//// export function fooFromLol(): void;

// @Filename: /src/bar.ts
//// import { fooFromIndex } from "dependency";

// @Filename: /src/foo.cts
//// fooFrom/*cts*/

// @Filename: /src/foo.mts
//// fooFrom/*mts*/

goTo.marker("cts");
verify.completions({
  marker: "cts",
  exact: completion.globalsPlus([{
    name: "fooFromLol",
    source: "dependency/lol",
    sourceDisplay: "dependency/lol",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
    allowIncompleteCompletions: true,
  },
});

goTo.marker("mts");
verify.completions({
  marker: "mts",
  exact: completion.globalsPlus([{
    name: "fooFromIndex",
    source: "dependency/lol",
    sourceDisplay: "dependency/lol",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
    allowIncompleteCompletions: true,
  },
});
