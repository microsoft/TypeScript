//// [computedPropertyNames2_ES5.ts]
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName]() { }
    static [methodName]() { }
    get [accessorName]() { }
    set [accessorName](v) { }
    static get [accessorName]() { }
    static set [accessorName](v) { }
}

//// [computedPropertyNames2_ES5.js]
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
var methodName = "method";
var accessorName = "accessor";
var C = (function () {
    function C() {
    }
    C.prototype[_a = methodName] = function () { };
    C[methodName] = function () { };
    Object.defineProperty(C.prototype, accessorName, {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, accessorName, {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, accessorName, {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, accessorName, {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    __names(C.prototype, [_a]);
    return C;
    var _a;
}());
