//// [classWithOverloadImplementationOfWrongName.ts]
class C {
    foo(): string;
    foo(x): number;
    bar(x): any { }
}

//// [classWithOverloadImplementationOfWrongName.js]
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
    C.prototype.bar = function (x) { };
    __names(C.prototype, ["bar"]);
    return C;
}());
