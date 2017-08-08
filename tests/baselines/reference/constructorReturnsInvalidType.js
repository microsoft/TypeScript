//// [constructorReturnsInvalidType.ts]
class X {
    constructor() {
        return 1;
    }
    foo() { }
}
 
var x = new X();


//// [constructorReturnsInvalidType.js]
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
var X = (function () {
    function X() {
        return 1;
    }
    X.prototype.foo = function () { };
    __names(X.prototype, ["foo"]);
    return X;
}());
var x = new X();
