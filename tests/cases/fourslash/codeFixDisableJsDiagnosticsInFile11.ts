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
    description: ts.Diagnostics.Ignore_this_error_message.message,
    index: 1,
    newFileContent:
`function f() {
    var locals = 2
    // @ts-ignore
    locale.toFixed()
    return locals
}`,
});
