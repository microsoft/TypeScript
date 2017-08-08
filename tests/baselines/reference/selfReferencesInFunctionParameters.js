//// [selfReferencesInFunctionParameters.ts]
function foo(x: number = x) {
}

function bar(x0 = "", x: number = x) {
}

class C {
    constructor(x = 1, y = y) {
    }
     
    bar(a = "", b: string = b.toString()) {
    }
}

//// [selfReferencesInFunctionParameters.js]
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
function foo(x) {
    if (x === void 0) { x = x; }
}
function bar(x0, x) {
    if (x0 === void 0) { x0 = ""; }
    if (x === void 0) { x = x; }
}
var C = (function () {
    function C(x, y) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = y; }
    }
    C.prototype.bar = function (a, b) {
        if (a === void 0) { a = ""; }
        if (b === void 0) { b = b.toString(); }
    };
    __names(C.prototype, ["bar"]);
    return C;
}());
