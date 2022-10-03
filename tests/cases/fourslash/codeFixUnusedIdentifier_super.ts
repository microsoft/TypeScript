/// <reference path='fourslash.ts' />

// @noUnusedParameters: true


//// class B {
////     fromBase(x: number) { return x }
//// }
////
//// class C extends B {
////     fromDerived(keep1: number, remove1: number) {}
////     fromBase(keep2: number, remove2: any) {}
////     m(keep3: number, remove3: number) {}
//// }
////
//// class D extends C {
////     fromDerived(x: number) { return x }
////     caller() {
////         super.m(1);
////     }
//// }
////

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_declarations.message,
    newFileContent: `class B {
    fromBase(x: number) { return x }
}

class C extends B {
    fromDerived(keep1: number) {}
    fromBase(keep2: number) {}
    m(keep3: number) {}
}

class D extends C {
    fromDerived(x: number) { return x }
    caller() {
        super.m(1);
    }
}
`});
