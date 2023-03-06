/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: a.js
//// function f() {
////     var locals = 2
////     [|locale|].toFixed()
////     return locals
//// }

verify.noErrors()
verify.codeFixAvailable([
    { description: "Change spelling to 'locals'" },
]);

verify.codeFix({
    description: "Change spelling to 'locals'",
    index: 0,
    newFileContent:
`function f() {
    var locals = 2
    locals.toFixed()
    return locals
}`,
});
