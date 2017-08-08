//// [constantOverloadFunctionNoSubtypeError.ts]
class Base { foo() { } }
class Derived1 extends Base { bar() { } }
class Derived2 extends Base { baz() { } }
class Derived3 extends Base { biz() { } }

function foo(tagName: 'canvas'): Derived3;
function foo(tagName:  'div'): Derived2;
function foo(tagName: 'span'): Derived1;
function foo(tagName: number): Base;
function foo(tagName: any): Base {

    return null;
}


//// [constantOverloadFunctionNoSubtypeError.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = (function () {
    function Base() {
    }
    Base.prototype.foo = function () { };
    __names(Base.prototype, ["foo"]);
    return Base;
}());
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived1.prototype.bar = function () { };
    __names(Derived1.prototype, ["bar"]);
    return Derived1;
}(Base));
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived2.prototype.baz = function () { };
    __names(Derived2.prototype, ["baz"]);
    return Derived2;
}(Base));
var Derived3 = (function (_super) {
    __extends(Derived3, _super);
    function Derived3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived3.prototype.biz = function () { };
    __names(Derived3.prototype, ["biz"]);
    return Derived3;
}(Base));
function foo(tagName) {
    return null;
}
