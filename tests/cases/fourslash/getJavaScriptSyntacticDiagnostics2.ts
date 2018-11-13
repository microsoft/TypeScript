/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////[|export = b;|]

verify.getSyntacticDiagnostics([{
    message: "'export=' can only be used in a .ts file.",
    code: 8003
}]);
