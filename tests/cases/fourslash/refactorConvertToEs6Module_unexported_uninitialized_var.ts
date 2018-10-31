/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////var privateUnrelated;
////[|exports.f|] = function() {};
////privateUnrelated = 1;
////console.log(privateUnrelated);

verify.getSuggestionDiagnostics([{
    message: "File is a CommonJS module; it may be converted to an ES6 module.",
    code: 80001,
}]);

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`var privateUnrelated;
export function f() {}
privateUnrelated = 1;
console.log(privateUnrelated);`,
});
