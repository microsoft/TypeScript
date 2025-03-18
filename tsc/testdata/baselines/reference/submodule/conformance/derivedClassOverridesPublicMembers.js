//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesPublicMembers.ts] ////

//// [derivedClassOverridesPublicMembers.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    a: typeof x;
    b(a: typeof x) { }
    get c() { return x; }
    set c(v: typeof x) { }
    d: (a: typeof x) => void;

    static r: typeof x;
    static s(a: typeof x) { }
    static get t() { return x; }
    static set t(v: typeof x) { }
    static u: (a: typeof x) => void;

    constructor(a: typeof x) { }
}

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

    constructor(a: typeof y) { super(x) }
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



//// [derivedClassOverridesPublicMembers.js]
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
    constructor(a) { super(x); }
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
