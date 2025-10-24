//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithStringIndexer2.ts] ////

//// [assignmentCompatWithStringIndexer2.ts]
// index signatures must be compatible in assignments

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

interface A {
    [x: string]: Base;
}

var a: A;

var b: { [x: string]: Derived; }
a = b; // ok
b = a; // error

var b2: { [x: string]: Derived2; }
a = b2; // ok
b2 = a; // error

module Generics {
    interface A<T extends Base> {
        [x: string]: T;
    }

    interface B extends A<Base> {
        [x: string]: Derived; // ok
    }

    var b1: { [x: string]: Derived; };
    var a1: A<Base>;
    a1 = b1; // ok
    b1 = a1; // error

    interface B2 extends A<Base> {
        [x: string]: Derived2; // ok
    }

    var b2: { [x: string]: Derived2; };
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

//// [assignmentCompatWithStringIndexer2.js]
// index signatures must be compatible in assignments
var a;
var b;
a = b; // ok
b = a; // error
var b2;
a = b2; // ok
b2 = a; // error
var Generics;
(function (Generics) {
    var b1;
    var a1;
    a1 = b1; // ok
    b1 = a1; // error
    var b2;
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
