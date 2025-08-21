/// <reference path="../fourslash.ts"/>

// Top-level conditions

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext"
////   }
//// }

// @Filename: /home/src/workspaces/project/package.json
//// {
////   "type": "module",
////   "dependencies": {
////     "dependency": "^1.0.0"
////   }
//// }

// @Filename: /home/src/workspaces/project/node_modules/dependency/package.json
//// {
////   "type": "module",
////   "name": "dependency",
////   "version": "1.0.0",
////   "exports": {
////     "types": "./lib/index.d.ts",
////     "require": "./lib/lol.js"
////   }
//// }

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/index.d.ts
//// export function fooFromIndex(): void;

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/lol.d.ts
//// export function fooFromLol(): void;

// @Filename: /home/src/workspaces/project/src/foo.ts
//// fooFrom/**/

goTo.marker("");

verify.completions({
  marker: "",
  includes: [{
    name: "fooFromIndex",
    source: "dependency",
    sourceDisplay: "dependency",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }],
  excludes: "fooFromLol",
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
    allowIncompleteCompletions: true,
  },
});