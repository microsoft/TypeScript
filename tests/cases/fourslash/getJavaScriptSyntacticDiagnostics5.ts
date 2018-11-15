/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////class C [|implements D|] { }

verify.getSyntacticDiagnostics([{
    message: "'implements clauses' can only be used in a .ts file.",
    code: 8005
}]);
