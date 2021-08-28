//// [classStaticBlock9.ts]
class A {
    static bar = A.foo + 1
    static {
        A.foo + 2;
    }
    static foo = 1;
}


//// [classStaticBlock9.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.bar = A.foo + 1;
    (function () {
        A.foo + 2;
    })();
    A.foo = 1;
    return A;
}());
