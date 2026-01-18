namespace A { }
var a: A; // error

namespace B {
    interface I {}
}
var b: B; // error

namespace C {
    namespace M {
        interface I {}
    }
}

var c: C; // error