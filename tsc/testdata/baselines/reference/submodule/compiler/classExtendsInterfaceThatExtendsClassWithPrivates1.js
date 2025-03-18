//// [tests/cases/compiler/classExtendsInterfaceThatExtendsClassWithPrivates1.ts] ////

//// [classExtendsInterfaceThatExtendsClassWithPrivates1.ts]
class C {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

class D2 implements I {
    public foo(x: any) { return x }
    private x = 3;
    other(x: any) { return x }
} 

//// [classExtendsInterfaceThatExtendsClassWithPrivates1.js]
class C {
    foo(x) { return x; }
    x = 1;
}
class D2 {
    foo(x) { return x; }
    x = 3;
    other(x) { return x; }
}
