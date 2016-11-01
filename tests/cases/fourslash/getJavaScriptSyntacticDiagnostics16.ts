/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// function F(p?) { }

verify.getSyntacticDiagnostics(`[
  {
    "message": "'?' can only be used in a .ts file.",
    "start": 12,
    "length": 1,
    "category": "error",
    "code": 8009
  }
]`);