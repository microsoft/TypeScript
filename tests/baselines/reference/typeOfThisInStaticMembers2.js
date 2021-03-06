//// [typeOfThisInStaticMembers2.ts]
class C {
    static foo = this; // error
}

class C2<T> {
    static foo = this; // error
}

//// [typeOfThisInStaticMembers2.js]
var C = /** @class */ (function () {
    function C() {
    }
    (function () {
        C.foo = this; // error
    }).call(C);
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    (function () {
        C2.foo = this; // error
    }).call(C2);
    return C2;
}());
