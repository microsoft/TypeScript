/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.js
//// function foo(...a) {}

verify.getSemanticDiagnostics(`[
  {
    "message": "'...' can only be used in a .ts file.",
    "start": 13,
    "length": 3,
    "category": "error",
    "code": 8009
  }
]`);