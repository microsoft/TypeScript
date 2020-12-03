/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// export {}
//// [|var x = function f1(m: number) {}|]
//// x;
//// export var y: string;

verify.codeFix({
    description: "Remove unused declaration for: 'm'",
    index: 0,
    newRangeContent: `var x = function f1() {}`,
});
