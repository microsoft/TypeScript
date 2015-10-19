/// <reference path="fourslash.ts" />

// @jsExtensions: js
// @Filename: a.js
//// function F(p?) { }

verify.getSemanticDiagnostics(`[
  {
    "message": "'?' can only be used in a .ts file.",
    "start": 12,
    "length": 1,
    "category": "error",
    "code": 8009
  }
]`);