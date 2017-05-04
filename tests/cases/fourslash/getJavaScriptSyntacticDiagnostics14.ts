/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// Foo<number>();

verify.getSyntacticDiagnostics(`[
  {
    "message": "'type arguments' can only be used in a .ts file.",
    "start": 4,
    "length": 6,
    "category": "error",
    "code": 8011
  }
]`);