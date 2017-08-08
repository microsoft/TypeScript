//// [genericTypeWithNonGenericBaseMisMatch.ts]
interface I {
	f: (a: { a: number }) => void
}
class X<T extends { a: string }> implements I {
	f(a: T): void { }
}
var x = new X<{ a: string }>();
var i: I = x; // Should not be allowed -- type of 'f' is incompatible with 'I'


//// [genericTypeWithNonGenericBaseMisMatch.js]
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
var X = (function () {
    function X() {
    }
    X.prototype.f = function (a) { };
    __names(X.prototype, ["f"]);
    return X;
}());
var x = new X();
var i = x; // Should not be allowed -- type of 'f' is incompatible with 'I'
