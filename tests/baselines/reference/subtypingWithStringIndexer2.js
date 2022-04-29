//// [subtypingWithStringIndexer2.ts]
// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

interface A {
    [x: string]: Derived;
}

interface B extends A {
    [x: string]: Base; // error
}

interface B2 extends A {
    [x: string]: Derived2; // ok
}

module Generics {
    interface A<T extends Derived> {
        [x: string]: T;
    }

    interface B extends A<Base> {
        [x: string]: Derived; // error
    }

    interface B2 extends A<Derived> {
        [x: string]: Derived2; // ok
    }

    interface B3<T extends Derived> extends A<T> {
        [x: string]: Base; // error
    }

    interface B4<T extends Derived> extends A<T> {
        [x: string]: Derived; // error
    }

    interface B5<T extends Derived2> extends A<T> {
        [x: string]: Derived2; // error
    }
}

//// [subtypingWithStringIndexer2.js]
// Derived type indexer must be subtype of base type indexer
