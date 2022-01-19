/// <reference path="../fourslash.ts"/>

// String exports

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
////   "name": "dependency",
////   "version": "1.0.0",
////   "main": "./lib/index.js",
////   "exports": "./lib/lol.d.ts"
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
    // TODO: We should filter this one out due to its bad module specifier,
    // but we don't know it's going to be filtered out until we actually
    // resolve the module specifier, which is a problem for completions
    // that don't have their module specifiers eagerly resolved.
    name: "fooFromIndex",
    source: "../node_modules/dependency/lib/index.js",
    sourceDisplay: "../node_modules/dependency/lib/index.js",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }, {
    name: "fooFromLol",
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
