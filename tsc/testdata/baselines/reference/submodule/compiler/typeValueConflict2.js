//// [tests/cases/compiler/typeValueConflict2.ts] ////

//// [typeValueConflict2.ts]
module M1 {
    export class A<T> {
        constructor(a: T) {
        }
    }
}
module M2 {
    var M1 = 0;
    // Should error.  M1 should bind to the variable, not to the module.
    class B extends M1.A<string> {
    }
}
module M3 {
    // Shouldn't error
    class B extends M1.A<string> {
    }
}


//// [typeValueConflict2.js]
var M1;
(function (M1) {
    class A {
        constructor(a) {
        }
    }
    M1.A = A;
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    var M1 = 0;
    class B extends M1.A {
    }
})(M2 || (M2 = {}));
var M3;
(function (M3) {
    class B extends M1.A {
    }
})(M3 || (M3 = {}));
