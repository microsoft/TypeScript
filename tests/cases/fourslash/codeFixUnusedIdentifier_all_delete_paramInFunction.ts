/// <reference path='fourslash.ts' />

////export {};
////function f(x) {}

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_declarations.message,
    newFileContent: "export {};\n",
});
