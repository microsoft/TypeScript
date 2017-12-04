/// <reference path='fourslash.ts' />
//// var f = <[|function(number?): number|]>(x => x);

// note: without --strict, number? --> number, not number | null
verify.codeFix({
    description: "Change 'function(number?): number' to '(arg0: number) => number'",
    errorCode: 8020,
    index: 0,
    newRangeContent: "(arg0: number) => number",
});
