/// <reference path='fourslash.ts' />

////const variable = 5;
////variable = 4;

verify.codeFix({
    description: "Change 'const' to 'let'",
    newFileContent:
`let variable = 5;
variable = 4;`,
});
