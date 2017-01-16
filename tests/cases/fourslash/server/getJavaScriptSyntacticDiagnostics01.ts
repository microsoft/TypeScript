/// <reference path="../fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// var ===;

verify.getSyntacticDiagnostics(`[
  {
    "message": "Variable declaration expected.",
    "start": 4,
    "length": 3,
    "category": "error",
    "code": 1134
  },
  {
    "message": "Expression expected.",
    "start": 7,
    "length": 1,
    "category": "error",
    "code": 1109
  }
]`);
verify.getSemanticDiagnostics(`[]`);