var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _this = this;
// Add a lambda to ensure global 'this' capture is triggered
(function () { return _this.window; });
// class inheritance to ensure __extends is emitted
var m;
(function (m) {
    var base = /** @class */ (function () {
        function base() {
        }
        return base;
    }());
    m.base = base;
    var child = /** @class */ (function (_super) {
        __extends(child, _super);
        function child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return child;
    }(base));
    m.child = child;
})(m || (m = {}));
