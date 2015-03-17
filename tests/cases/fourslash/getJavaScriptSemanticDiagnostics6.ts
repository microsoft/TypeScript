/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.tsjs
//// interface I { }

verify.getSemanticDiagnostics(`[
  {
    "message": "'interface declarations' can only be used in TypeScript.",
    "start": 10,
    "length": 1,
    "category": "error",
    "code": 8006
  }
]`);