//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers2.ts] ////

//// [typeOfThisInStaticMembers2.ts]
class C {
    static foo = this; // ok
}

class C2<T> {
    static foo = this; // ok
}

//// [typeOfThisInStaticMembers2.js]
var C = /** @class */ (function () {
    function C() {
    }
    var _a;
    _a = C;
    C.foo = _a; // ok
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    var _b;
    _b = C2;
    C2.foo = _b; // ok
    return C2;
}());
