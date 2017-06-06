/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [|function f1<T>() {}|]

verify.rangeAfterCodeFix("function f1() {}", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
