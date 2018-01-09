/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class C1 {
////    [|constructor(private p1: string, public p2: boolean, public p3: any, p5)|] { p5; }
//// }

verify.codeFix({
    description: "Remove declaration for: 'p1'",
    index: 0,
    newRangeContent: "constructor(public p2: boolean, public p3: any, p5)",
});
