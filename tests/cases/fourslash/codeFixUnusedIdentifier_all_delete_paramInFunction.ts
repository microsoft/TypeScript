/// <reference path='fourslash.ts' />

////export {};
////function f(x) {}

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: "Delete all unused declarations",
    newFileContent: "export {};\n",
});
