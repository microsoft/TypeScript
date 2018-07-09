/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function f(a, b, { x, y }) { b; }
////f(0, 1, 2);
////
////class C {
////    m(a, b, c) { b; }
////}
////new C().m(0, 1, 2);
////
////// Test of deletedAncestors
////function a(a: any, unused: any) { a; }
////function b(a: any, unused: any) { a; }
////
////b(1, {
////    prop: a(2, [
////        b(3, a(4, undefined)),
////    ]),
////});

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`function f(b) { b; }
f(1);

class C {
    m(b) { b; }
}
new C().m(1);

// Test of deletedAncestors
function a(a: any) { a; }
function b(a: any) { a; }

b(1);`,
});
