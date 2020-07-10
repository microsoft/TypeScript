/// <reference path='fourslash.ts' />

// @noLib: true
// @noUnusedLocals: true

////let x = 0;
////x = 1;
////
////export class C {
////    private p: number;
////
////    m() { this.p = 0; }
////}

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_declarations.message,
    newFileContent:
`
export class C {

    m() { }
}`,
});
