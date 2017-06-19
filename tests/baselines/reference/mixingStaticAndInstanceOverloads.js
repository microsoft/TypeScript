//// [mixingStaticAndInstanceOverloads.ts]
class C1 {
    // ERROR
    foo1(n: number);
    foo1(s: string);
    static foo1(a) { }
}
class C2 {
    // ERROR
    static foo2(n: number);
    static foo2(s: string);
    foo2(a) { }
}
class C3 {
    // ERROR
    foo3(n: number);
    static foo3(s: string);
    foo3(a) { }
}
class C4 {
    // ERROR
    static foo4(n: number);
    foo4(s: string);
    static foo4(a) { }
}
class C5 {
    // OK
    foo5(n: number);
    foo5(s: string);
    foo5(a) { }

    // OK
    static foo5(n: number);
    static foo5(s: string);
    static foo5(a) { }
}

//// [mixingStaticAndInstanceOverloads.js]
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.foo1 = function (a) { };
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.foo2 = function (a) { };
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    C3.prototype.foo3 = function (a) { };
    return C3;
}());
var C4 = /** @class */ (function () {
    function C4() {
    }
    C4.foo4 = function (a) { };
    return C4;
}());
var C5 = /** @class */ (function () {
    function C5() {
    }
    C5.prototype.foo5 = function (a) { };
    C5.foo5 = function (a) { };
    return C5;
}());
