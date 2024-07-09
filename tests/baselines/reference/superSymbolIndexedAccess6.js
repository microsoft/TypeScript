//// [tests/cases/conformance/expressions/superPropertyAccess/superSymbolIndexedAccess6.ts] ////

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
var symbol;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo[symbol] = function () {
        return 0;
    };
    return Foo;
}());
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bar[symbol] = function () {
        return _super[symbol].call(this);
    };
    return Bar;
}(Foo));
