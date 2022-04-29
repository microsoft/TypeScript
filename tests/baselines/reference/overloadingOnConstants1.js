//// [overloadingOnConstants1.ts]
class Base { foo() { } }
class Derived1 extends Base { bar() { } }
class Derived2 extends Base { baz() { } }
class Derived3 extends Base { biz() { } }

interface Document2 {
    createElement(tagName: 'canvas'): Derived1;
    createElement(tagName: 'div'): Derived2;
    createElement(tagName: 'span'): Derived3;
    createElement(tagName: string): Base;
}

var d2: Document2;

// these are ok
var htmlElement: Base = d2.createElement("yo")
var htmlCanvasElement: Derived1 = d2.createElement("canvas");
var htmlDivElement: Derived2 = d2.createElement("div");
var htmlSpanElement: Derived3 = d2.createElement("span");

// these are errors
var htmlElement2: Derived1 = d2.createElement("yo")
var htmlCanvasElement2: Derived3 = d2.createElement("canvas");
var htmlDivElement2: Derived1 = d2.createElement("div");
var htmlSpanElement2: Derived1 = d2.createElement("span");

//// [overloadingOnConstants1.js]
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
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived2.prototype.baz = function () { };
    return Derived2;
}(Base));
var Derived3 = /** @class */ (function (_super) {
    __extends(Derived3, _super);
    function Derived3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived3.prototype.biz = function () { };
    return Derived3;
}(Base));
var d2;
// these are ok
var htmlElement = d2.createElement("yo");
var htmlCanvasElement = d2.createElement("canvas");
var htmlDivElement = d2.createElement("div");
var htmlSpanElement = d2.createElement("span");
// these are errors
var htmlElement2 = d2.createElement("yo");
var htmlCanvasElement2 = d2.createElement("canvas");
var htmlDivElement2 = d2.createElement("div");
var htmlSpanElement2 = d2.createElement("span");
