// doc 2.5
// ok

struct C {
    static fn() { return this; }
    constructor(public a: number, private b: number) { }
    static foo: string; 
}

var r = C.fn();
var r2 = r.foo;

struct D extends C {
    bar: string;
}

var r = D.fn();
var r2 = r.foo;