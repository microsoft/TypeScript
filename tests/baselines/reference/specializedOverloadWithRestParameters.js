//// [specializedOverloadWithRestParameters.ts]
class Base { foo() { } }
class Derived1 extends Base { bar() { } }
function f(tagName: 'span', ...args): Derived1;   // error
function f(tagName: number, ...args): Base;
function f(tagName: any): Base {
    return null;
}
function g(tagName: 'span', arg): Derived1;    // error
function g(tagName: number, arg): Base;
function g(tagName: any): Base {
    return null;
}

//// [specializedOverloadWithRestParameters.js]
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
    Base.prototype.foo = function () { };
    return Base;
}());
var Derived1 = /** @class */ (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived1.prototype.bar = function () { };
    return Derived1;
}(Base));
function f(tagName) {
    return null;
}
function g(tagName) {
    return null;
}
