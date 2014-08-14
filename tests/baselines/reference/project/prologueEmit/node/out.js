var _this = this;
(function () { return _this.window; });
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// class inheritance to ensure __extends is emitted
var m;
(function (m) {
    var base = (function () {
        function base() {
        }
        return base;
    })();
    m.base = base;
    var child = (function (_super) {
        __extends(child, _super);
        function child() {
            _super.apply(this, arguments);
        }
        return child;
    })(base);
    m.child = child;
})(m || (m = {}));
