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
var symbol;
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype[_a = symbol] = function () {
        return 0;
    };
    __names(Foo.prototype, [_a]);
    return Foo;
    var _a;
}());
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bar.prototype[_a = symbol] = function () {
        return _super.prototype[symbol].call(this);
    };
    __names(Bar.prototype, [_a]);
    return Bar;
    var _a;
}(Foo));
