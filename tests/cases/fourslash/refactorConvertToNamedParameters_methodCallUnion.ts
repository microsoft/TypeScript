/// <reference path='fourslash.ts' />

////class A {
////    /*a*/foo/*b*/(a: number, b: number) { return a + b; }
////}
////class B {
////    foo(c: number, d: number) { return c + d; }
////}
////function foo(ab: A | B) {
////    return ab.foo(1, 2);
////}


goTo.select("a", "b");
// Refactor should not make changes
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `class A {
    foo(a: number, b: number) { return a + b; }
}
class B {
    foo(c: number, d: number) { return c + d; }
}
function foo(ab: A | B) {
    return ab.foo(1, 2);
}`
});