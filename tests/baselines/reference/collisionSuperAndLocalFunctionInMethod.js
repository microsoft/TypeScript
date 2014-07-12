//// [collisionSuperAndLocalFunctionInMethod.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function _super() {
}
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.x = function () {
        function _super() {
        }
    };
    Foo.prototype._super = function () {
    };
    return Foo;
})();
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    b.prototype.foo = function () {
        function _super() {
        }
    };
    b.prototype._super = function () {
    };
    return b;
})(Foo);
var c = (function (_super) {
    __extends(c, _super);
    function c() {
        _super.apply(this, arguments);
    }
    c.prototype.foo = function () {
        var x = function () {
            function _super() {
            }
        };
    };
    c.prototype._super = function () {
    };
    return c;
})(Foo);
