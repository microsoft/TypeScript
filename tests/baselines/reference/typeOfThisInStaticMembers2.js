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
    C.foo = this; // error
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.foo = this; // error
    return C2;
}());
