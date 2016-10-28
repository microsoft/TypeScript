/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// class C implements D { }

verify.getSyntacticDiagnostics(`[
  {
    "message": "'implements clauses' can only be used in a .ts file.",
    "start": 8,
    "length": 12,
    "category": "error",
    "code": 8005
  }
]`);