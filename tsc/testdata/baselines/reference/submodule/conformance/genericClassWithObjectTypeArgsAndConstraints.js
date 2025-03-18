//// [tests/cases/conformance/types/typeRelationships/typeInference/genericClassWithObjectTypeArgsAndConstraints.ts] ////

//// [genericClassWithObjectTypeArgsAndConstraints.ts]
// Generic call with constraints infering type parameter from object member properties
// No errors expected

class C {
    x: string;
}

class D {
    x: string;
    y: string;
}

class X<T> {
    x: T;
}

module Class {
    class G<T extends { x: string }> {
        foo<T extends { x: string }>(t: X<T>, t2: X<T>) {
            var x: T;
            return x;
        }
    }

    var c1 = new X<C>();
    var d1 = new X<D>();
    var g: G<{ x: string; y: string }>;
    var r = g.foo(c1, d1);
    var r2 = g.foo(c1, c1);

    class G2<T extends C> {
        foo2<T extends C>(t: X<T>, t2: X<T>) {
            var x: T;
            return x;
        }
    }
    var g2: G2<D>;
    var r = g2.foo2(c1, d1);
    var r2 = g2.foo2(c1, c1);
}

module Interface {
    interface G<T extends { x: string }> {
        foo<T extends { x: string }>(t: X<T>, t2: X<T>): T;
    }

    var c1 = new X<C>();
    var d1 = new X<D>();
    var g: G<{ x: string; y: string }>;
    var r = g.foo(c1, d1);
    var r2 = g.foo(c1, c1);

    interface G2<T extends C> {
        foo2<T extends C>(t: X<T>, t2: X<T>): T;
    }

    var g2: G2<D>;
    var r = g2.foo2(c1, d1);
    var r2 = g2.foo2(c1, c1);
}

//// [genericClassWithObjectTypeArgsAndConstraints.js]
class C {
    x;
}
class D {
    x;
    y;
}
class X {
    x;
}
var Class;
(function (Class) {
    class G {
        foo(t, t2) {
            var x;
            return x;
        }
    }
    var c1 = new X();
    var d1 = new X();
    var g;
    var r = g.foo(c1, d1);
    var r2 = g.foo(c1, c1);
    class G2 {
        foo2(t, t2) {
            var x;
            return x;
        }
    }
    var g2;
    var r = g2.foo2(c1, d1);
    var r2 = g2.foo2(c1, c1);
})(Class || (Class = {}));
var Interface;
(function (Interface) {
    var c1 = new X();
    var d1 = new X();
    var g;
    var r = g.foo(c1, d1);
    var r2 = g.foo(c1, c1);
    var g2;
    var r = g2.foo2(c1, d1);
    var r2 = g2.foo2(c1, c1);
})(Interface || (Interface = {}));
