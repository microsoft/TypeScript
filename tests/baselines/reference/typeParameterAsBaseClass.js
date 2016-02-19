//// [typeParameterAsBaseClass.ts]
class C<T> extends T {}
class C2<T> implements T {}

//// [typeParameterAsBaseClass.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
}(T));
var C2 = (function () {
    function C2() {
    }
    return C2;
}());
