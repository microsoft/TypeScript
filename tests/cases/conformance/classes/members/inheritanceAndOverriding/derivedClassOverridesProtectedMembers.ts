// @target: ES5

var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    protected a: typeof x;
    protected b(a: typeof x) { }
    protected get c() { return x; }
    protected set c(v: typeof x) { }
    protected d: (a: typeof x) => void;

    protected static r: typeof x;
    protected static s(a: typeof x) { }
    protected static get t() { return x; }
    protected static set t(v: typeof x) { }
    protected static u: (a: typeof x) => void;

    constructor(a: typeof x) { }
}

class Derived extends Base {
    protected a: typeof y;
    protected b(a: typeof y) { }
    protected get c() { return y; }
    protected set c(v: typeof y) { }
    protected d: (a: typeof y) => void;

    protected static r: typeof y;
    protected static s(a: typeof y) { }
    protected static get t() { return y; }
    protected static set t(a: typeof y) { }
    protected static u: (a: typeof y) => void;

    constructor(a: typeof y) { super(x) }
}
