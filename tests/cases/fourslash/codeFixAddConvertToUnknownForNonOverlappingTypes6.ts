/// <reference path='fourslash.ts' />

////[|<string>0 * (4 + 3) / 100|]

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newRangeContent: `<string><unknown>0 * (4 + 3) / 100`
});
