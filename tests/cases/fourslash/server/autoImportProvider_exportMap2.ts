/// <reference path="../fourslash.ts"/>

// This one uses --module=commonjs, so the export map is not followed.

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs"
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
////   "types": "./lib/index.d.ts",
////   "exports": {
////     ".": {
////       "types": "./lib/index.d.ts"
////     },
////     "./lol": {
////       "types": "./lib/lol.d.ts"
////     }
////   }
//// }

// @Filename: /node_modules/dependency/lib/index.d.ts
//// export function fooFromIndex(): void;

// @Filename: /node_modules/dependency/lib/lol.d.ts
//// export function fooFromLol(): void;

// @Filename: /src/foo.ts
//// fooFrom/**/

goTo.marker("");

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "fooFromIndex",
    source: "dependency",
    sourceDisplay: "dependency",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
    allowIncompleteCompletions: true,
  },
});