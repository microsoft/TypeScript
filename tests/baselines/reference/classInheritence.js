//// [classInheritence.ts]
class B extends A { }
class A extends A { }

//// [classInheritence.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        return _super.apply(this, arguments) || this;
    }
    return A;
}(A));
