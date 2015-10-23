/// <reference path="fourslash.ts" />

// @jsExtensions: js
// @Filename: a.js
//// Foo<number>();

verify.getSemanticDiagnostics(`[
  {
    "message": "'type arguments' can only be used in a .ts file.",
    "start": 4,
    "length": 6,
    "category": "error",
    "code": 8011
  }
]`);