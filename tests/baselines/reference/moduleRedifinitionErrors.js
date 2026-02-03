//// [tests/cases/compiler/moduleRedifinitionErrors.ts] ////

//// [moduleRedifinitionErrors.ts]
class A {
}
module A {
}


//// [moduleRedifinitionErrors.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
