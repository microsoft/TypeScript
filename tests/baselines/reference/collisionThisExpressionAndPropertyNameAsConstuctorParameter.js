//// [collisionThisExpressionAndPropertyNameAsConstuctorParameter.js]
var Foo2 = (function () {
    function Foo2(_this) {
        var _this = this;
        var lambda = function () {
            return function (x) {
                return _this;
            };
        };
    }
    return Foo2;
})();

var Foo3 = (function () {
    function Foo3(_this) {
        var _this = this;
        this._this = _this;
        var lambda = function () {
            return function (x) {
                return _this;
            };
        };
    }
    return Foo3;
})();

var Foo4 = (function () {
    function Foo4(_this) {
        var _this = this;
        var lambda = function () {
            return function (x) {
                return _this;
            };
        };
    }
    return Foo4;
})();

var Foo5 = (function () {
    function Foo5(_this) {
        var _this = this;
        this._this = _this;
        var lambda = function () {
            return function (x) {
                return _this;
            };
        };
    }
    return Foo5;
})();
