//// [genericTypeReferencesRequireTypeArgs.ts]
class C<T> {
   foo(): T { return null }
}
interface I<T> {
   bar(): T;
}
var c1: C; // error
var i1: I; // error
var c2: C<I>; // should be an error
var i2: I<C>; // should be an error


//// [genericTypeReferencesRequireTypeArgs.js]
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
    C.prototype.foo = function () { return null; };
    __names(C.prototype, ["foo"]);
    return C;
}());
var c1; // error
var i1; // error
var c2; // should be an error
var i2; // should be an error
