/// <reference path='fourslash.ts' />

////const variable = 5;
////variable = 4;

verify.codeFix({
    description: "Remove 'const' modifier",
    newFileContent:
`let variable = 5;
variable = 4;`,
});
