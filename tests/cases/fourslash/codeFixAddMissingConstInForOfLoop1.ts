/// <reference path='fourslash.ts' />

////for (x of []) {}

verify.codeFix({
    description: "Add 'const' to unresolved variable",
    newFileContent: "for (const x of []) {}"
});
