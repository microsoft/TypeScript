/// <reference path='fourslash.ts' />

////0 * (4 + 3) / 100 as string

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newFileContent: `0 * (4 + 3) / 100 as unknown as string`
});
