var __extends = (this && this.__extends) || function (d, b) {
    if (typeof Object.setPrototypeOf === "function") {
        Object.setPrototypeOf(d, b);
    } else {
        d.__proto__ = b;
    }
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _this = this;
// Add a lambda to ensure global 'this' capture is triggered
(function () { return _this.window; });
// class inheritance to ensure __extends is emitted
var m;
(function (m) {
    var base = (function () {
        function base() {
        }
        return base;
    }());
    m.base = base;
    var child = (function (_super) {
        __extends(child, _super);
        function child() {
            return _super.apply(this, arguments) || this;
        }
        return child;
    }(base));
    m.child = child;
})(m || (m = {}));
