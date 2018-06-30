/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////function F([|public|] p) { }

verify.getSyntacticDiagnostics([{
    message: "'parameter modifiers' can only be used in a .ts file.",
    code: 8012
}]);
