//// [tests/cases/compiler/interfaceExtendsClassWithPrivate2.ts] ////

//// [interfaceExtendsClassWithPrivate2.ts]
class C {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

class D extends C implements I { // error
    public foo(x: any) { return x; }
    private x = 2;
    private y = 3;
    other(x: any) { return x; }
    bar() {}
} 

class D2 extends C implements I { // error
    public foo(x: any) { return x; }
    private x = "";
    other(x: any) { return x; }
    bar() { }
} 

//// [interfaceExtendsClassWithPrivate2.js]
class C {
    constructor() {
        this.x = 1;
    }
    foo(x) { return x; }
}
class D extends C {
    constructor() {
        super(...arguments);
        this.x = 2;
        this.y = 3;
    }
    foo(x) { return x; }
    other(x) { return x; }
    bar() { }
}
class D2 extends C {
    constructor() {
        super(...arguments);
        this.x = "";
    }
    foo(x) { return x; }
    other(x) { return x; }
    bar() { }
}
