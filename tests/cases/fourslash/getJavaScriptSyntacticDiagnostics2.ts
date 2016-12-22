/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// export = b;

verify.getSyntacticDiagnostics(`[
  {
    "message": "'export=' can only be used in a .ts file.",
    "start": 0,
    "length": 11,
    "category": "error",
    "code": 8003
  }
]`);