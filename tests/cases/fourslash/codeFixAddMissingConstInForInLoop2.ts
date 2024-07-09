/// <reference path='fourslash.ts' />

////for (x in []) {}
////for (y in []) {}

verify.codeFixAll({
    fixId: "addMissingConst",
    fixAllDescription: "Add 'const' to all unresolved variables",
    newFileContent: 
`for (const x in []) {}
for (const y in []) {}`
});
