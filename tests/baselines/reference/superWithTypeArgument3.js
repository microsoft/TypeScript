//// [superWithTypeArgument3.ts]
class C<T> {
    foo: T;
    bar<U>(x: U) { }
}

class D<T> extends C<T> {
    constructor() {
        super<T>();
    }
    bar() {
        super.bar<T>(null);
    }
}

//// [superWithTypeArgument3.js]
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
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function (x) { };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super.call(this) || this;
    }
    D.prototype.bar = function () {
        _super.prototype.bar.call(this, null);
    };
    return D;
}(C));
