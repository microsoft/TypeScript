//// [superWithTypeArgument2.ts]
class C<T> {
    foo: T;
}

class D<T> extends C<T> {
    constructor(x) {
        super<T>(x);
    }
}

//// [superWithTypeArgument2.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D(x) {
        var _this = this;
        _super.prototype..call(_this, x);
        return _this;
    }
    return D;
}(C));
