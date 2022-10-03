/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////for (const elem in ["a", "b", "c"]) {}

verify.codeFix({
    index: 1,
    description: "Prefix 'elem' with an underscore",
    newFileContent: 'for (const _elem in ["a", "b", "c"]) {}',
});
