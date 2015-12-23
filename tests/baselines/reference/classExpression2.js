//// [classExpression2.ts]
class D { }
var v = class C extends D {};

//// [classExpression2.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var D = (function () {
    function D() {
    }
    return D;
}());
var v = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
}(D));
