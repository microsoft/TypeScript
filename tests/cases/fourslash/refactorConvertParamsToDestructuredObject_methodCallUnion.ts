/// <reference path='fourslash.ts' />

////class A {
////    /*a*/foo/*b*/(a: number, b: number) { return a + b; }
////}
////class B {
////    foo(c: number, d: number) { return c + d; }
////}
////declare var ab: A | B;
////ab.foo(1, 2);


goTo.select("a", "b");
// Refactor should not make changes
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `class A {
    foo(a: number, b: number) { return a + b; }
}
class B {
    foo(c: number, d: number) { return c + d; }
}
declare var ab: A | B;
ab.foo(1, 2);`
});