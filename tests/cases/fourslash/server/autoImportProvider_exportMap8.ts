/// <reference path="../fourslash.ts"/>

// Both 'import' and 'require' should be pulled in

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
////     "./lol": {
////       "import": "./lib/index.js",
////       "require": "./lib/lol.js"
////     }
////   }
//// }

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/index.d.ts
//// export function fooFromIndex(): void;

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/lol.d.ts
//// export function fooFromLol(): void;

// @Filename: /home/src/workspaces/project/src/bar.ts
//// import { fooFromIndex } from "dependency";

// @Filename: /home/src/workspaces/project/src/foo.cts
//// fooFrom/*cts*/

// @Filename: /home/src/workspaces/project/src/foo.mts
//// fooFrom/*mts*/

goTo.marker("cts");
verify.completions({
  marker: "cts",
  includes: [{
    name: "fooFromLol",
    source: "dependency/lol",
    sourceDisplay: "dependency/lol",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }],
  excludes: "fooFromIndex",
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
    allowIncompleteCompletions: true,
  },
});

goTo.marker("mts");
verify.completions({
  marker: "mts",
  includes: [{
    name: "fooFromIndex",
    source: "dependency/lol",
    sourceDisplay: "dependency/lol",
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
