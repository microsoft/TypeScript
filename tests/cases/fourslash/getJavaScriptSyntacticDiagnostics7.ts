/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////module [|M|] { }

verify.getSyntacticDiagnostics([{
    message: "'module declarations' can only be used in a .ts file.",
    code: 8007
}]);
