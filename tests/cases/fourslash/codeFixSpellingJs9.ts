/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: a.js
//// var locals = {}
//// [|// @ts-expect-error|]
//// Object.keys(locals)
verify.codeFixAvailable([
    { description: "Ignore this error message" },
    { description: "Disable checking for this file" },
]);

