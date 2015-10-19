/// <reference path="fourslash.ts" />

// @jsExtensions: js
// @Filename: a.js
//// var v = <string>undefined;

verify.getSyntacticDiagnostics(`[
  {
    "message": "Expected corresponding JSX closing tag for 'string'.",
    "start": 26,
    "length": 0,
    "category": "error",
    "code": 17002
  }
]`);
verify.getSemanticDiagnostics(`[]`);