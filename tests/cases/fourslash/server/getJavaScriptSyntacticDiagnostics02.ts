/// <reference path="../fourslash.ts" />

// @allowJs: true
// @Filename: b.js
//// var a = "a";
//// var b: boolean = true;
//// function foo(): string { }
//// var var = "c";

verify.getSyntacticDiagnostics(`[
  {
    "message": "\'types\' can only be used in a .ts file.",
    "start": 20,
    "length": 7,
    "category": "error",
    "code": 8010
  },
  {
    "message": "\'types\' can only be used in a .ts file.",
    "start": 52,
    "length": 6,
    "category": "error",
    "code": 8010
  },
  {
    "message": "Variable declaration expected.",
    "start": 67,
    "length": 3,
    "category": "error",
    "code": 1134
  },
  {
    "message": "Variable declaration expected.",
    "start": 71,
    "length": 1,
    "category": "error",
    "code": 1134
  },
  {
    "message": "Variable declaration expected.",
    "start": 73,
    "length": 3,
    "category": "error",
    "code": 1134
  }
]`);
verify.getSemanticDiagnostics(`[]`);