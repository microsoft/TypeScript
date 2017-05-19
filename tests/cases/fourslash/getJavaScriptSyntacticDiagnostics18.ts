/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////class C {
////    x; // Regular property declaration allowed
////    static y; // static allowed
////    public z; // public not allowed
////}

goTo.file("a.js");
verify.getSyntacticDiagnostics(`[
  {
    "message": "\'public\' can only be used in a .ts file.",
    "start": 93,
    "length": 6,
    "category": "error",
    "code": 8009
  }
]`);

// @Filename: b.js
////class C {
////    x: number; // Types not allowed
////}

goTo.file("b.js");
verify.getSyntacticDiagnostics(`[
  {
    "message": "'types' can only be used in a .ts file.",
    "start": 17,
    "length": 6,
    "category": "error",
    "code": 8010
  }
]`);
