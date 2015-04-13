/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.js
//// module M { }

verify.getSemanticDiagnostics(`[
  {
    "message": "'module declarations' can only be used in a .ts file.",
    "start": 7,
    "length": 1,
    "category": "error",
    "code": 8007
  }
]`);