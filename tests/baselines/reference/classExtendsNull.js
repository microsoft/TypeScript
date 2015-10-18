//// [classExtendsNull.ts]
class C extends null {
    constructor() {
        super();
        return Object.create(null);
    }
}

class D extends null {
    constructor() {
        return Object.create(null);
    }
}

//// [classExtendsNull.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.call(this);
        return Object.create(null);
    }
    return C;
})(null);
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return Object.create(null);
    }
    return D;
})(null);
