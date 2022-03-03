/// <reference path='fourslash.ts' />
//// var f = <[|function(number?): number|]>(x => x);

verify.codeFix({
    description: "Change 'function(number?): number' to '(arg0: number) => number'",
    errorCode: 8020,
    index: 0,
    newRangeContent: "(arg0: number | null) => number",
});
