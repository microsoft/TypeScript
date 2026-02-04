//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithStringIndexer.ts] ////

//// [assignmentCompatWithStringIndexer.ts]
// index signatures must be compatible in assignments

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

class A {
    [x: string]: Base;
}

declare var a: A;

declare var b: { [x: string]: Derived; };
a = b; // ok
b = a; // error

declare var b2: { [x: string]: Derived2; };
a = b2; // ok
b2 = a; // error

namespace Generics {
    class A<T extends Base> {
        [x: string]: T;
    }

    class B extends A<Base> {
        [x: string]: Derived; // ok
    }

    declare var b1: { [x: string]: Derived; };
    declare var a1: A<Base>;
    a1 = b1; // ok
    b1 = a1; // error

    class B2 extends A<Base> {
        [x: string]: Derived2; // ok
    }

    declare var b2: { [x: string]: Derived2; };
    a1 = b2; // ok
    b2 = a1; // error

    function foo<T extends Base>() {
        var b3: { [x: string]: Derived; };
        var a3: A<T>;
        a3 = b3; // error
        b3 = a3; // error

        var b4: { [x: string]: Derived2; };
        a3 = b4; // error
        b4 = a3; // error
    }
}


//// [assignmentCompatWithStringIndexer.js]
"use strict";
// index signatures must be compatible in assignments
class A {
}
a = b; // ok
b = a; // error
a = b2; // ok
b2 = a; // error
var Generics;
(function (Generics) {
    class A {
    }
    class B extends A {
    }
    a1 = b1; // ok
    b1 = a1; // error
    class B2 extends A {
    }
    a1 = b2; // ok
    b2 = a1; // error
    function foo() {
        var b3;
        var a3;
        a3 = b3; // error
        b3 = a3; // error
        var b4;
        a3 = b4; // error
        b4 = a3; // error
    }
})(Generics || (Generics = {}));
