//// [tests/cases/conformance/types/union/unionTypeFromArrayLiteral.ts] ////

//// [unionTypeFromArrayLiteral.ts]
// The resulting type an array literal expression is determined as follows:
// If the array literal is empty, the resulting type is an array type with the element type Undefined.
// Otherwise, if the array literal is contextually typed by a type that has a property with the numeric name ‘0’, the resulting type is a tuple type constructed from the types of the element expressions.
// Otherwise, the resulting type is an array type with an element type that is the union of the types of the element expressions.

var arr1 = [1, 2]; // number[]
var arr2 = ["hello", true]; // (string | number)[]
var arr3Tuple: [number, string] = [3, "three"]; // [number, string]
var arr4Tuple: [number, string] = [3, "three", "hello"]; // [number, string, string]
var arrEmpty = [];
var arr5Tuple: {
    0: string;
    5: number;
} = ["hello", true, false, " hello", true, 10, "any"]; // Tuple
class C { foo() { } }
class D { foo2() { } }
class E extends C { foo3() { } }
class F extends C { foo4() { } }
var c: C, d: D, e: E, f: F;
var arr6 = [c, d];  // (C | D)[]
var arr7 = [c, d, e]; // (C | D)[]
var arr8 = [c, e]; // C[]
var arr9 = [e, f]; // (E|F)[]

//// [unionTypeFromArrayLiteral.js]
// The resulting type an array literal expression is determined as follows:
// If the array literal is empty, the resulting type is an array type with the element type Undefined.
// Otherwise, if the array literal is contextually typed by a type that has a property with the numeric name ‘0’, the resulting type is a tuple type constructed from the types of the element expressions.
// Otherwise, the resulting type is an array type with an element type that is the union of the types of the element expressions.
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
var arr1 = [1, 2]; // number[]
var arr2 = ["hello", true]; // (string | number)[]
var arr3Tuple = [3, "three"]; // [number, string]
var arr4Tuple = [3, "three", "hello"]; // [number, string, string]
var arrEmpty = [];
var arr5Tuple = ["hello", true, false, " hello", true, 10, "any"]; // Tuple
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.foo2 = function () { };
    return D;
}());
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    E.prototype.foo3 = function () { };
    return E;
}(C));
var F = /** @class */ (function (_super) {
    __extends(F, _super);
    function F() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    F.prototype.foo4 = function () { };
    return F;
}(C));
var c, d, e, f;
var arr6 = [c, d]; // (C | D)[]
var arr7 = [c, d, e]; // (C | D)[]
var arr8 = [c, e]; // C[]
var arr9 = [e, f]; // (E|F)[]
