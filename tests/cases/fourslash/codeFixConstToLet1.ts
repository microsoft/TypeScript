/// <reference path='fourslash.ts' />

////const x = 42;
////x = 75;

verify.codeFix({
    description: "Convert 'const' to 'let'",
    index: 0,
    newFileContent:
`let x = 42;
x = 75;`
});
