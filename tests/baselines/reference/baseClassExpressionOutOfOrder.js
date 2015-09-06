//// [baseClassExpressionOutOfOrder.ts]
var c = class A extends B { // error
}
var c2 = class extends B { // error
}
var c3 = class B extends class A { // No error
}{
}
var c4 =class extends class { // no error
}{
}
var c5 = class extends class B3 extends class C { // no error
}{
}{ }
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
var c3 = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})((function () {
    function A() {
    }
    return A;
})());
var c4 = (function (_super) {
    __extends(class_2, _super);
    function class_2() {
        _super.apply(this, arguments);
    }
    return class_2;
})((function () {
    function class_3() {
    }
    return class_3;
})());
var c5 = (function (_super) {
    __extends(class_4, _super);
    function class_4() {
        _super.apply(this, arguments);
    }
    return class_4;
})((function (_super) {
    __extends(B3, _super);
    function B3() {
        _super.apply(this, arguments);
    }
    return B3;
})((function () {
    function C() {
    }
    return C;
})()));
var B = (function () {
    function B() {
    }
    return B;
})();
