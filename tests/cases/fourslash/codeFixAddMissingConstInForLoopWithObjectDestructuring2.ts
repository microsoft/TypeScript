/// <reference path='fourslash.ts' />

////for ({ x, y } of [{ x: 0, y: 1 }]) { }
////for ({ x } of [{ x: 0 }]) { }

verify.codeFixAll({
    fixId: "addMissingConst",
    fixAllDescription: "Add 'const' to all unresolved variables",
    newFileContent: 
`for (const { x, y } of [{ x: 0, y: 1 }]) { }
for (const { x } of [{ x: 0 }]) { }`
});
