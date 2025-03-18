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
class P {
    x() { }
    static y() { }
}
class Q extends P {
    z;
    xx = super.;
    static yy = super.;
    constructor(z = super., zz = super., zzz = () => super.) {
        this.z = z;
        super();
    }
    foo(zz = super.) {
        super.x();
        super.y();
    }
    static bar(zz = super.) {
        super.x();
        super.y();
    }
}
