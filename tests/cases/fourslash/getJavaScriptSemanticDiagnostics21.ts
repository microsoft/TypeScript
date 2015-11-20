/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// @internal class C {}

verify.getSemanticDiagnostics(`[
  {
    "message": "'decorators' can only be used in a .ts file.",
    "start": 0,
    "length": 9,
    "category": "error",
    "code": 8017
  }
]`);