// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

class A {
    [x: number]: Derived;
}

declare var a: A;
declare var b: { [x: number]: Base; };

a = b; // error
b = a; // ok

class B2 extends A {
    [x: number]: Derived2; // ok
}

declare var b2: { [x: number]: Derived2; };
a = b2; // ok
b2 = a; // error

namespace Generics {
    class A<T extends Derived> {
        [x: number]: T;
    }

    function foo<T extends Derived>() {
        var a!: A<T>;
        var b!: { [x: number]: Derived; };
        a = b; // error
        b = a; // ok

        var b2!: { [x: number]: T; };
        a = b2; // ok
        b2 = a; // ok
    }
}