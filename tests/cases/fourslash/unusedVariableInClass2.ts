/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {
////    [|public greeting1;
////    private greeting: string;|]
////}

verify.rangeAfterCodeFix("public greeting1;", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
