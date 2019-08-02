/// <reference path='fourslash.ts' />

////for (x of []) {}
////for (y of []) {}

verify.codeFixAll({
    fixId: "addMissingConst",
    fixAllDescription: "Add 'const' to all unresolved variables",
    newFileContent: 
`for (const x of []) {}
for (const y of []) {}`
});
