/// <reference path='fourslash.ts' />

////for ([x, y] of [[1,2]]) {}
////for ([x] of [[1,2]]) {}

verify.codeFixAll({
    fixId: "addMissingConst",
    fixAllDescription: "Add 'const' to all unresolved variables",
    newFileContent: 
`for (const [x, y] of [[1,2]]) {}
for (const [x] of [[1,2]]) {}`
});
