/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class C1 {
////    [|constructor(private readonly p2: boolean, p5)|] { p5; }
//// }

verify.rangeAfterCodeFix("constructor(p5)");