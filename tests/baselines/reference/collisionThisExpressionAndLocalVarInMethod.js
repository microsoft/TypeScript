//// [collisionThisExpressionAndLocalVarInMethod.ts]
class a {
    method1() {
        return {
            doStuff: (callback) => () => {
                var _this = 2;
                return callback(this);
            }
        }
    }
    method2() {
        var _this = 2;
        return {
            doStuff: (callback) => () => {
                return callback(this);
            }
        }
    }
}

//// [collisionThisExpressionAndLocalVarInMethod.js]
var a = /** @class */ (function () {
    function a() {
    }
    a.prototype.method1 = function () {
        var _this_1 = this;
        return {
            doStuff: function (callback) { return function () {
                var _this = 2;
                return callback(_this_1);
            }; }
        };
    };
    a.prototype.method2 = function () {
        var _this_1 = this;
        var _this = 2;
        return {
            doStuff: function (callback) { return function () {
                return callback(_this_1);
            }; }
        };
    };
    return a;
}());
