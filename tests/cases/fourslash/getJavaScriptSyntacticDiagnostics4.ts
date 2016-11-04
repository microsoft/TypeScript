/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// public class C { }

verify.getSyntacticDiagnostics(`[
  {
    "message": "'public' can only be used in a .ts file.",
    "start": 0,
    "length": 6,
    "category": "error",
    "code": 8009
  }
]`);