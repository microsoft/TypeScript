/// <reference path="fourslash.ts" />

// @jsExtensions: js
// @Filename: a.js
//// function F<T>() { }

verify.getSemanticDiagnostics(`[
  {
    "message": "'type parameter declarations' can only be used in a .ts file.",
    "start": 11,
    "length": 1,
    "category": "error",
    "code": 8004
  }
]`);