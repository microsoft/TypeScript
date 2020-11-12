//// [staticAsIdentifier.ts]
class C1 {
    static static
    [x: string]: string;
}

class C2 {
    static static
    m() {}
}

class C3 {
    static static p: string;
}

class C4 {
    static static foo() {}
}


//// [staticAsIdentifier.js]
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.m = function () { };
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var C4 = /** @class */ (function () {
    function C4() {
    }
    C4.foo = function () { };
    return C4;
}());
