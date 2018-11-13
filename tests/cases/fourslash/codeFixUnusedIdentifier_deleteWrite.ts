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
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`
export class C {

    m() { }
}`,
});
