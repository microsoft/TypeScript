/// <reference path="fourslash.ts" />

// @jsExtensions: js
// @Filename: a.js
//// enum E { }

verify.getSemanticDiagnostics(`[
  {
    "message": "'enum declarations' can only be used in a .ts file.",
    "start": 5,
    "length": 1,
    "category": "error",
    "code": 8015
  }
]`);