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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.bar = function (x) { };
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = this;
        _super.prototype..call(_this);
        return _this;
    }
    var proto_2 = D.prototype;
    proto_2.bar = function () {
        _super.prototype.bar.call(this, null);
    };
    return D;
}(C));
