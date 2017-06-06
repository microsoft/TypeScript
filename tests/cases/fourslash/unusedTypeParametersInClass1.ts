/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter<T> |] {
////}

verify.rangeAfterCodeFix("class greeter", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);