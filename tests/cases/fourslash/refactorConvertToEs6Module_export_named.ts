/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////[|exports.f = function() {}|];
////exports.C = class {};
////exports.x = 0;

verify.getSuggestionDiagnostics([{
    message: "File is a CommonJS module; it may be converted to an ES6 module.",
    code: 80001,
}]);

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`export function f() { }
export class C {
}
export const x = 0;`,
});
