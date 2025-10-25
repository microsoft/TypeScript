/// <reference path="fourslash.ts" />

// @module: none
// @moduleResolution: bundler
// @target: es5

// @Filename: /node_modules/dep/index.d.ts
////export const x: number;

// @Filename: /index.ts
//// x/**/

verify.completions({
  marker: "",
  excludes: ["x"],
  preferences: {
    includeCompletionsForModuleExports: true,
  },
});

edit.replaceLine(0, "import { x } from 'dep'; x;");
verify.getSemanticDiagnostics([]);
