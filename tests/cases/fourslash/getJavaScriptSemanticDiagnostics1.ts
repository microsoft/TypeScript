/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.js
//// import a = b;

verify.getSemanticDiagnostics(`[
  {
    "message": "'import ... =' can only be used in TypeScript.",
    "start": 0,
    "length": 13,
    "category": "error",
    "code": 8002
  }
]`);