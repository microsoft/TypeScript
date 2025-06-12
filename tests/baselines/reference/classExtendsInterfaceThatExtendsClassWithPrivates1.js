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
    constructor() {
        this.x = 1;
    }
    foo(x) { return x; }
}
class D2 {
    constructor() {
        this.x = 3;
    }
    foo(x) { return x; }
    other(x) { return x; }
}
