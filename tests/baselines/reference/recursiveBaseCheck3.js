//// [recursiveBaseCheck3.ts]
class A<T> extends C<T> { }
class C<T> extends A<T> { }

(new C).blah;

//// [recursiveBaseCheck3.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        var _this = _super.apply(this, arguments) || this;
        return _this;
    }
    return A;
}(C));
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = _super.apply(this, arguments) || this;
        return _this;
    }
    return C;
}(A));
(new C).blah;
