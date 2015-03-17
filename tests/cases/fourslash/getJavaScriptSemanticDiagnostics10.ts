/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.tsjs
//// function F<T>() { }

verify.getSemanticDiagnostics(`[
  {
    "message": "'type parameter declarations' can only be used in TypeScript.",
    "start": 11,
    "length": 1,
    "category": "error",
    "code": 8004
  }
]`);