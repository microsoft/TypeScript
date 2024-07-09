/// <reference path='fourslash.ts' />

////<object>"words"

verify.codeFix({
    description: "Add 'unknown' conversion for non-overlapping types",
    newFileContent: `<object><unknown>"words"`
});
