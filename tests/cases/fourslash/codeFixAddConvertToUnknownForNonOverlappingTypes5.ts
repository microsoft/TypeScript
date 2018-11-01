/// <reference path='fourslash.ts' />

////[|<string>0|]

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newRangeContent: `<string><unknown>0`
});
