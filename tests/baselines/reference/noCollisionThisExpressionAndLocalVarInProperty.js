//// [tests/cases/compiler/noCollisionThisExpressionAndLocalVarInProperty.ts] ////

//// [noCollisionThisExpressionAndLocalVarInProperty.ts]
class class1 {
    public prop1 = {
        doStuff: (callback) => () => {
            var _this = 2;
            return callback(_this);
        }
    }
}

class class2 {
    constructor() {
        var _this = 2;
    }
    public prop1 = {
        doStuff: (callback) => () => {
            return callback(10);
        }
    }
}

//// [noCollisionThisExpressionAndLocalVarInProperty.js]
var class1 = /** @class */ (function () {
    function class1() {
        this.prop1 = {
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
        this.prop1 = {
            doStuff: function (callback) { return function () {
                return callback(10);
            }; }
        };
        var _this = 2;
    }
    return class2;
}());
