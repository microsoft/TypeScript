//// [superSymbolIndexedAccess5.ts]
var symbol: any;

class Foo {
    [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    [symbol]() {
        return super[symbol]();
    }
}

//// [superSymbolIndexedAccess5.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var symbol;
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype[symbol] = function () {
        return 0;
    };
    return Foo;
})();
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.apply(this, arguments);
    }
    Bar.prototype[symbol] = function () {
        return _super.prototype[symbol]();
    };
    return Bar;
})(Foo);
