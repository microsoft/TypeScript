class Base {
    a: string;
    b() { }
    get c() { return ''; }
    set c(v) { }

    static r: string;
    static s() { }
    static get t() { return ''; }
    static set t(v) { }

    constructor(x) { }
}

class Derived extends Base {
}

var d: Derived = new Derived(1);
var r1 = d.a;
var r2 = d.b();
var r3 = d.c;
d.c = '';
var r4 = Derived.r;
var r5 = Derived.s();
var r6 = Derived.t;
Derived.t = '';

class Base2 {
    [x: string]: Object;
    [x: number]: Date;
}

class Derived2 extends Base2 {
}

var d2: Derived2;
var r7 = d2[''];
var r8 = d2[1];

