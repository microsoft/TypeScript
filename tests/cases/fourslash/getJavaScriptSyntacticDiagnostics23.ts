/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// function Person(age) {
////     if (age >= 18) {
////         this.canVote = true;
////     } else {
////         this.canVote = false;
////     }
//// }

verify.getSyntacticDiagnostics(`[]`);
verify.getSemanticDiagnostics(`[]`);
