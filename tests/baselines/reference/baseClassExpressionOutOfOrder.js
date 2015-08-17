//// [baseClassExpressionOutOfOrder.ts]
var c = class A extends B {
}
var c2 = class extends B {
}

class B {
}

//// [baseClassExpressionOutOfOrder.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var c = (function (_super) {
    __extends(A, _super);
    function A() {
        _super.apply(this, arguments);
    }
    return A;
})(B);
var c2 = (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        _super.apply(this, arguments);
    }
    return class_1;
})(B);
var B = (function () {
    function B() {
    }
    return B;
})();
