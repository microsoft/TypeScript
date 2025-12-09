//// [tests/cases/compiler/moduleWithNoValuesAsType.ts] ////

//// [moduleWithNoValuesAsType.ts]
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

//// [moduleWithNoValuesAsType.js]
var a; // error
var b; // error
var c; // error
