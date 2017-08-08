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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var _this = 2;
var a = (function () {
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
    __names(a.prototype, ["method1", "method2"]);
    return a;
}());
