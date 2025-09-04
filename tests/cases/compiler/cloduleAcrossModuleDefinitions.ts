namespace A {
    export class B {
        foo() { }
        static bar() { }
    }
}

namespace A {
    export module B {
        export var x = 1;
    }
}

var b: A.B; // ok
