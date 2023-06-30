/// <reference path="fourslash.ts" />

// @noEmit: true
// @allowImportingTsExtensions: true
// @module: nodenext

// @Filename: /nodes/problems.ts
//// export const problemCount = 99;

// @Filename: /scope.ts
//// import { problemCount } from "./nodes/problems.ts";

// @Filename: /package.json
//// { "type": "module" }

verify.getEditsForFileRename({
  oldPath: "/scope.ts",
  newPath: "/nodes/scope.ts",
  newFileContents: {
    "/scope.ts": 'import { problemCount } from "./problems.ts";',
  },
});
