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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    C.prototype.bar = function (x) { };
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.prototype..call(this);
    }
    D.prototype.bar = function () {
        _super.prototype.bar.call(this, null);
    };
    return D;
})(C);
