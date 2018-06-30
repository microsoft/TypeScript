/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////enum [|E|] { }

verify.getSyntacticDiagnostics([{
    message: "'enum declarations' can only be used in a .ts file.",
    code: 8015
}]);
