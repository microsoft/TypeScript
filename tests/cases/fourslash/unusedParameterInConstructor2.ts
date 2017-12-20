/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class C1 {
////    [|constructor(public p1: string, private p2: boolean, public p3: any, p5)|] { p5; }
//// }

verify.codeFix({
    description: "Remove declaration for: 'p2'",
    index: 0,
    newRangeContent: "constructor(public p1: string, public p3: any, p5)",
});
