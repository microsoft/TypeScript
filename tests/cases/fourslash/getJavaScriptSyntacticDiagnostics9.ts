/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////[|public|] function F() { }

verify.getSyntacticDiagnostics([{
    message: "'public' can only be used in a .ts file.",
    code: 8009
}]);
