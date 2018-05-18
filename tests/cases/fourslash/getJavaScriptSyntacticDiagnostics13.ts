/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////var v: [|() => number|];

verify.getSyntacticDiagnostics([{
    message: "'types' can only be used in a .ts file.",
    code: 8010
}]);