//// [classExtendingNull.ts]
class C1 extends null { }
class C2 extends (null) { }


//// [classExtendingNull.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C1 = (function (_super) {
    __extends(C1, _super);
    function C1() {
        _super.apply(this, arguments);
    }
    return C1;
})(null);
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})((null));
