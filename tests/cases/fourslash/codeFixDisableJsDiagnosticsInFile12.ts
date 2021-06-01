/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: a.js
//// function f() {
////     var locals = 2
////     [|locale|].toFixed()
////     return locals
//// }

verify.codeFixAvailable([
    { description: "Change spelling to 'locals'" },
    { description: "Ignore this error message" },
    { description: "Disable checking for this file" },
]);

verify.codeFix({
    description: ts.Diagnostics.Disable_checking_for_this_file.message,
    index: 2,
    newFileContent:
`// @ts-nocheck
function f() {
    var locals = 2
    locale.toFixed()
    return locals
}`,
});
