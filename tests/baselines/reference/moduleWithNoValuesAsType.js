//// [moduleWithNoValuesAsType.ts]
module A { }
var a: A; // error

module B {
    interface I {}
}
var b: B; // error

module C {
    module M {
        interface I {}
    }
}

var c: C; // error

//// [moduleWithNoValuesAsType.js]
var a; // error
var b; // error
var c; // error
