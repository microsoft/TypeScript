/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.tsjs
//// type a = b;

verify.getSemanticDiagnostics(`[
  {
    "message": "'type aliases' can only be used in TypeScript.",
    "start": 0,
    "length": 11,
    "category": "error",
    "code": 8008
  }
]`);