class C {
    static fn() { return this; }
    static get x() { return 1; }
    static set x(v) { }
    constructor(public a: number, private b: number) { }
    static foo: string; 
}

var r = C.fn();
var r2 = r.x;
var r3 = r.foo;

class D extends C {
    bar: string;
}

var r = D.fn();
var r2 = r.x;
var r3 = r.foo;