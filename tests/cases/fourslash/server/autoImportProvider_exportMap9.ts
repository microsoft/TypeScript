/// <reference path="../fourslash.ts"/>

// Only the first resolution in an array should be used

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
////     "./lol": ["./lib/index.js", "./lib/lol.js"]
////   }
//// }

// @Filename: /node_modules/dependency/lib/index.d.ts
//// export function fooFromIndex(): void;

// @Filename: /node_modules/dependency/lib/lol.d.ts
//// export function fooFromLol(): void;

// @Filename: /src/bar.ts
//// import { fooFromIndex } from "dependency";

// @Filename: /src/foo.ts
//// fooFrom/**/


goTo.marker("");
verify.completions({
  marker: "",
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
