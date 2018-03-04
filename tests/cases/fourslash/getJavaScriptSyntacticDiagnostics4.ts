/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////[|public|] class C { }

verify.getSyntacticDiagnostics([{
    message: "'public' can only be used in a .ts file.",
    code: 8009
}]);
