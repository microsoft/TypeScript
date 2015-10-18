/// <reference path="li'b/class'A.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ClassC = (function (_super) {
    __extends(ClassC, _super);
    function ClassC() {
        _super.apply(this, arguments);
    }
    return ClassC;
})(test.ClassA);
