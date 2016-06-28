//// [constantOverloadFunction.ts]
class Base { foo() { } }
class Derived1 extends Base { bar() { } }
class Derived2 extends Base { baz() { } }
class Derived3 extends Base { biz() { } }

function foo(tagName: 'canvas'): Derived1;
function foo(tagName:  'div'): Derived2;
function foo(tagName: 'span'): Derived3;
function foo(tagName: string): Base;
function foo(tagName: any): Base {
    return null;
}


//// [constantOverloadFunction.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    Base.prototype.foo = function () { };
    return Base;
}());
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        _super.apply(this, arguments);
    }
    Derived1.prototype.bar = function () { };
    return Derived1;
}(Base));
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    Derived2.prototype.baz = function () { };
    return Derived2;
}(Base));
var Derived3 = (function (_super) {
    __extends(Derived3, _super);
    function Derived3() {
        _super.apply(this, arguments);
    }
    Derived3.prototype.biz = function () { };
    return Derived3;
}(Base));
function foo(tagName) {
    return null;
}
