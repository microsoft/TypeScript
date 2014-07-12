//// [collisionSuperAndParameter.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.a = function () {
        var _this = this;
        var lamda = function (_super) {
            return function (x) {
                return _this;
            };
        };
    };
    Foo.prototype.b = function (_super) {
        var _this = this;
        var lambda = function () {
            return function (x) {
                return _this;
            };
        };
    };
    Object.defineProperty(Foo.prototype, "c", {
        set: function (_super) {
        },
        enumerable: true,
        configurable: true
    });
    return Foo;
})();
var Foo2 = (function (_super) {
    __extends(Foo2, _super);
    function Foo2(_super) {
        _super.call(this);
        this.prop4 = {
            doStuff: function (_super) {
            }
        };
    }
    Foo2.prototype.x = function () {
        var _this = this;
        var lamda = function (_super) {
            return function (x) {
                return _this;
            };
        };
    };
    Foo2.prototype.y = function (_super) {
        var _this = this;
        var lambda = function () {
            return function (x) {
                return _this;
            };
        };
    };
    Object.defineProperty(Foo2.prototype, "z", {
        set: function (_super) {
        },
        enumerable: true,
        configurable: true
    });
    return Foo2;
})(Foo);

var Foo4 = (function (_super) {
    __extends(Foo4, _super);
    function Foo4(_super) {
        _super.call(this);
    }
    Foo4.prototype.y = function (_super) {
        var _this = this;
        var lambda = function () {
            return function (x) {
                return _this;
            };
        };
    };
    return Foo4;
})(Foo);
