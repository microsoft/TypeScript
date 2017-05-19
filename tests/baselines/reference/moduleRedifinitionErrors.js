//// [moduleRedifinitionErrors.ts]
class A {
}
module A {
}


//// [moduleRedifinitionErrors.js]
var A = (function () {
    function A() {
    }
    return A;
}());
