//// [superSymbolIndexedAccess6.ts]
var symbol: any;

class Foo {
    static [symbol]() {
        return 0;
    }
}

class Bar extends Foo {
    static [symbol]() {
        return super[symbol]();
    }
}

//// [superSymbolIndexedAccess6.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var symbol;
var Foo = (function () {
    function Foo() {
    }
    Foo[symbol] = function () {
        return 0;
    };
    return Foo;
}());
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.apply(this, arguments);
    }
    Bar[symbol] = function () {
        return _super[symbol]();
    };
    return Bar;
}(Foo));
