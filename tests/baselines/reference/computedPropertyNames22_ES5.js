//// [computedPropertyNames22_ES5.ts]
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}

//// [computedPropertyNames22_ES5.js]
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
    C.prototype.bar = function () {
        var obj = (_a = {},
            _a[_b = this.bar()] = function () { }, __names(_a, [_b]),
            _a);
        return 0;
        var _a, _b;
    };
    __names(C.prototype, ["bar"]);
    return C;
}());
