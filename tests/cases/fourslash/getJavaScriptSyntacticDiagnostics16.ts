/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////function F(p[|?|]) { }

verify.getSyntacticDiagnostics([{
    message: "'?' can only be used in a .ts file.",
    code: 8009
}]);
