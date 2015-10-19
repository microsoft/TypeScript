/// <reference path="fourslash.ts" />

// @jsExtensions: js
// @Filename: a.js
//// declare var v;

verify.getSemanticDiagnostics(`[
  {
    "message": "'declare' can only be used in a .ts file.",
    "start": 0,
    "length": 7,
    "category": "error",
    "code": 8009
  }
]`);