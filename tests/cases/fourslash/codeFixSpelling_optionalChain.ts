/// <reference path="fourslash.ts" />

// @strict: true

////function f(x: string | null) {
////  [|x?.toLowrCase();|]
////}

verify.rangeAfterCodeFix(
  `x?.toLowerCase();`,
  /*includeWhiteSpace*/ false,
  /*errorCode*/ undefined,
  /*index*/ 0);
