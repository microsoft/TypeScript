/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// [|var x: string, z: number;|]
//// z;
//// export var y: string;

verify.codeFix({
    description: "Remove unused declaration for: 'x'",
    newRangeContent: "var z: number;",
});
