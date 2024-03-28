//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithNumericIndexer2.ts] ////

//// [subtypingWithNumericIndexer2.ts]
// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

interface A {
    [x: number]: Derived;
}

interface B extends A {
    [x: number]: Base; // error
}

interface B2 extends A {
    [x: number]: Derived2; // ok
}

module Generics {
    interface A<T extends Derived> {
        [x: number]: T;
    }

    interface B extends A<Base> {
        [x: number]: Derived; // error
    }

    interface B2 extends A<Derived> {
        [x: number]: Derived2; // ok
    }

    interface B3<T extends Derived> extends A<T> {
        [x: number]: Base; // error
    }

    interface B4<T extends Derived> extends A<T> {
        [x: number]: Derived; // error
    }

    interface B5<T extends Derived2> extends A<T> {
        [x: number]: Derived2; // error
    }
}

//// [subtypingWithNumericIndexer2.js]
// Derived type indexer must be subtype of base type indexer
