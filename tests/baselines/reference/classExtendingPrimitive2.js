//// [classExtendingPrimitive2.ts]
// classes cannot extend primitives

class C4a extends void {}
class C5a extends null { }

//// [classExtendingPrimitive2.js]
// classes cannot extend primitives
var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C4a = (function () {
    function C4a() {
    }
    return C4a;
}());
void {};
var C5a = (function (_super) {
    __extends(C5a, _super);
    function C5a() {
        return _super.apply(this, arguments) || this;
    }
    return C5a;
}(null));
