//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendingPrimitive.ts] ////

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

const C9 = class extends number { }
const C10 = class extends string { }
const C11 = class extends boolean { }

const C12 = class A extends number { }
const C13 = class B extends string { }
const C14 = class C extends boolean { }


//// [classExtendingPrimitive.js]
// classes cannot extend primitives
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(number));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(string));
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C3;
}(boolean));
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C4;
}(Void));
var C4a = /** @class */ (function () {
    function C4a() {
    }
    return C4a;
}());
void {};
var C5 = /** @class */ (function (_super) {
    __extends(C5, _super);
    function C5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C5;
}(Null));
var C5a = /** @class */ (function (_super) {
    __extends(C5a, _super);
    function C5a() {
    }
    return C5a;
}(null));
var C6 = /** @class */ (function (_super) {
    __extends(C6, _super);
    function C6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C6;
}(undefined));
var C7 = /** @class */ (function (_super) {
    __extends(C7, _super);
    function C7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C7;
}(Undefined));
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var C8 = /** @class */ (function (_super) {
    __extends(C8, _super);
    function C8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C8;
}(E));
var C9 = /** @class */ (function (_super) {
    __extends(C9, _super);
    function C9() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C9;
}(number));
var C10 = /** @class */ (function (_super) {
    __extends(C10, _super);
    function C10() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C10;
}(string));
var C11 = /** @class */ (function (_super) {
    __extends(C11, _super);
    function C11() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C11;
}(boolean));
var C12 = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(number));
var C13 = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(string));
var C14 = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(boolean));
