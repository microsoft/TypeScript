/// <reference path='fourslash.ts' />

////x = 0, y = 0;

verify.codeFixAll({
    fixId: "addMissingConst",
    fixAllDescription: "Add 'const' to all unresolved variables",
    newFileContent: "const x = 0, y = 0;"
});
