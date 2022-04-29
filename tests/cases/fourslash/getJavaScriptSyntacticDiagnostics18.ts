/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////class C {
////    x; // Regular property declaration allowed
////    static y; // static allowed
////    public z; // public not allowed
////}

// @Filename: b.js
////class C {
////    x: number; // Types not allowed
////}

verify.baselineSyntacticDiagnostics()
