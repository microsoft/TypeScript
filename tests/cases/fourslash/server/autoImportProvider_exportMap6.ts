/// <reference path="../fourslash.ts"/>

// @types package should be ignored because implementation package has types

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
////   },
////   "devDependencies": {
////     "@types/dependency": "^1.0.0"
////   }
//// }

// @Filename: /home/src/workspaces/project/node_modules/dependency/package.json
//// {
////   "type": "module",
////   "name": "dependency",
////   "version": "1.0.0",
////   "exports": {
////     ".": "./lib/index.js",
////     "./lol": "./lib/lol.js"
////   }
//// }

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/index.js
//// export function fooFromIndex() {}

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/index.d.ts
//// export declare function fooFromIndex(): void

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/lol.js
//// export function fooFromLol() {}

// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/lol.d.ts
//// export declare function fooFromLol(): void

// @Filename: /home/src/workspaces/project/node_modules/@types/dependency/package.json
//// {
////   "type": "module",
////   "name": "@types/dependency",
////   "version": "1.0.0",
////   "exports": {
////     ".": "./lib/index.d.ts",
////     "./lol": "./lib/lol.d.ts"
////   }
//// }

// @Filename: /home/src/workspaces/project/node_modules/@types/dependency/lib/index.d.ts
//// export declare function fooFromAtTypesIndex(): void;

// @Filename: /home/src/workspaces/project/node_modules/@types/dependency/lib/lol.d.ts
//// export declare function fooFromAtTypesLol(): void;

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
