//// [tests/cases/compiler/noCollisionThisExpressionAndLocalVarInConstructor.ts] ////

//// [noCollisionThisExpressionAndLocalVarInConstructor.ts]
class class1 {
    constructor() {
        var x2 = {
            doStuff: (callback) => () => {
                var _this = 2;
                return callback(_this);
            }
        }
    }
}

class class2 {
    constructor() {
        var _this = 2;
        var x2 = {
            doStuff: (callback) => () => {
                return callback(_this);
            }
        }
    }
}

//// [noCollisionThisExpressionAndLocalVarInConstructor.js]
var class1 = /** @class */ (function () {
    function class1() {
        var x2 = {
            doStuff: function (callback) { return function () {
                var _this = 2;
                return callback(_this);
            }; }
        };
    }
    return class1;
}());
var class2 = /** @class */ (function () {
    function class2() {
        var _this = 2;
        var x2 = {
            doStuff: function (callback) { return function () {
                return callback(_this);
            }; }
        };
    }
    return class2;
}());
