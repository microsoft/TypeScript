//// [requiredInitializedParameter4.ts]
class C1 {
    method(a = 0, b) { }
}

//// [requiredInitializedParameter4.js]
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
var C1 = (function () {
    function C1() {
    }
    C1.prototype.method = function (a, b) {
        if (a === void 0) { a = 0; }
    };
    __names(C1.prototype, ["method"]);
    return C1;
}());


//// [requiredInitializedParameter4.d.ts]
declare class C1 {
    method(a: number, b: any): void;
}
