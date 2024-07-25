//// [tests/cases/conformance/types/typeRelationships/bestCommonType/bestCommonTypeOfConditionalExpressions2.ts] ////

//// [bestCommonTypeOfConditionalExpressions2.ts]
// conditional expressions return the best common type of the branches plus contextual type (using the first candidate if multiple BCTs exist)
// these are errors

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Base { baz: string; }
var base: Base;
var derived: Derived;
var derived2: Derived2;

var r2 = true ? 1 : '';
var r9 = true ? derived : derived2;

function foo<T, U>(t: T, u: U) {
    return true ? t : u;
}

function foo2<T extends U, U>(t: T, u: U) { // Error for referencing own type parameter
    return true ? t : u; // Ok because BCT(T, U) = U
}

function foo3<T extends U, U extends V, V>(t: T, u: U) {
    return true ? t : u;
}

//// [bestCommonTypeOfConditionalExpressions2.js]
// conditional expressions return the best common type of the branches plus contextual type (using the first candidate if multiple BCTs exist)
// these are errors
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
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Base));
var base;
var derived;
var derived2;
var r2 = true ? 1 : '';
var r9 = true ? derived : derived2;
function foo(t, u) {
    return true ? t : u;
}
function foo2(t, u) {
    return true ? t : u; // Ok because BCT(T, U) = U
}
function foo3(t, u) {
    return true ? t : u;
}
