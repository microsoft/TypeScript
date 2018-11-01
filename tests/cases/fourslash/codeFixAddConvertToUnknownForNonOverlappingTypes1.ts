/// <reference path='fourslash.ts' />

////[|0 as string|]

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newRangeContent: `0 as unknown as string`
});
