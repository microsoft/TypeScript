/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// interface I { }

verify.getSyntacticDiagnostics(`[
  {
    "message": "'interface declarations' can only be used in a .ts file.",
    "start": 10,
    "length": 1,
    "category": "error",
    "code": 8006
  }
]`);