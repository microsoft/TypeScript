class C {
    constructor(x: number);
    constructor(x: string);
    constructor(x) { }

    static foo(x: number);
    static foo(x: C);
    static foo(x) { }

    static bar(x) { }
}

class D extends C {
    static baz(x: number) { }
    foo() { }
}

var d: D;

var r1: typeof D;
var r2: typeof d;