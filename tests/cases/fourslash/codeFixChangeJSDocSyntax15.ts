/// <reference path='fourslash.ts' />
//// var f = <[|function(number?): number|]>(x => x);

// note: without --strict, number? --> number, not number | null
verify.rangeAfterCodeFix("(arg0: number) => number", /*includeWhiteSpace*/ false, /*errorCode*/ 8020, 0);
