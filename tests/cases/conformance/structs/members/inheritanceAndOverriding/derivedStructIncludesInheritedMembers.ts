// doc 2.3
// A derived struct inherits all members from its base struct it doesn’t override.
// all ok

struct Base {
    a: string;
    b() { }

    static r: string;
    static s() { }

    constructor(x) { }
}

struct Derived extends Base {
}

var d: Derived = new Derived(1);
var r1 = d.a;
var r2 = d.b();
var r3 = Derived.r;
var r4 = Derived.s();
