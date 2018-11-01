/// <reference path='fourslash.ts' />

////[|"words" as object|]

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newRangeContent: `"words" as unknown as object`
});
