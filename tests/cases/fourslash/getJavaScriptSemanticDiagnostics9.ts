/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.tsjs
//// public function F() { }

verify.getSemanticDiagnostics(`[
  {
    "message": "'public' can only be used in TypeScript.",
    "start": 0,
    "length": 6,
    "category": "error",
    "code": 8009
  }
]`);