/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class C1 {
////    [|constructor(public p1: string, public p2: boolean, private p3: any, p5)|] { p5; }
//// }

verify.codeFix({
    description: "Remove declaration for: 'p3'",
    index: 0,
    newRangeContent: "constructor(public p1: string, public p2: boolean, p5)",
});
