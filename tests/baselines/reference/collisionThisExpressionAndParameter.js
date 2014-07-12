//// [collisionThisExpressionAndParameter.js]
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.x = function () {
        var _this = 10;
        function inner(_this) {
            var _this = this;
            return function (x) {
                return _this;
            };
        }
    };
    Foo.prototype.y = function () {
        var _this = this;
        var lamda = function (_this) {
            return function (x) {
                return _this;
            };
        };
    };
    Foo.prototype.z = function (_this) {
        var _this = this;
        var lambda = function () {
            return function (x) {
                return _this;
            };
        };
    };

    Foo.prototype.x1 = function () {
        var _this = 10;
        function inner(_this) {
        }
    };
    Foo.prototype.y1 = function () {
        var lamda = function (_this) {
        };
    };
    Foo.prototype.z1 = function (_this) {
        var lambda = function () {
        };
    };
    return Foo;
})();
var Foo1 = (function () {
    function Foo1(_this) {
        var _this = this;
        var x2 = {
            doStuff: function (callback) {
                return function () {
                    return callback(_this);
                };
            }
        };
    }
    return Foo1;
})();

function f1(_this) {
    var _this = this;
    (function (x) {
        console.log(_this.x);
    });
}

var Foo3 = (function () {
    function Foo3(_this) {
        var _this = this;
        var x2 = {
            doStuff: function (callback) {
                return function () {
                    return callback(_this);
                };
            }
        };
    }
    Foo3.prototype.z = function (_this) {
        var _this = this;
        var lambda = function () {
            return function (x) {
                return _this;
            };
        };
    };
    return Foo3;
})();

function f3(_this) {
    var _this = this;
    (function (x) {
        console.log(_this.x);
    });
}
