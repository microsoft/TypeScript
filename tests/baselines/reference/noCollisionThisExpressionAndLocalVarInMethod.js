//// [tests/cases/compiler/noCollisionThisExpressionAndLocalVarInMethod.ts] ////

//// [noCollisionThisExpressionAndLocalVarInMethod.ts]
var _this = 2;
class a {
    method1() {
        return {
            doStuff: (callback) => () => {
                var _this = 2;
                return callback(_this);
            }
        }
    }
    method2() {
        var _this = 2;
        return {
            doStuff: (callback) => () => {
                return callback(_this);
            }
        }
    }
}

//// [noCollisionThisExpressionAndLocalVarInMethod.js]
var _this = 2;
var a = /** @class */ (function () {
    function a() {
    }
    a.prototype.method1 = function () {
        return {
            doStuff: function (callback) { return function () {
                var _this = 2;
                return callback(_this);
            }; }
        };
    };
    a.prototype.method2 = function () {
        var _this = 2;
        return {
            doStuff: function (callback) { return function () {
                return callback(_this);
            }; }
        };
    };
    return a;
}());
