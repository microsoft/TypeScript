//// [classAbstractConstructor.ts]
abstract class A {
    abstract constructor() {}
}

//// [classAbstractConstructor.js]
var A = (function () {
    function A() {
    }
    return A;
}());
