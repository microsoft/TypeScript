//// [super_inside-object-literal-getters-and-setters.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ObjectLiteral;
(function (ObjectLiteral) {
    var ThisInObjectLiteral = {
        _foo: '1',
        get foo() {
            return _super.prototype._foo;
        },
        set foo(value) {
            _super.prototype._foo = value;
        },
        test: function () {
            return _super.prototype._foo;
        }
    };
})(ObjectLiteral || (ObjectLiteral = {}));

var F = (function () {
    function F() {
    }
    F.prototype.test = function () {
        return "";
    };
    return F;
})();
var SuperObjectTest = (function (_super) {
    __extends(SuperObjectTest, _super);
    function SuperObjectTest() {
        _super.apply(this, arguments);
    }
    SuperObjectTest.prototype.testing = function () {
        var test = {
            get F() {
                return _super.prototype.test.call(this);
            }
        };
    };
    return SuperObjectTest;
})(F);
