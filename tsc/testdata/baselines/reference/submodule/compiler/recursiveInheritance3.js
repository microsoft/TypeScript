//// [tests/cases/compiler/recursiveInheritance3.ts] ////

//// [recursiveInheritance3.ts]
class C implements I {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

//// [recursiveInheritance3.js]
class C {
    foo(x) { return x; }
    x = 1;
}
