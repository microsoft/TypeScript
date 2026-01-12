// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

interface A {
    [x: number]: Base;
}

declare var a: A;
declare var b: { [x: number]: Derived; }
a = b;
b = a; // error

declare var b2: { [x: number]: Derived2; }
a = b2;
b2 = a; // error

namespace Generics {
    interface A<T extends Base> {
        [x: number]: T;
    }

    interface B extends A<Base> {
        [x: number]: Derived; // ok
    }

    function foo<T extends Base>() {
        var a!: A<T>;
        var b!: { [x: number]: Derived; }
        a = b; // error
        b = a; // error

        var b2!: { [x: number]: Derived2; }
        a = b2; // error
        b2 = a; // error

        var b3!: { [x: number]: T; }
        a = b3; // ok
        b3 = a; // ok
    }
}