/// <reference path='fourslash.ts' />

////const a = 1, b = 1;
////b = 2;

verify.codeFix({
    description: "Convert 'const' to 'let'",
    index: 0,
    newFileContent:
`let a = 1, b = 1;
b = 2;`
});
