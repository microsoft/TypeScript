/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// function F(public p) { }

verify.getSyntacticDiagnostics(`[
  {
    "message": "'parameter modifiers' can only be used in a .ts file.",
    "start": 11,
    "length": 6,
    "category": "error",
    "code": 8012
  }
]`);