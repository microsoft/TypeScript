namespace A {
    export class B<T> {
        foo() { }
        static bar() { }
    }
}

namespace A {
    export module B {
        export var x = 1;
    }
}

var b: A.B;
b.foo();