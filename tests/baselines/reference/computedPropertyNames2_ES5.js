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
var methodName = "method";
var accessorName = "accessor";
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    C_prototype[methodName] = function () { };
    C[methodName] = function () { };
    Object.defineProperty(C_prototype, accessorName, {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C_prototype, accessorName, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, accessorName, {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, accessorName, {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
