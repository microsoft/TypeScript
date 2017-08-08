//// [computedPropertyNames23_ES5.ts]
class C {
    bar() {
        return 0;
    }
    [
        { [this.bar()]: 1 }[0]
    ]() { }
}

//// [computedPropertyNames23_ES5.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
    C.prototype.bar = function () {
        return 0;
    };
    C.prototype[_a = (_b = {}, _b[this.bar()] = 1, _b)[0]] = function () { };
    __names(C.prototype, ["bar", _a]);
    return C;
    var _b, _a;
}());
