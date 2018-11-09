/// <reference path='fourslash.ts' />

////["words"] as string

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newFileContent: `["words"] as unknown as string`
});
