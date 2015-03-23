/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.js
//// function F(p?) { }

verify.getSemanticDiagnostics(`[
  {
    "message": "'?' can only be used in TypeScript.",
    "start": 12,
    "length": 1,
    "category": "error",
    "code": 8013
  }
]`);