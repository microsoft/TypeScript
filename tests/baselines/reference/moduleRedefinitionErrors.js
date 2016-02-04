//// [moduleRedefinitionErrors.ts]
class A {
}
module A {
}


//// [moduleRedefinitionErrors.js]
var A = (function () {
    function A() {
    }
    return A;
}());
