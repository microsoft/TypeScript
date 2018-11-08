/// <reference path='fourslash.ts' />

////<string>0

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newFileContent: `<string><unknown>0`
});
