/// <reference path='fourslash.ts' />

////[x] = [0];

verify.codeFix({
    description: "Add 'const' to unresolved variable",
    newFileContent: "const [x] = [0];"
});
