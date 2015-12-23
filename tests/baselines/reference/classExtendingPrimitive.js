//// [classExtendingPrimitive.ts]
// classes cannot extend primitives

class C extends number { }
class C2 extends string { }
class C3 extends boolean { }
class C4 extends Void  { }
class C4a extends void {}
class C5 extends Null { }
class C5a extends null { }
class C6 extends undefined { }
class C7 extends Undefined { }

enum E { A }
class C8 extends E { }

//// [classExtendingPrimitive.js]
// classes cannot extend primitives
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
}(number));
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
}(string));
var C3 = (function (_super) {
    __extends(C3, _super);
    function C3() {
        _super.apply(this, arguments);
    }
    return C3;
}(boolean));
var C4 = (function (_super) {
    __extends(C4, _super);
    function C4() {
        _super.apply(this, arguments);
    }
    return C4;
}(Void));
var C4a = (function () {
    function C4a() {
    }
    return C4a;
}());
void {};
var C5 = (function (_super) {
    __extends(C5, _super);
    function C5() {
        _super.apply(this, arguments);
    }
    return C5;
}(Null));
var C5a = (function (_super) {
    __extends(C5a, _super);
    function C5a() {
        _super.apply(this, arguments);
    }
    return C5a;
}(null));
var C6 = (function (_super) {
    __extends(C6, _super);
    function C6() {
        _super.apply(this, arguments);
    }
    return C6;
}(undefined));
var C7 = (function (_super) {
    __extends(C7, _super);
    function C7() {
        _super.apply(this, arguments);
    }
    return C7;
}(Undefined));
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var C8 = (function (_super) {
    __extends(C8, _super);
    function C8() {
        _super.apply(this, arguments);
    }
    return C8;
}(E));
