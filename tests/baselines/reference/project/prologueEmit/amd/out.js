var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
            _super.apply(this, arguments);
        }
        return child;
    }(base));
    m.child = child;
})(m || (m = {}));
