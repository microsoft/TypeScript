/// <reference path='fourslash.ts' />
//// var x: [|function(this: number, number): string|] = 12;

verify.codeFix({
    description: "Change 'function(this: number, number): string' to '(this: number, arg1: number) => string'",
    newRangeContent: "(this: number, arg1: number) => string",
});
