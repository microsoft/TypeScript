//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames44_ES5.ts] ////

//// [computedPropertyNames44_ES5.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: Foo2;
    get ["get1"]() { return new Foo }
}

class D extends C {
    set ["set1"](p: Foo) { }
}

//// [computedPropertyNames44_ES5.js]
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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Foo2 = /** @class */ (function () {
    function Foo2() {
    }
    return Foo2;
}());
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "get1", {
        get: function () { return new Foo; },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(D.prototype, "set1", {
        set: function (p) { },
        enumerable: false,
        configurable: true
    });
    return D;
}(C));
