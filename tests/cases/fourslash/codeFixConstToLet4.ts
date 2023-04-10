/// <reference path='fourslash.ts' />

////// Comment
////const a = 1;
////a = 2;

verify.codeFix({
    description: "Convert 'const' to 'let'",
    index: 0,
    newFileContent:
`// Comment
let a = 1;
a = 2;`
});
