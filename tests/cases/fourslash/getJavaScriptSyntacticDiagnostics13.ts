/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// var v: () => number;

verify.getSyntacticDiagnostics(`[
  {
    "message": "'types' can only be used in a .ts file.",
    "start": 7,
    "length": 12,
    "category": "error",
    "code": 8010
  }
]`);