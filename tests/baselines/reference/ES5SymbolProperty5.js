//// [ES5SymbolProperty5.ts]
var Symbol: { iterator: symbol };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator](0) // Should error

//// [ES5SymbolProperty5.js]
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
var Symbol;
var C = (function () {
    function C() {
    }
    C.prototype[_a = Symbol.iterator] = function () { };
    __names(C.prototype, [_a]);
    return C;
    var _a;
}());
(new C)[Symbol.iterator](0); // Should error
