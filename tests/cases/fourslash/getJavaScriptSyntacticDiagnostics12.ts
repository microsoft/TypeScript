/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// declare var v;

verify.getSyntacticDiagnostics(`[
  {
    "message": "'declare' can only be used in a .ts file.",
    "start": 0,
    "length": 7,
    "category": "error",
    "code": 8009
  }
]`);