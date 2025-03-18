//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithStringIndexer.ts] ////

//// [subtypingWithStringIndexer.ts]
// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

class A {
    [x: string]: Base;
}

class B extends A {
    [x: string]: Derived; // ok
}

class B2 extends A {
    [x: string]: Derived2; // ok
}

module Generics {
    class A<T extends Base> {
        [x: string]: T;
    }

    class B extends A<Base> {
        [x: string]: Derived; // ok
    }

    class B2 extends A<Base> {
        [x: string]: Derived2; // ok
    }

    class B3<T extends Base> extends A<T> {
        [x: string]: Derived; // error
    }

    class B4<T extends Base> extends A<T> {
        [x: string]: Derived2; // error
    }
}


//// [subtypingWithStringIndexer.js]
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
})(Generics || (Generics = {}));
