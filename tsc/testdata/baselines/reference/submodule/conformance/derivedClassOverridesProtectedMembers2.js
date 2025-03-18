//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesProtectedMembers2.ts] ////

//// [derivedClassOverridesProtectedMembers2.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    protected a: typeof x;
    protected b(a: typeof x) { }
    protected get c() { return x; }
    protected set c(v: typeof x) { }
    protected d: (a: typeof x) => void ;

    protected static r: typeof x;
    protected static s(a: typeof x) { }
    protected static get t() { return x; }
    protected static set t(v: typeof x) { }
    protected static u: (a: typeof x) => void ;

constructor(a: typeof x) { }
}

// Increase visibility of all protected members to public
class Derived extends Base {
    a: typeof y;
    b(a: typeof y) { }
    get c() { return y; }
    set c(v: typeof y) { }
    d: (a: typeof y) => void;

    static r: typeof y;
    static s(a: typeof y) { }
    static get t() { return y; }
    static set t(a: typeof y) { }
    static u: (a: typeof y) => void;

    constructor(a: typeof y) { super(a); }
}

var d: Derived = new Derived(y);
var r1 = d.a;
var r2 = d.b(y);
var r3 = d.c;
var r3a = d.d;
d.c = y;
var r4 = Derived.r;
var r5 = Derived.s(y);
var r6 = Derived.t;
var r6a = Derived.u;
Derived.t = y;

class Base2 {
    [i: string]: Object;
    [i: number]: typeof x;
}

class Derived2 extends Base2 {
    [i: string]: typeof x;
    [i: number]: typeof y;
}

var d2: Derived2;
var r7 = d2[''];
var r8 = d2[1];



//// [derivedClassOverridesProtectedMembers2.js]
var x;
var y;
class Base {
    a;
    b(a) { }
    get c() { return x; }
    set c(v) { }
    d;
    static r;
    static s(a) { }
    static get t() { return x; }
    static set t(v) { }
    static u;
    constructor(a) { }
}
class Derived extends Base {
    a;
    b(a) { }
    get c() { return y; }
    set c(v) { }
    d;
    static r;
    static s(a) { }
    static get t() { return y; }
    static set t(a) { }
    static u;
    constructor(a) { super(a); }
}
var d = new Derived(y);
var r1 = d.a;
var r2 = d.b(y);
var r3 = d.c;
var r3a = d.d;
d.c = y;
var r4 = Derived.r;
var r5 = Derived.s(y);
var r6 = Derived.t;
var r6a = Derived.u;
Derived.t = y;
class Base2 {
}
class Derived2 extends Base2 {
}
var d2;
var r7 = d2[''];
var r8 = d2[1];
