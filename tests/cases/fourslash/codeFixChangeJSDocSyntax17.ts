/// <reference path='fourslash.ts' />
//// declare function index(ix: number): [|*|];

verify.codeFix({
    description: "Change '*' to 'any'",
    newRangeContent: "any",
});
