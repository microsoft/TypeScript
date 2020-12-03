/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// [|var x: string;
//// export var y: string;|]

verify.codeFix({
    description: "Remove unused declaration for: 'x'",
    newRangeContent: "export var y: string;",
});
