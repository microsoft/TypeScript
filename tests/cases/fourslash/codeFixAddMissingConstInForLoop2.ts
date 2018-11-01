/// <reference path='fourslash.ts' />

////[|for (x of []) {}|]
////[|for (y of []) {}|]

verify.codeFixAll({
    fixId: "addMissingConstInForLoop",
    fixAllDescription: "Add const modifiers to all unresolved variables",
    newFileContent: 
`for (const x of []) {}
for (const y of []) {}`
});
