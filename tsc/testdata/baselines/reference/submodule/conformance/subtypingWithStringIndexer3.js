//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithStringIndexer3.ts] ////

//// [subtypingWithStringIndexer3.ts]
// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

class A {
    [x: string]: Derived;
}

class B extends A {
    [x: string]: Base; // error
}

class B2 extends A {
    [x: string]: Derived2; // ok
}

module Generics {
    class A<T extends Derived> {
        [x: string]: T;
    }

    class B extends A<Base> {
        [x: string]: Derived; // error
    }

    class B2 extends A<Derived> {
        [x: string]: Derived2; // ok
    }

    class B3<T extends Derived> extends A<T> {
        [x: string]: Base; // error
    }

    class B4<T extends Derived> extends A<T> {
        [x: string]: Derived; // error
    }

    class B5<T extends Derived2> extends A<T> {
        [x: string]: Derived2; // error
    }
}

//// [subtypingWithStringIndexer3.js]
class A {
}
class B extends A {
}
class B2 extends A {
}
var Generics;
(function (Generics) {
    class A {
    }
    class B extends A {
    }
    class B2 extends A {
    }
    class B3 extends A {
    }
    class B4 extends A {
    }
    class B5 extends A {
    }
})(Generics || (Generics = {}));
