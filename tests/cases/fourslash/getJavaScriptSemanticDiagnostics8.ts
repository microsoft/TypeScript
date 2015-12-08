/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// type a = b;

verify.getSemanticDiagnostics(`[
  {
    "message": "'type aliases' can only be used in a .ts file.",
    "start": 0,
    "length": 11,
    "category": "error",
    "code": 8008
  }
]`);