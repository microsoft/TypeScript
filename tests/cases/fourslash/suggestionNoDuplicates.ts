// @strict: false
/// <reference path="fourslash.ts" />
// @Filename: foo.ts
//// import { f } from [|'m'|]
//// f

// @Filename: node_modules/m/index.js
//// module.exports.f = function (x) { return x }

verify.getSemanticDiagnostics([])
verify.getSuggestionDiagnostics([{
    code: 7016,
    message: "Could not find a declaration file for module 'm'. '/tests/cases/fourslash/node_modules/m/index.js' implicitly has an 'any' type.",
}])
