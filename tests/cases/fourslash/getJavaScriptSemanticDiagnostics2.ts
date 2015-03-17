/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.tsjs
//// export = b;

verify.getSemanticDiagnostics(`[
  {
    "message": "'export=' can only be used in TypeScript.",
    "start": 0,
    "length": 11,
    "category": "error",
    "code": 8003
  }
]`);