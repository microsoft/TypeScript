/// <reference path='fourslash.ts' />

////for (x in []) {}

verify.codeFix({
    description: "Add 'const' to unresolved variable",
    newFileContent: "for (const x in []) {}"
});
