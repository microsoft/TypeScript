//// [ES5SymbolProperty2.ts]
module M {
    var Symbol: any;

    export class C {
        [Symbol.iterator]() { }
    }
    (new C)[Symbol.iterator];
}

(new M.C)[Symbol.iterator];

//// [ES5SymbolProperty2.js]
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
var M;
(function (M) {
    var Symbol;
    var C = (function () {
        function C() {
        }
        C.prototype[_a = Symbol.iterator] = function () { };
        __names(C.prototype, [_a]);
        return C;
        var _a;
    }());
    M.C = C;
    (new C)[Symbol.iterator];
})(M || (M = {}));
(new M.C)[Symbol.iterator];
