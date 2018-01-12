/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class C1 {
////    [|constructor(private readonly p2: boolean, p5)|] { p5; }
//// }

verify.codeFix({
    description: "Remove declaration for: 'p2'",
    index: 0,
    newRangeContent: "constructor(p5)",
});
