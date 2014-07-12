//// [collisionSuperAndLocalFunctionInAccessors.js]
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
    Object.defineProperty(Foo.prototype, "prop1", {
        get: function () {
            function _super() {
            }
            return 10;
        },
        set: function (val) {
            function _super() {
            }
        },
        enumerable: true,
        configurable: true
    });
    return Foo;
})();
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(b.prototype, "prop2", {
        get: function () {
            function _super() {
            }
            return 10;
        },
        set: function (val) {
            function _super() {
            }
        },
        enumerable: true,
        configurable: true
    });
    return b;
})(Foo);
var c = (function (_super) {
    __extends(c, _super);
    function c() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(c.prototype, "prop2", {
        get: function () {
            var x = function () {
                function _super() {
                }
            };
            return 10;
        },
        set: function (val) {
            var x = function () {
                function _super() {
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return c;
})(Foo);
