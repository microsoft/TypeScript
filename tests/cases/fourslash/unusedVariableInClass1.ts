/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    [|private greeting: string;|]
////}

verify.rangeAfterCodeFix("", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
