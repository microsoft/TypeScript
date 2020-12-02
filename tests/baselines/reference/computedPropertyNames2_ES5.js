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
    var proto_1 = C.prototype;
    proto_1[methodName] = function () { };
    C[methodName] = function () { };
    Object.defineProperty(proto_1, accessorName, {
        get: function () { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, accessorName, {
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
