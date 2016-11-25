//// [typeOfSuperCall.ts]
class C {
}

class D extends C {
    constructor() {
        var x: void = super();
    }
}

//// [typeOfSuperCall.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var _this;
        var x = _this = _super.call(this) || this;
        return _this;
    }
    return D;
}(C));
