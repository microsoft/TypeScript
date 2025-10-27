//// [tests/cases/compiler/superAccess2.ts] ////

//// [superAccess2.ts]
class P {
    x() { }
    static y() { }
}

class Q extends P {
    xx = super;
    static yy = super; // error for static initializer accessing super

    // Super is not allowed in constructor args
    constructor(public z = super, zz = super, zzz = () => super) {
        super();
    }

    foo(zz = super) {
        super.x();
        super.y(); // error
    }

    static bar(zz = super) {
        super.x(); // error
        super.y();
    }
}

//// [superAccess2.js]
var _a, _b;
class P {
    x() { }
    static y() { }
}
class Q extends (_b = P) {
    // Super is not allowed in constructor args
    constructor(z = super., zz = super., zzz = () => super.) {
        super();
        this.z = z;
        this.xx = super.;
    }
    foo(zz = super.) {
        super.x();
        super.y(); // error
    }
    static bar(zz = super.) {
        super.x(); // error
        super.y();
    }
}
_a = Q;
Q.yy = Reflect.get(_b, "", _a); // error for static initializer accessing super
