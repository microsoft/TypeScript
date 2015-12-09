/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// class C { v }

verify.getSemanticDiagnostics(`[
  {
    "message": "'property declarations' can only be used in a .ts file.",
    "start": 10,
    "length": 1,
    "category": "error",
    "code": 8014
  }
]`);