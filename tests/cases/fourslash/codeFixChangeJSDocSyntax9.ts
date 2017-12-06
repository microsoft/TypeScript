/// <reference path='fourslash.ts' />
//// var x: [|function(new: number)|] = 12;

verify.codeFix({
    description: "Change 'function(new: number)' to 'new () => number'",
    newRangeContent: "new () => number",
});
