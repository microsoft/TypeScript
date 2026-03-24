/// <reference path='fourslash.ts' />

// @module: node18

// @Filename: /package.json
//// { "type": "module" }

// @Filename: /module.ts
//// export {};

// @Filename: /common1.cts
//// [|import type { } from "./module.ts"/*1*/;|]

// @Filename: /common2.cts
//// [|import type { } from "./module.ts"/*2*/ with { "type": "typescript" };|]

// @Filename: /common3.cts
//// [|import type { } from "./module"/*3*/;|]

// @Filename: /common4.cts
//// [|type _1 = typeof import("./module.ts"/*4*/);|]

goTo.marker("1");
verify.codeFix({
  index: 0,
  errorCode: ts.Diagnostics.Type_only_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribute.code,
  applyChanges: false,
  description: "Add 'resolution-mode' import attribute",
  newRangeContent: `import type { } from "./module.ts" with { "resolution-mode": "import" };`,
});

goTo.marker("2");
verify.codeFix({
  index: 0,
  errorCode: ts.Diagnostics.Type_only_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribute.code,
  applyChanges: false,
  description: "Add 'resolution-mode' import attribute",
  newRangeContent: `import type { } from "./module.ts" with { "type": "typescript", "resolution-mode": "import" };`,
});

goTo.marker("3");
verify.codeFix({
  index: 0,
  errorCode: ts.Diagnostics.Type_only_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribute.code,
  applyChanges: false,
  description: "Add 'resolution-mode' import attribute",
  newRangeContent: `import type { } from "./module" with { "resolution-mode": "require" };`,
});

goTo.marker("4");
verify.codeFix({
  index: 0,
  errorCode: ts.Diagnostics.Type_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribute.code,
  applyChanges: false,
  description: "Add 'resolution-mode' import attribute",
  newRangeContent: `type _1 = typeof import("./module.ts", { with: { "resolution-mode": "import" } });`,
});