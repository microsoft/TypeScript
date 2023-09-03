//// [tests/cases/compiler/classImplementsPrimitive.ts] ////

//// [classImplementsPrimitive.ts]
// classes cannot implement primitives

class C implements number { }
class C2 implements string { }
class C3 implements boolean { }
class C4 implements Void  { }
class C4a implements void {}
class C5 implements Null { }
class C5a implements null { }
class C6 implements undefined { }
class C7 implements Undefined { }

enum E { A }
class C8 implements E { }

class C4a implements void {}
class C5a implements null { }

//// [classImplementsPrimitive.js]
// classes cannot implement primitives
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
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
    return C4;
}());
var C4a = /** @class */ (function () {
    function C4a() {
    }
    return C4a;
}());
void {};
var C5 = /** @class */ (function () {
    function C5() {
    }
    return C5;
}());
var C5a = /** @class */ (function () {
    function C5a() {
    }
    return C5a;
}());
var C6 = /** @class */ (function () {
    function C6() {
    }
    return C6;
}());
var C7 = /** @class */ (function () {
    function C7() {
    }
    return C7;
}());
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var C8 = /** @class */ (function () {
    function C8() {
    }
    return C8;
}());
var C4a = /** @class */ (function () {
    function C4a() {
    }
    return C4a;
}());
void {};
var C5a = /** @class */ (function () {
    function C5a() {
    }
    return C5a;
}());
