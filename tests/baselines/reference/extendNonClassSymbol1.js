//// [extendNonClassSymbol1.ts]
class A { foo() { } }
var x = A;
class C extends x { } // error, could not find symbol xs

//// [extendNonClassSymbol1.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
})();
var x = A;
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(x); // error, could not find symbol xs
