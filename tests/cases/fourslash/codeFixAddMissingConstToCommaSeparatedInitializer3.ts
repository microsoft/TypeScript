/// <reference path='fourslash.ts' />

////function f() { return 42; }
////x = 0, y = f()
////
////, z = 0;

verify.codeFixAll({
    fixId: "addMissingConst",
    fixAllDescription: "Add 'const' to all unresolved variables",
    newFileContent: `function f() { return 42; }
const x = 0, y = f()

, z = 0;`
});
