//// [staticMembersUsingClassTypeParameter.ts]
// BUG 745747
class C<T> {
    static x: T;
    static f(x: T) {}
}

class C2<T, U> {
    static x: U;
    static f(x: U) { }
}

class C3<T extends Date> {
    static x: T;
    static f(x: T) { }
}

//// [staticMembersUsingClassTypeParameter.js]
// BUG 745747
var C = /** @class */ (function () {
    function C() {
    }
    C.f = function (x) { };
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.f = function (x) { };
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    C3.f = function (x) { };
    return C3;
}());
