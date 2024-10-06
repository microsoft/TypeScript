/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
//// {
////     "name": "pkg",
////     "version": "1.0.0",
////     "exports": {
////         "./*": "./a/*.js",
////         "./b/*.js": "./b/*.js",
////         "./c/*": "./c/*",
////         "./d/*": {
////             "import": "./d/*.mjs"
////         }
////     }
//// }

// @Filename: /home/src/workspaces/project/node_modules/pkg/a/a1.d.ts
//// export const a1: number;

// @Filename: /home/src/workspaces/project/node_modules/pkg/b/b1.d.ts
//// export const b1: number;

// @Filename: /home/src/workspaces/project/node_modules/pkg/b/b2.d.mts
//// export const NOT_REACHABLE: number;

// @Filename: /home/src/workspaces/project/node_modules/pkg/c/c1.d.ts
//// export const c1: number;

// @Filename: /home/src/workspaces/project/node_modules/pkg/c/subfolder/c2.d.mts
//// export const c2: number;

// @Filename: /home/src/workspaces/project/node_modules/pkg/d/d1.d.mts
//// export const d1: number;

// @Filename: /home/src/workspaces/project/package.json
//// {
////     "type": "module",
////     "dependencies": {
////         "pkg": "1.0.0"
////     }
//// }

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "nodenext"
////     }
//// }

// @Filename: /home/src/workspaces/project/main.ts
//// /**/

verify.completions({
  marker: "",
  includes: [
    {
      name: "a1",
      source: "pkg/a1",
      sourceDisplay: "pkg/a1",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    {
      name: "b1",
      source: "pkg/b/b1.js",
      sourceDisplay: "pkg/b/b1.js",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    {
      name: "c1",
      source: "pkg/c/c1.js",
      sourceDisplay: "pkg/c/c1.js",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    {
      name: "c2",
      source: "pkg/c/subfolder/c2.mjs",
      sourceDisplay: "pkg/c/subfolder/c2.mjs",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    {
      name: "d1",
      source: "pkg/d/d1",
      sourceDisplay: "pkg/d/d1",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    }
  ],
  excludes: ["NOT_REACHABLE"],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true
  }
});
