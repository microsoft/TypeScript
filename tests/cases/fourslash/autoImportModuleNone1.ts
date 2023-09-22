/// <reference path="fourslash.ts" />

// @module: none
// @moduleResolution: node10
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
verify.getSemanticDiagnostics([{
  range: { fileName: "/index.ts", pos: 0, end: "import { x } from 'dep';".length },
  code: ts.Diagnostics.Cannot_use_imports_exports_or_module_augmentations_when_module_is_none.code,
  message: ts.Diagnostics.Cannot_use_imports_exports_or_module_augmentations_when_module_is_none.message
}]);
