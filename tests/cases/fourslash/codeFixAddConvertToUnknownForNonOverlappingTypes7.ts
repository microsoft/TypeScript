/// <reference path='fourslash.ts' />

////<string>["words"]

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newFileContent: `<string><unknown>["words"]`
});
