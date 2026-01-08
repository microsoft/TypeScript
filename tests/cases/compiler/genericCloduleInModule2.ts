namespace A {
    export class B<T> {
        foo() { }
        static bar() { }
    }
}

namespace A {
    export namespace B {
        export var x = 1;
    }
}

var b: A.B;
b.foo();