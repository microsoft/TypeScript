/// <reference path="../fourslash.ts"/>

// @types package should be ignored because implementation package has types

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
////   },
////   "devDependencies": {
////     "@types/dependency": "^1.0.0"
////   }
//// }

// @Filename: /node_modules/dependency/package.json
//// {
////   "type": "module",
////   "name": "dependency",
////   "version": "1.0.0",
////   "exports": {
////     ".": "./lib/index.js",
////     "./lol": "./lib/lol.js"
////   }
//// }

// @Filename: /node_modules/dependency/lib/index.js
//// export function fooFromIndex() {}

// @Filename: /node_modules/dependency/lib/index.d.ts
//// export declare function fooFromIndex(): void

// @Filename: /node_modules/dependency/lib/lol.js
//// export function fooFromLol() {}

// @Filename: /node_modules/dependency/lib/lol.d.ts
//// export declare function fooFromLol(): void

// @Filename: /node_modules/@types/dependency/package.json
//// {
////   "type": "module",
////   "name": "@types/dependency",
////   "version": "1.0.0",
////   "exports": {
////     ".": "./lib/index.d.ts",
////     "./lol": "./lib/lol.d.ts"
////   }
//// }

// @Filename: /node_modules/@types/dependency/lib/index.d.ts
//// export declare function fooFromAtTypesIndex(): void;

// @Filename: /node_modules/@types/dependency/lib/lol.d.ts
//// export declare function fooFromAtTypesLol(): void;

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
  }, {
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
