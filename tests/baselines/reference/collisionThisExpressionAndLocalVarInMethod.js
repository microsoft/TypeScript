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
var a = (function () {
    function a() {
    }
    var proto_1 = a.prototype;
    proto_1.method1 = function () {
        var _this = this;
        return {
            doStuff: function (callback) { return function () {
                var _this = 2;
                return callback(_this);
            }; }
        };
    };
    proto_1.method2 = function () {
        var _this = this;
        var _this = 2;
        return {
            doStuff: function (callback) { return function () {
                return callback(_this);
            }; }
        };
    };
    return a;
}());
