//// [bestCommonTypeOfConditionalExpressions.ts]
// conditional expressions return the best common type of the branches plus contextual type (using the first candidate if multiple BCTs exist)
// no errors expected here

var a: { x: number; y?: number };
var b: { x: number; z?: number };

class Base { foo: string; }
class Derived extends Base { bar: string; }
class Derived2 extends Base { baz: string; }
var base: Base;
var derived: Derived;
var derived2: Derived2;

var r = true ? 1 : 2;
var r3 = true ? 1 : {};
var r4 = true ? a : b; // typeof a
var r5 = true ? b : a; // typeof b
var r6 = true ? (x: number) => { } : (x: Object) => { }; // returns number => void
var r7: (x: Object) => void = true ? (x: number) => { } : (x: Object) => { }; 
var r8 = true ? (x: Object) => { } : (x: number) => { }; // returns Object => void
var r10: Base = true ? derived : derived2; // no error since we use the contextual type in BCT
var r11 = true ? base : derived2;

function foo5<T, U>(t: T, u: U): Object {
    return true ? t : u; // BCT is Object
}

//// [bestCommonTypeOfConditionalExpressions.js]
// conditional expressions return the best common type of the branches plus contextual type (using the first candidate if multiple BCTs exist)
// no errors expected here
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var a;
var b;

var Base = (function () {
    function Base() {
    }
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
})(Base);
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    return Derived2;
})(Base);
var base;
var derived;
var derived2;

var r = true ? 1 : 2;
var r3 = true ? 1 : {};
var r4 = true ? a : b;
var r5 = true ? b : a;
var r6 = true ? function (x) {
} : function (x) {
};
var r7 = true ? function (x) {
} : function (x) {
};
var r8 = true ? function (x) {
} : function (x) {
};
var r10 = true ? derived : derived2;
var r11 = true ? base : derived2;

function foo5(t, u) {
    return true ? t : u;
}
