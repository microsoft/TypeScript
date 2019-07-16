/// <reference path='fourslash.ts' />

////for ([x] of [[1,2]]) {}

verify.codeFix({
    description: "Add 'const' to unresolved variable",
    newFileContent: "for (const [x] of [[1,2]]) {}"
});
