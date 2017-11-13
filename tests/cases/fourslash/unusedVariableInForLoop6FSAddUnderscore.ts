/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////for ([|const elem of |]["a", "b", "c"]) {}

verify.codeFix({
    description: "Prefix 'elem' with an underscore.",
    index: 1,
    newFileContent: 'for (const _elem of ["a", "b", "c"]) {}',
});
