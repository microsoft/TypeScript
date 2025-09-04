namespace A {
    export function B<T>(x: T) { return x; }
}

namespace A {
    export namespace B {
        export var x = 1;
    }
}

var b: A.B;
A.B(1);