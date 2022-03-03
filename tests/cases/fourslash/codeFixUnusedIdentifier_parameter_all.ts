/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////function f(a, b, { x, y }) { b; }
////f(0, 1, { x: 1, y: 1 });
////function g(a, b, { x, y }: { x: number, y: number }) { b; }
////g();
////function h(a, b?) { a; }
////h(1);
////function i(x = 1) { }
////i();
////
////function container(o) {
////    const { x, y } = { x: 1, y: 2 }
////    const { a, b } = o
////    const [ z, ka ] = [ 3, 4 ]
////    const [ c, d ] = o
////}
////
////class C {
////    m(a, b, c) { b; }
////    n(a, b, c) { b; }
////}
////new C().m(0, 1, 2);
////new C().n();
////
////// Test of deletedAncestors
////function a(a: any, unused: any) { a; }
////function b(a: any, unused: any) { a; }
////function c(a: any, unused: any) { a; }
////
////b(1, {
////    prop: a(2, [
////        b(3, a(4, undefined)),
////    ]),
////});
////b(1, { prop: c() });

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_declarations.message,
    newFileContent:
`function f(a, b, { x, y }) { b; }
f(0, 1, { x: 1, y: 1 });
function g(b) { b; }
g();
function h(a) { a; }
h(1);
function i(x = 1) { }
i();

function container(o) {
    const { x, y } = { x: 1, y: 2 }
    const { a, b } = o
    const [ z, ka ] = [ 3, 4 ]
    const [ c, d ] = o
}

class C {
    m(a, b, c) { b; }
    n(b) { b; }
}
new C().m(0, 1, 2);
new C().n();

// Test of deletedAncestors
function a(a: any, unused: any) { a; }
function b(a: any, unused: any) { a; }
function c(a: any) { a; }

b(1, {
    prop: a(2, [
        b(3, a(4, undefined)),
    ]),
});
b(1, { prop: c() });`,
});
