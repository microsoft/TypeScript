/// <reference path='fourslash.ts' />

// @noUnusedLocals: true

////label: while (1) {}

verify.codeFix({
    description: "Remove unused label",
    newFileContent:
`while (1) {}`,
});
