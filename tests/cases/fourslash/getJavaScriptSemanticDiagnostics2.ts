/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// export = b;

verify.getSemanticDiagnostics(`[
  {
    "message": "'export=' can only be used in a .ts file.",
    "start": 0,
    "length": 11,
    "category": "error",
    "code": 8003
  },
  {
    "message": "Cannot compile modules unless the '--module' flag is provided.",
    "start": 0,
    "length": 11,
    "category": "error",
    "code": 1148
  }
]`);