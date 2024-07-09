/// <reference path='fourslash.ts' />

////[x, y] = [0, 1];

verify.codeFixAll({
    fixId: "addMissingConst",
    fixAllDescription: "Add 'const' to all unresolved variables",
    newFileContent: "const [x, y] = [0, 1];"
});
