/// <reference path='fourslash.ts' />

////[|<string>["words"]|]

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newRangeContent: `<string><unknown>["words"]`
});
