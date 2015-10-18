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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D(x) {
        _super.prototype..call(this, x);
    }
    return D;
})(C);
