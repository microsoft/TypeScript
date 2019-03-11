/// <reference path='fourslash.ts' />

////class A {
////    /*a*/foo/*b*/(a: number, b: number) { }
////}
////class B extends A {
////    /*c*/foo/*d*/(c: number, d: number) { }
////}
////var a = new A();
////a.foo(3, 4);
////var b = new B();
////b.foo(5, 6);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `class A {
    foo(a: number, b: number) { }
}
class B extends A {
    foo(c: number, d: number) { }
}
var a = new A();
a.foo(3, 4);
var b = new B();
b.foo(5, 6);`
});
goTo.select("c", "d");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `class A {
    foo(a: number, b: number) { }
}
class B extends A {
    foo(c: number, d: number) { }
}
var a = new A();
a.foo(3, 4);
var b = new B();
b.foo(5, 6);`
});
