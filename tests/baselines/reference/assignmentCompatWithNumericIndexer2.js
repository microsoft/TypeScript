//// [assignmentCompatWithNumericIndexer2.ts]
// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

interface A {
    [x: number]: Base;
}

var a: A;
var b: { [x: number]: Derived; }
a = b;
b = a; // error

var b2: { [x: number]: Derived2; }
a = b2;
b2 = a; // error

module Generics {
    interface A<T extends Base> {
        [x: number]: T;
    }

    interface B extends A<Base> {
        [x: number]: Derived; // ok
    }

    function foo<T extends Base>() {
        var a: A<T>;
        var b: { [x: number]: Derived; }
        a = b; // error
        b = a; // error

        var b2: { [x: number]: Derived2; }
        a = b2; // error
        b2 = a; // error

        var b3: { [x: number]: T; }
        a = b3; // ok
        b3 = a; // ok
    }
}

//// [assignmentCompatWithNumericIndexer2.js]
// Derived type indexer must be subtype of base type indexer
var a;
var b;
a = b;
b = a; // error
var b2;
a = b2;
b2 = a; // error
var Generics;
(function (Generics) {
    function foo() {
        var a;
        var b;
        a = b; // error
        b = a; // error
        var b2;
        a = b2; // error
        b2 = a; // error
        var b3;
        a = b3; // ok
        b3 = a; // ok
    }
})(Generics || (Generics = {}));
