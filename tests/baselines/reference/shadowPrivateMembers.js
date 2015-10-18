//// [shadowPrivateMembers.ts]
class base { private n() {} }
class derived extends base { private n() {} }


//// [shadowPrivateMembers.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base = (function () {
    function base() {
    }
    base.prototype.n = function () { };
    return base;
})();
var derived = (function (_super) {
    __extends(derived, _super);
    function derived() {
        _super.apply(this, arguments);
    }
    derived.prototype.n = function () { };
    return derived;
})(base);
