// M is optional and S contains no property with the same name as M
// N is optional and T contains no property with the same name as N

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Derived { baz: string; }

module TargetHasOptional {
    // targets
    interface C {
        opt?: Base
    }
    var c: C;

    var a: { opt?: Base; }
    var b: typeof a = { opt: new Base() }

    // sources
    interface D {
        other: Base;
    }
    interface E {
        other: Derived;
    }
    interface F {
        other?: Derived;
    }
    var d: D;
    var e: E;
    var f: F;

    // all ok
    c = d;
    c = e;
    c = f;
    c = a;

    a = d;
    a = e;
    a = f;
    a = c;

    b = d;
    b = e;
    b = f;
    b = a;
    b = c;
}

module SourceHasOptional {
    // targets
    interface C {
        opt: Base
    }
    var c: C;

    var a: { opt: Base; }
    var b = { opt: new Base() }

    // sources
    interface D {
        other?: Base;
    }
    interface E {
        other?: Derived;
    }
    interface F {
        other: Derived;
    }
    var d: D;
    var e: E;
    var f: F;

    c = d; // error
    c = e; // error
    c = f; // error
    c = a; // ok

    a = d; // error
    a = e; // error
    a = f; // error
    a = c; // ok

    b = d; // error
    b = e; // error
    b = f; // error
    b = a; // ok
    b = c; // ok
}