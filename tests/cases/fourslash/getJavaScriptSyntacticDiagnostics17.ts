/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////function F(a: [|number|]) { }

verify.getSyntacticDiagnostics([{
    message: "'types' can only be used in a .ts file.",
    code: 8010
}]);
