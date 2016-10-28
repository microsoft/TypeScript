/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// import a = b;

verify.getSyntacticDiagnostics(`[
  {
    "message": "'import ... =' can only be used in a .ts file.",
    "start": 0,
    "length": 13,
    "category": "error",
    "code": 8002
  }
]`);