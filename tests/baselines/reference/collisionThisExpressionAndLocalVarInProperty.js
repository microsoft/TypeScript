//// [collisionThisExpressionAndLocalVarInProperty.ts]
class class1 {
    public prop1 = {
        doStuff: (callback) => () => {
            var _this = 2;
            return callback(this);
        }
    }
}

class class2 {
    constructor() {
        var _this = 2;
    }
    public prop1 = {
        doStuff: (callback) => () => {
            return callback(this);
        }
    }
}

//// [collisionThisExpressionAndLocalVarInProperty.js]
var class1 = (function () {
    function class1() {
        var _this = this;
        this.prop1 = {
            doStuff: function (callback) { return function () {
                var _this = 2;
                return callback(_this);
            }; }
        };
    }
    return class1;
}());
var class2 = (function () {
    function class2() {
        var _this = this;
        this.prop1 = {
            doStuff: function (callback) { return function () {
                return callback(_this);
            }; }
        };
        var _this = 2;
    }
    return class2;
}());
