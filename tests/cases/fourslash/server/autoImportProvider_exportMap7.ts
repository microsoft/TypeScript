/// <reference path="../fourslash.ts"/>

// Some exports are already in the main program while some are not.

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
////     ".": {
////       "types": "./lib/index.d.ts"
////     },
////     "./lol": {
////       "types": "./lib/lol.d.ts"
////     }
////   }
//// }

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/index.d.ts
//// export function fooFromIndex(): void;

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/lol.d.ts
//// export function fooFromLol(): void;

// @Filename: /home/src/workspaces/project/src/bar.ts
//// import { fooFromIndex } from "dependency";

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
  }, {
    name: "fooFromLol",
    source: "dependency/lol",
    sourceDisplay: "dependency/lol",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
    allowIncompleteCompletions: true,
  },
});