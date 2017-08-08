//// [parserSuperExpression3.ts]
class C {
  M() {
    this.super<T>(0);
  }
}

//// [parserSuperExpression3.js]
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
var C = (function () {
    function C() {
    }
    C.prototype.M = function () {
        this["super"](0);
    };
    __names(C.prototype, ["M"]);
    return C;
}());
