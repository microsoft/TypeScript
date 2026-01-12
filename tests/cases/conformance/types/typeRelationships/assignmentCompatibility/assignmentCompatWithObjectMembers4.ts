// members N and M of types S and T have the same name, same accessibility, same optionality, and N is not assignable M

namespace OnlyDerived {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Base { baz: string; }

    class S { foo: Derived; }
    class T { foo: Derived2; }
    declare var s: S;
    declare var t: T;

    interface S2 { foo: Derived; }
    interface T2 { foo: Derived2; }
    declare var s2: S2;
    declare var t2: T2;

    declare var a: { foo: Derived; }
    declare var b: { foo: Derived2; }

    var a2 = { foo: new Derived() };
    var b2 = { foo: new Derived2() };

    s = t; // error
    t = s; // error
    s = s2; // ok
    s = a2; // ok

    s2 = t2; // error
    t2 = s2; // error
    s2 = t; // error
    s2 = b; // error
    s2 = a2; // ok

    a = b; // error
    b = a; // error
    a = s; // ok
    a = s2; // ok
    a = a2; // ok

    a2 = b2; // error
    b2 = a2; // error
    a2 = b; // error
    a2 = t2; // error
    a2 = t; // error
}

namespace WithBase {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Base { baz: string; }

    class S { foo: Base; }
    class T { foo: Derived2; }
    declare var s: S;
    declare var t: T;

    interface S2 { foo: Base; }
    interface T2 { foo: Derived2; }
    declare var s2: S2;
    declare var t2: T2;

    declare var a: { foo: Base; }
    declare var b: { foo: Derived2; }

    var a2 = { foo: new Base() };
    var b2 = { foo: new Derived2() };

    s = t; // ok
    t = s; // error
    s = s2; // ok
    s = a2; // ok

    s2 = t2; // ok
    t2 = s2; // error
    s2 = t; // ok
    s2 = b; // ok
    s2 = a2; // ok

    a = b; // ok
    b = a; // error
    a = s; // ok
    a = s2; // ok
    a = a2; // ok

    a2 = b2; // ok
    b2 = a2; // error
    a2 = b; // ok
    a2 = t2; // ok
    a2 = t; // ok
}