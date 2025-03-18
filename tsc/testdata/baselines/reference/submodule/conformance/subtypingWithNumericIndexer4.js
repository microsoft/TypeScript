//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithNumericIndexer4.ts] ////

//// [subtypingWithNumericIndexer4.ts]
// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

class A {
    [x: number]: Derived;
}

class B extends A {
    [x: number]: string; // error
}

module Generics {
    class A<T extends Derived> {
        [x: number]: T;
    }

    class B extends A<Base> {
        [x: number]: string; // error
    }

    class B3<T extends Derived> extends A<T> {
        [x: number]: string; // error
    }
}

//// [subtypingWithNumericIndexer4.js]
class A {
}
class B extends A {
}
var Generics;
(function (Generics) {
    class A {
    }
    class B extends A {
    }
    class B3 extends A {
    }
})(Generics || (Generics = {}));
