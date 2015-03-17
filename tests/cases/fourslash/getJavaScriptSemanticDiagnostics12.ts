/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.tsjs
//// declare var v;

verify.getSemanticDiagnostics(`[
  {
    "message": "'declare' can only be used in TypeScript.",
    "start": 0,
    "length": 7,
    "category": "error",
    "code": 8009
  }
]`);