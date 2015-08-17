//// [baseClassOutOfOrder.ts]
class B extends A {
    constructor(msg: string) {
        super(msg);
    }
}

class A {
    constructor(public msg: string) {

    }
}

//// [baseClassOutOfOrder.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B = (function (_super) {
    __extends(B, _super);
    function B(msg) {
        _super.call(this, msg);
    }
    return B;
})(A);
var A = (function () {
    function A(msg) {
        this.msg = msg;
    }
    return A;
})();
