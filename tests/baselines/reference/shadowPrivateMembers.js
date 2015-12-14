//// [shadowPrivateMembers.ts]
class base { private n() {} }
class derived extends base { private n() {} }


//// [shadowPrivateMembers.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base = (function () {
    function base() {
    }
    base.prototype.n = function () { };
    return base;
}());
var derived = (function (_super) {
    __extends(derived, _super);
    function derived() {
        _super.apply(this, arguments);
    }
    derived.prototype.n = function () { };
    return derived;
}(base));
