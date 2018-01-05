//// [unusedTypeParameters5.ts]
class A<Dummy> {
    public x: Dummy;
}

var x: {
    new <T, U, K>(a: T): A<U>;
}

//// [unusedTypeParameters5.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var x;
